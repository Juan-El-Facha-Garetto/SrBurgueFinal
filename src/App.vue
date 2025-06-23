<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import {provide, ref} from 'vue'
const cart = ref([])

function addToCart(producto, cantidad = 1) {
  const index = cart.value.findIndex(item => item.id === producto.ID)
  if (index !== -1) {
    cart.value[index].quantity += cantidad
  } else {
    cart.value.push({
      id: producto.ID,
      name: producto.Nombre,
      description: producto.Descripcion,
      price: producto.Precio,
      quantity: cantidad,
      CategoriaSeccion: producto.CategoriaSeccion,
      image: producto.Foto
    })
  }
}

function handleRemoveFromCart(idx) {
  cart.value.splice(idx, 1)
}

function handleClearCart() {
  cart.value = []
}

// Proveer el carrito y las funciones a toda la app
provide('cart', cart)
provide('addToCart', addToCart)
provide('handleRemoveFromCart', handleRemoveFromCart)
provide('handleClearCart', handleClearCart)
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #cca90c;
}

</style>