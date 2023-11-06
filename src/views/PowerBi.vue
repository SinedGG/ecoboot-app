<template>
    <Header></Header>
    <div id="container">
        <iframe
            src="https://app.powerbi.com/reportEmbed?reportId=1a6e421b-57dc-48da-8ad5-919bd9eac23b&autoAuth=true&ctid=d6599f68-2d2c-4cae-9ecf-60052b7d0bd9"
            frameborder="0" allowFullScreen="true"></iframe>
    </div>
</template>
  
<script>
import Header from "@/components/headerMain.vue"

export default {
    components: {
        Header
    },
    data() {
        return {

        };
    },
    methods: {

    },
};
</script>

<style scoped>
#container {
    display: flex;
    justify-content: space-between;
}

iframe {
    display: block;
    height: 89vh;
    width: 100vw;
    border: none;
}
</style>
  