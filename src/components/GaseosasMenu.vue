<template>

<div>
    <h2>Menú Gaseosas</h2>
    <ul>
        <li v-for="gaseosa in gaseosas" :key="gaseosa.id">
             <h3>{{ gaseosa.name }}</h3>
             <img :src="`/img/${gaseosa.image}`" :alt="gaseosa.name" width="150" />
             <p>{{ gaseosa.description }}</p>
             <p>Precio: ${{ gaseosa.price }}</p>
             <button @click="addToCart(gaseosa)">Agregar al carrito</button>
        </li>
    </ul>
</div>


</template>

<script setup>
import {ref,defineEmits} from 'vue'

const emit = defineEmits(['add-to-cart'])


const gaseosas = ref([
    { id: 1, name: 'Coca-Cola', description: 'Gaseosa de cola', price: 200, image: 'gaseosa1.jpg' },
    { id: 2, name: 'Sprite', description: 'Gaseosa de limón', price: 200, image: 'gaseosa1.jpg' },
    { id: 3, name: 'Fanta', description: 'Gaseosa de naranja', price: 200, image: 'gaseosa1.jpg' },
])

// Emitir al carrito
const addToCart = (gaseosa) => {
  emit('add-to-cart', gaseosa)
}
</script>

<style scoped></style>