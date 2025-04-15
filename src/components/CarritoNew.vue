<template>

    <div class="cart">

        <h2>🛒 Carrito</h2>

        <ul>
            <li v-for="item in cart" :key="item.id">
            <h3>{{ item.name }} (x{{ item.quantity }})</h3>
            <p>Precio unitario: ${{ item.price }}</p>
            <p>Subtotal: ${{ item.price * item.quantity }}</p>
            <button @click="removeItem(item.id)">❌ Eliminar</button>
            <img :src="`/img/${item.image}`" :alt="item.name" width="50" />
            </li>
        </ul>

        <!-- Si el carrito está vacío, mostrar un mensaje -->
         <p v-if="cart.length ===0">El carrito está vacío</p>

         <!-- Vaciar Carrito Completo -->
         <button v-if="cart.length >0"  @click="$emit('clear-cart')">🧹 Vaciar carrito</button>
          <!-- Total del carrito -->
         <p v-if="cart.length > 0">Total: ${{ totalPrice }}</p>

    </div>

</template>

<script setup>
import { computed,defineProps,defineEmits } from 'vue'


// Función para eliminar un producto del carrito
const emit = defineEmits(['remove-from-cart'])
const removeItem = (id) => {
    emit('remove-from-cart', id)
}

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