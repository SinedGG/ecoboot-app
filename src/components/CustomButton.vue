<template>
    <button class="custom-button" @click="selectItem">
        {{ item.name }}
    </button>
</template>
  
<script>
export default {
    props: {
        item: Object, // The item object passed from the parent component
    },
    methods: {
        selectItem() {
            this.$emit("item-selected", this.item.key);
        },
    },
};
</script>
  
<style scoped>
.custom-button {
    background-color: #007bff;
    /* Customize the button background color */
    color: #fff;
    /* Customize the text color */
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.custom-button:hover {
    background-color: #0056b3;
    /* Customize the button color on hover */
}
</style>
  