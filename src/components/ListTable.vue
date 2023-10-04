<template>
    <div class="list">
        <h2>Список таблиць</h2>
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
                { name: "Категорії", key: "category" },
                { name: "Станції", key: "station" },
                { name: "Одиниці вимірювання", key: "measured_unit" },
                { name: "Оптимальні показники", key: "optimal_value" },
                { name: "MQTT сервер", key: "mqtt_server" },
                { name: "MQTT unit", key: "mqtt_unit" },
                { name: "Виміри", key: "measurement" },
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
    /* Adjust the spacing between custom buttons */
}

/* You can style the CustomButton component in its own file */
</style>
  