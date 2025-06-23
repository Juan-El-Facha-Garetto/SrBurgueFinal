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
  padding: 20px 30px;
  font-family: 'Georgia', serif;
  font-size: 15px;
  cursor: pointer;
  background-color: var(--primary-color);
  border-radius: 8px;
  border: 2px solid #000000;
  font-weight: bold;
  transition: background 0.6s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
button:hover {
  background-color: var(--secondary-color);      /* Mostaza más clara al pasar el mouse */
  
}
</style>