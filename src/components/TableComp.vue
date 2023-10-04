<template>
    <div class="table">
        <table class="custom-table">
            <thead>
                <tr>
                    <th v-for="item in tableData.header" :key="item">{{ item }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in tableData.data" :key="rowIndex">
                    <td v-for="(head, headIndex) in Object.keys(tableData.data[0])" :key="headIndex">{{ row[head] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        tableData: Array,
    },
};
</script>

<style scoped>
.table {
    width: 70%;
    padding: 20px;
    box-sizing: border-box;
}

.custom-table {
    border-collapse: collapse;
    width: 100%;
    background-color: #f5f5f5;
    /* Light gray background color */
}

.custom-table th,
.custom-table td {
    border: 1px solid #ddd;
    /* Light gray border */
    padding: 8px;
    text-align: left;
}

.custom-table th {
    background-color: #f0f0f0;
    /* Slightly lighter gray background for table headers */
    color: #333;
    /* Dark text color for table headers */
}

.custom-table tr:nth-child(even) {
    background-color: #f9f9f9;
    /* Alternate row background color */
}

.custom-table tr:hover {
    background-color: #e0e0e0;
    /* Hover background color */
}</style>
