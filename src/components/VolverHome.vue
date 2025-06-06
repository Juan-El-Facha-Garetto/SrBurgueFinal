<template>
  <button @click="irAlHome" class="volver-home">Volver al Home</button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const irAlHome = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped>
.volver-home {
  background-color: #f1ce5b; /* Verde /
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.volver-home:hover {
  background-color: #e6e60e; / Verde más oscuro */
}
</style>