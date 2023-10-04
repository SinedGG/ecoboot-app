<template>
    <div class="report-viewer">
        <div class="header">
            <div class="left">
                <font-awesome-icon icon="arrow-left" @click="goBack" />
            </div>
            <div class="center">
                <img src="@/assets/eco.png" alt="Company Logo" class="logo" />
                <h1>ecoboot</h1>
                <h1>------------</h1>
                <h1>Звіт</h1>
                <h2>{{ reportSubTitle }}</h2>
            </div>
            <div class="right">
                <font-awesome-icon icon="print" @click="printReport" />
            </div>
        </div>

        <div class="report-content">
            <table>
                <thead>
                    <tr>
                        <th v-for="item in tableData.header" :key="item">{{ item }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in tableData.data" :key="rowIndex">
                        <td v-for="(head, headIndex) in Object.keys(tableData.data[0])" :key="headIndex">{{ row[head] }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <p class="creation-date">Дата створення: {{ creationDate }}</p>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            reportSubTitle: "",
            tableData: Array,
            creationDate: "October 3, 2023",
        };
    },
    methods: {
        goBack() {
            this.$router.push("/reports");
        },
        printReport() {
            window.print();
        },
    },
    created() {
        var table = JSON.parse(this.$route.params.data)
        this.tableData = table

        this.creationDate = new Date().toLocaleString()
        this.reportSubTitle = table.title

    },
};
</script>
  
<style scoped>
.report-viewer {
    font-family: Arial, sans-serif;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.left,
.right {
    font-size: 24px;
    cursor: pointer;
}

.center {
    text-align: center;
}

.logo {
    max-width: 100px;
    max-height: 100px;
}

h1 {
    font-size: 24px;
    margin: 10px 0;
}

h2 {
    font-size: 18px;
    margin: 10px 0;
}

.report-content {
    border: 1px solid #ccc;
    padding: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

.creation-date {
    margin-top: 20px;
    text-align: right;
    font-style: italic;
    color: #888;
}
</style>
