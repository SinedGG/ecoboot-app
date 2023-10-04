<template>
    <div>
        <label>{{ label }}</label>
        <select :value="selectedValue" @input="updateSelectedValue">
            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>
  
<script>
export default {
    props: {
        label: String,
        options: Array,
        selectedValue: String,
    },
    methods: {
        updateSelectedValue(event) {
            this.$emit('update:selectedValue', event.target.value);
        },
    },
};
</script>
  
<style scoped>
/* Add your CSS styles for the selector here if needed */
</style>
  