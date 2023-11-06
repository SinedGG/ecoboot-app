<template>
  <div class="login-page">
    <img src="@/assets/eco.png" alt="Ecoboot Logo" class="logo" />
    <h1 class="title">ecoboot</h1>
    <form class="login-form" @submit.prevent="login">
      <input type="text" placeholder="IP" v-model="ip" />
      <input type="text" placeholder="Ім'я користувача" v-model="username" />
      <input type="password" placeholder="Пароль" v-model="password" />
      <button type="submit">Увійти</button>
    </form>
  </div>
</template>

<script>

import { connect } from '@/db/connection'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  data() {
    return {
      ip: 'pg.sded.cc',
      username: 'dev',
      password: 'Dev_pasw'
    };
  },
  methods: {
    async login() {

      try {
        await connect(this.ip, this.username, this.password);

        this.$router.push("/tables");

      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 97vh;
  background-color: #f0f0f0;
}

.logo {
  width: 100px;
  height: 100px;
}

.title {
  font-size: 24px;
  margin-top: 16px;
  color: #333;
}

.login-form {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 200px;
  height: 40px;
  margin-bottom: 12px;
  padding: 8px;
}

button {
  width: 100px;
  height: 40px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
