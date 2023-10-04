<template>
    <Header></Header>
    <paginator v-if="pageSelected === 'measurement'" :current-page="currentPage" :total-pages="totalPages"
        @pageSelected="handlePageSelected"></paginator>
    <div id="container">
        <List @item-selected="onItemSelected" />
        <Table :tableData="tableData" />
    </div>
</template>
  
<script>


import List from "@/components/ListTable.vue";
import Table from "@/components/TableComp.vue";

import Header from "@/components/headerMain.vue"
import paginator from "@/components/paginatorComp.vue"

import tables from "@/db/tables.js"

export default {
    components: {
        List,
        Table,
        Header,
        paginator
    },
    data() {
        return {
            tableData: [],
            pageSelected: null,
            currentPage: 0,
            totalPages: 10
        };
    },

    async mounted() {

        const data = await tables.category()
        this.tableData = data

    },
    methods: {
        async onItemSelected(item) {
            this.pageSelected = item
            const data = await tables[item]()
            this.tableData = data

            if (item == "measurement") {
                this.currentPage = 0
                const pages = await tables.measurement_pagination()
                this.totalPages = pages[0].count / 1000
            }
        },

        async handlePageSelected(page) {
            const data = await tables.measurement(page)
            this.currentPage = page
            this.tableData = data
        }
    },
};


</script>
  
<style scoped>
#container {
    display: flex;
    justify-content: space-between;
}
</style>
  