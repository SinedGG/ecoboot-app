<template>
    <Header></Header>
    <div id="container">
        <List @item-selected="onItemSelected" />
        <Loading v-if="isLoading"> </Loading>
        <report2 v-if="report2"></report2>
    </div>
</template>
  
<script>

import List from "@/components/ListReport.vue";

import Header from "@/components/headerMain.vue"

import Loading from "@/components/LoadingAnim.vue"

import reports from "@/db/reports.js"

import report2 from "@/components/reportComponent.vue"

export default {
    components: {
        List,
        Header,
        Loading,
        report2
    },
    data() {
        return {
            isLoading: false,
            report2: false
        };
    },

    methods: {
        async onItemSelected(item) {
            if (item == "station") {
                this.report2 = false;
                this.isLoading = true
                var data = await reports.station();

                var temp = []
                for (let i = 0; i < data.data.length; i++) {
                    if (data.data[i].connection_date && data.data[i].provided_parameters) {
                        data.data[i].connection_date = new Date(data.data[i].connection_date).toLocaleString()
                        temp.push(data.data[i])
                    }
                }

                data = {
                    header: data.header,
                    data: temp
                };

                this.isLoading = false
                data.title = "підключених станцій"
                this.$router.push({ name: 'report-viewer', params: { data: JSON.stringify(data) } });
            }
            if (item == "station2") {
                this.report2 = true;
            }
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
  