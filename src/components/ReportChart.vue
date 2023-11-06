<template>
    <div>
        <Bar :data="chartData" :options="options" />
    </div>
</template>
  
 
<script>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
    name: 'App',
    components: {
        Bar
    },

    props: {
        chartData: Object,
    },

    data() {
        return {


            options: {
                responsive: true,
                maintainAspectRatio: false
            }

        }
    }
}
</script>
  
  