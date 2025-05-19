<template>
  <div class="home">
    <h1>Bienvenidos a SrBurgues</h1>

    <button @click="show = 'burgers'">🍔 Hamburguesas</button>
    <button @click="show = 'sandwiches'">🥪 Sandwiches</button>
    <button @click="show = 'nuggets'">🍗 Nuggets</button>
    <button @click="show = 'guaniciones'">🍟 Guarniciones</button>
    <button @click="show = 'gaseosas'">🥤 Gaseosas</button>

    <!-- Menú de hamburguesas -->
    <MainBurguer v-if="show === 'burgers'" @add-to-cart="addToCart" />
    <SandwichMenu v-if="show === 'sandwiches'" @add-to-cart="addToCart" />
    <GaseosasMenu v-if="show === 'gaseosas'" @add-to-cart="addToCart" />
    <NuggetsMenu v-if="show === 'nuggets'" @add-to-cart="addToCart" />
    <GuarnicionesMenu v-if="show === 'guaniciones'" @add-to-cart="addToCart" />
    
    <!-- Carrito -->
    <CarritoNew :cart="cart" @remove-from-cart="handleRemoveFromCart" @clear-cart="cart = []"/>
    
  
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MainBurguer from './MainBurguer.vue'
import GaseosasMenu from './GaseosasMenu.vue'
import SandwichMenu from './SandwichMenu.vue'
import CarritoNew from './CarritoNew.vue'
import NuggetsMenu from './NuggetsMenu.vue'
import GuarnicionesMenu from './GuarnicionesMenu.vue'

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
  alert(`${product.name} agregado al carrito 👀`)
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
