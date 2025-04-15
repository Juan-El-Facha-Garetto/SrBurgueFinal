<template>
  <div class="home">
    <h1>Bienvenidos a SrBurgues</h1>

    <button @click="show = 'burgers'">🍔 Hamburguesas</button>
    <button @click="show = 'gaseosas'">🥤 Gaseosas</button>

    <!-- Menú de hamburguesas -->
    <MainBurguer v-if="show === 'burgers'" @add-to-cart="addToCart" />
    <GaseosasMenu v-if="show === 'gaseosas'" @add-to-cart="addToCart" />
    
    <!-- Carrito -->
    <CarritoNew :cart="cart" @remove-from-cart="handleRemoveFromCart" @clear-cart="cart = []"/>
    
  
    
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

const handleRemoveFromCart = (id) => {
  cart.value = cart.value.filter(item => item.id !== id)
}

// Función para agregar productos al carrito
const addToCart = (product) => {
  // Buscar si ya existe el producto en el carrito por su ID
  const existing = cart.value.find(item => item.id === product.id)

  if (existing) {
    // Si ya existe, aumentar la cantidad
    existing.quantity += product.quantity
  } else {
    // Si no existe, agregarlo al carrito con su cantidad
    cart.value.push({ ...product })
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
