<template>
  <button class="carrito-flotante" @click="$emit('abrir-carrito')">
    🛒
    <span v-if="totalItems > 0" class="badge">{{ totalItems }}</span>
  </button>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  totalItems: Number
})
</script>

<style scoped>
.carrito-flotante {
  position: fixed;
  top: 20px;
  right: 30px;
  background: var(--primary-color);
  border: 2px solid black;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  font-size: 32px;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
}
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #FFD600;
  color: #222;
  border-radius: 50%;
  padding: 2px 8px;
  font-size: 14px;
}
</style>