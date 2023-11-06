<template>
    <div class="list">
        <h2>Список графіків</h2>
        <div class="custom-buttons">
            <CustomButton v-for="item in items" :key="item.id" :item="item" @item-selected="selectItem" />
        </div>
    </div>
</template>
  
<script>
import CustomButton from "@/components/CustomButton.vue";

export default {
    components: {
        CustomButton,
    },
    data() {
        return {
            items: [
                { name: "Кількість максимальних значень шкідливих частинок PM2.5, PM10 в розрізі областей за вказаний період часу", key: "chart1" },
                { name: "Кількість разів, коли було зафіксовано середньодобові значення твердих частинок PM2.5, значення яких належать до шкідливого рівня на певній станції за весь час", key: "chart2" },
                { name: "Кількість вимірювань, які належать до категорій оптимальних значень для діоксиду сірки", key: "chart3" },
                { name: "Кількість вимірювань, які належать до категорій оптимальних значень для чадного газу", key: "chart4" },

            ],
        };
    },
    methods: {
        selectItem(itemKey) {
            this.$emit("item-selected", itemKey);
        },
    },
};
</script>
  
<style scoped>
.list {
    width: 30%;
    padding: 20px;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
}

.custom-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;

}
</style>
  