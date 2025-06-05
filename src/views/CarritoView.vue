<template>
  <CarritoNew
    :cart="cart"
    @remove-from-cart="handleRemoveFromCart"
    @clear-cart="handleClearCart"
  />
</template>

<script setup>
import { inject } from 'vue'
import CarritoNew from '../components/CarritoNew.vue'

// Usa provide/inject o un store para compartir el carrito entre componentes
const cart = inject('cart')
const handleRemoveFromCart = inject('handleRemoveFromCart')
const handleClearCart = inject('handleClearCart')
</script>