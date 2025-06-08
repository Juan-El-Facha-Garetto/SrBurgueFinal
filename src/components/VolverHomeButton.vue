<template>
  <button @click="irAlHome" class="volver-home">Volver</button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const irAlHome = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped>
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  background-color: #FFD600;
  border: 3px solid black;
  font-weight: bold;
  transition: background 0.2s, border 0.2s;
}
button:hover {
  background-color: #FFEA70;      /* Mostaza más clara al pasar el mouse */
  border-color: #FFD600;
}
</style>