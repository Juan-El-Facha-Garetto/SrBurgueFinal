<template>
<div class="home">
    <h1>Bienvenidos a SrBurgues</h1>

    <button @click="show = 'burgers'">🍔 Hamburguesas</button>
    <button @click="show = 'gaseosas'">🥤 Gaseosas</button>

    <!-- MENÚS -->
    <MainBurguer v-if="show === 'burgers'" @add-to-cart="addToCart" />
    <GaseosasMenu v-if="show === 'gaseosas'" @add-to-cart="addToCart" />

   <!-- CARRITO -->
   <CarritoNew :cart="cart" />

  </div>
 
</template>

<script setup>
import { ref } from 'vue'
import MainBurguer from './MainBurguer.vue'
import GaseosasMenu from './GaseosasMenu.vue'
import CarritoNew from './CarritoNew.vue'

const show = ref(null) 
const cart = ref([])   

// Función para agregar productos al carrito
const addToCart = (product) => {
  cart.value.push(product)
}


</script>

<style scoped>
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  }
</style>