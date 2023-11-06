<template>
    <Header></Header>
    <div id="container">
        <List @item-selected="onItemSelected" />
        <Loading v-if="isLoading"> </Loading>
        <chart1 v-if="chart === 'chart1'"> </chart1>
        <chart2 v-if="chart === 'chart2'"> </chart2>
    </div>
</template>
  
<script>

import List from "@/components/ListChart.vue";
import Loading from "@/components/LoadingAnim.vue"
import Header from "@/components/headerMain.vue"

import charts from "@/db/charts.js"

import chart1 from "@/components/ChartParam/chart1Param.vue"
import chart2 from "@/components/ChartParam/chart2Param.vue"

export default {
    components: {
        List,
        Loading,
        Header,
        chart1,
        chart2
    },
    data() {
        return {
            isLoading: false,
            chart: null
        };
    },

    methods: {
        async onItemSelected(item) {
            if (item == "chart3") {
                this.isLoading = true
                var data = await charts.chart3();
                this.isLoading = false

                data.chart = true
                data.title = "Кількість вимірювань, які належать до категорій оптимальних значень для діоксиду сірки"
                this.$router.push({ name: 'report-viewer', params: { data: JSON.stringify(data) } });
            } else if (item == "chart4") {
                this.isLoading = true
                var dataa = await charts.chart4();
                this.isLoading = false

                dataa.chart = true
                dataa.title = "Кількість вимірювань, які належать до категорій оптимальних значень для чадного газу"
                this.$router.push({ name: 'report-viewer', params: { data: JSON.stringify(dataa) } });
            } else

                this.chart = item;
        }
    }
};


</script>
  
<style scoped>
#container {
    display: flex;
    justify-content: space-between;
}
</style>
  