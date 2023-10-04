<template>
    <header class="header">
        <div class="left">
            <img class="logo" src="@/assets/eco.png" alt="Logo" />
            <span class="name">ecoboot</span>
        </div>
        <div class="center">
            <router-link to="/tables"><button class="button">Пергляд таблиць</button></router-link>
            <router-link to="/reports"><button class="button">Звіти</button></router-link>

        </div>
    </header>
</template>
  
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
}

.left {
    display: flex;
    align-items: center;
}

.logo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.name {
    font-size: 1.5rem;
}

.center {
    text-align: center;
}

.button {
    margin: 5px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
  