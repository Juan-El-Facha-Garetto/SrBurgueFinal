<template>

    <div class="cart">

        <h2>🛒 Carrito</h2>

        <ul>
            <li v-for="item in cart" :key="item.id">
            {{ item.name }} - ${{ item.price }}
            </li>
        </ul>

        <!-- Si el carrito está vacío, mostrar un mensaje -->
         <p v-if="cart.length ===0">El carrito está vacío</p>

          <!-- Total del carrito -->
         <p v-if="cart.length > 0">Total: ${{ total }}</p>

    </div>

</template>

<script setup>

import { computed,defineProps } from 'vue'

//Propiedad que recibe el carrito desde el componente padre (HomePage)
const props = defineProps({
    cart: {
        type: Array,
        required: true
    }
})
// Computed para calcular el total del carrito
const total = computed(() => {
    return props.cart.reduce((sum, item) => sum + item.price, 0)
})

</script>

<style scoped>

.cart {
  border-top: 2px solid #ccc;
  padding-top: 20px;
  margin-top: 20px;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
p {
  font-size: 18px;
}

</style>