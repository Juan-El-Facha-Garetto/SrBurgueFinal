<template>
  <div class="home">
    <h1>Bienvenidos a SrBurgues</h1>

    <button @click="show = 'burgers'">🍔 Hamburguesas</button>
    <button @click="show = 'gaseosas'">🥤 Gaseosas</button>

    <!-- Menú de hamburguesas -->
    <MainBurguer v-if="show === 'burgers'" @add-to-cart="addToCart" />
    <GaseosasMenu v-if="show === 'gaseosas'" @add-to-cart="addToCart" />

    <!-- Carrito -->
    <CarritoNew :cart="cart" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MainBurguer from './MainBurguer.vue'
import GaseosasMenu from './GaseosasMenu.vue'
import CarritoNew from './CarritoNew.vue'

// Estado para mostrar el menú
const show = ref(null)

// Estado para el carrito
const cart = ref([])

// Función para agregar productos al carrito
const addToCart = (product) => {
  const index = cart.value.findIndex(item => item.id === product.id)

  if (index === -1) {
    // Si el producto no está en el carrito, agregarlo
    cart.value.push(product)
  } else {
    // Si el producto ya está en el carrito, solo actualizamos la cantidad
    cart.value[index].quantity += product.quantity
  }
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
