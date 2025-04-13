<template>

    <div class="cart">

        <h2>🛒 Carrito</h2>

        <ul>
            <li v-for="(item, index) in cart" :key="index">
            <h3>{{ item.name }} (x{{ item.quantity }})</h3>
            <p>Precio unitario: ${{ item.price }}</p>
            <p>Subtotal: ${{ item.price * item.quantity }}</p>
            </li>
        </ul>

        <!-- Si el carrito está vacío, mostrar un mensaje -->
         <p v-if="cart.length ===0">El carrito está vacío</p>

          <!-- Total del carrito -->
         <p v-if="cart.length > 0">Total: ${{ totalPrice }}</p>

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
// Calcular el total del carrito
const totalPrice = computed(() => {
  return props.cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0)
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