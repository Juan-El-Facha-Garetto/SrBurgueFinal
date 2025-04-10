<template>

<div class="home">
    <h1>Bienvenidos a SrBurgues</h1>
    <button @click="show = 'burgers'"> 🍔 Hamburguesas </button>
    <button @click="show ='gaseosas'">🥤 Gaseosas</button>

    <MainBurguer v-if="show === 'burgers'" />
    <GaseosasMenu v-if="show === 'gaseosas'" />

</div>
</template>

<script setup>
import { ref } from 'vue'
import MainBurguer from './MainBurguer.vue'
import GaseosasMenu from './GaseosasMenu.vue'

const show = ref(null)




</script>

<style scoped>
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  }
</style>