<template>
  <div class="page-container">
    <div class="content">
      <div class="main-content">
        <div class="form-group">
          <label for="selector">Виберіть станцію:</label>
          <select id="selector" v-model="selectedOption">
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="startDate">Виберіть дату початку вимірювання:</label>
          <input type="date" id="startDate" v-model="startDate" />
        </div>

        <div class="form-group">
          <label for="endDate">Виберіть кінця початку вимірювання:</label>
          <input type="date" id="endDate" v-model="endDate" />
        </div>

        <button @click="submitForm" class="custom-button">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import reports from '@/db/reports';

export default {
  data() {
    return {
      selectedOption: null,
      startDate: null,
      endDate: null,
      options: []
    };
  },

  async mounted() {
    const t = await reports.station_list()
    t.forEach(element => {
      this.options.push(
        { value: element.id_station, label: element.name }
      )
    });
  },

  methods: {
    async submitForm() {
      if (!this.selectedOption || !this.startDate || !this.endDate) {
        toast.warn("Введіть значення для вибірки", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        this.isLoading = true

        var data = await reports.station2(this.selectedOption, this.startDate, this.endDate)
        this.isLoading = false
        const selectedOptionObj = this.options.find(option => option.value === this.selectedOption);
        data.title = `вимірювань станції за адресою ${selectedOptionObj.label}\nза період з ${this.startDate} по ${this.endDate}`


        this.$router.push({ name: 'report-viewer', params: { data: JSON.stringify(data) } });
      }
    }
  }
};
</script>

<style scoped>
.page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;
}

.main-content {
  flex: 3;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.custom-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.custom-button:hover {
  background-color: #0056b3;
}

.form-group {
  margin-bottom: 20px;
}
</style>
