<template>
  <div class="page-container">
    <Loading v-if="isLoading"> </Loading>

    <div class="content">
      <div class="main-content">

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
import Loading from "@/components/LoadingAnim.vue"

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import charts from "@/db/charts.js"

export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,

      startDate: null,
      endDate: null,
    };
  },



  methods: {
    async submitForm() {
      if (!this.startDate || !this.endDate) {
        toast.warn("Введіть значення для вибірки", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        this.isLoading = true

        var data = await charts.chart1(this.startDate, this.endDate)
        this.isLoading = false

        data.title = `Кількість максимальних значень шкідливих частинок PM2.5, PM10 в розрізі областей з ${this.startDate} по ${this.endDate}`

        data.chart = true
        this.$router.push({ name: 'report-viewer', params: { data: JSON.stringify(data) } });
      }
    }
  }
};
</script>

<style scoped>
.page-container {
  width: 70%;
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
