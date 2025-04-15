<template>
    <div>
      <h2>Menú de Hamburguesas</h2>
      <ul>
        <li v-for="(burger, index) in burgers" :key="burger.id">
          <h3>{{ burger.name }}</h3>
          <img :src="`/img/${burger.image}`" :alt="burger.name" width="150" />
          <p>{{ burger.description }}</p>
          <p>Precio: ${{ burger.price }}</p>

          <div>
            <button @click="decrease(index)">-</button>
            <span>{{ quantities[index] }}</span>
            <button @click="increase(index)">+</button>
          </div>

          <button @click="addToCart(burger,index)">Agregar al carrito</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref,defineEmits } from 'vue'

  const burgers = ref([
    { id: 0, name: 'Hamburguesa Clásica', description: 'Carne, lechuga y tomate', price: 500, image: 'burguer1.jpg' },
    { id: 1, name: 'Hamburguesa BBQ', description: 'Carne, salsa BBQ y cebolla caramelizada', price: 600, image: 'burguer1.jpg' },
    { id: 2, name: 'Hamburguesa Vegetariana', description: 'Hamburguesa de garbanzos con guacamole', price: 550, image: 'burguer1.jpg' },
  ])
  
   // Para controlar la cantidad por índice
   const quantities = ref(burgers.value.map(() => 1))
   
   const increase = (index) => {
    quantities.value[index]++
  }
  const decrease = (index) => {
    if (quantities.value[index] > 1) {
      quantities.value[index]--
    }
  }


  const emit = defineEmits(['add-to-cart'])


  // Emitir al carrito con el producto y su cantidad
  const addToCart = (burger,index) => {
  const quantity = quantities.value[index] // Obtener la cantidad del índice
  if (quantity < 1) return  // No permitir agregar cantidades no válidas
  emit('add-to-cart', { ...burger, quantity }) // Enviar el producto con la cantidad
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
  