<template>
    <div>
      <h2>Menú de Hamburguesas</h2>
      <ul>
        <li v-for="burger in burgers" :key="burger.id">
          <h3>{{ burger.name }}</h3>
          <img :src="`/img/${burger.image}`" :alt="burger.name" width="150" />
          <p>{{ burger.description }}</p>
          <p>Precio: ${{ burger.price }}</p>
          <button @click="addToCart(burger)">Agregar al carrito</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref,defineEmits } from 'vue'

  const emit = defineEmits(['add-to-cart'])
  const burgers = ref([
    { id: 1, name: 'Hamburguesa Clásica', description: 'Carne, lechuga y tomate', price: 500, image: 'burguer1.jpg' },
    { id: 2, name: 'Hamburguesa BBQ', description: 'Carne, salsa BBQ y cebolla caramelizada', price: 600, image: 'burguer1.jpg' },
    { id: 3, name: 'Hamburguesa Vegetariana', description: 'Hamburguesa de garbanzos con guacamole', price: 550, image: 'burguer1.jpg' },
  ])
  
  // Emitir el producto al carrito
  const addToCart = (burger) => {
  emit('add-to-cart', burger)
  }
  


  </script>
  
  <style scoped>
  /* Estilos opcionales */
  img {
  border-radius: 10px;
  margin-bottom: 10px;
  display: block;
}
  </style>
  