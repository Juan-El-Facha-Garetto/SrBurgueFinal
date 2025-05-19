<template>
  <div>
    <h2>Menú Sandwiches</h2>

    <select v-model="selectedType">
      <option value="todas">Todas</option>
      <option value="De Carne">De Carne</option>
      <!-- Agrega más opciones si tienes más detalles en tu tabla -->
    </select>

    <ul>
      <li v-for="(sandwich, index) in filtroSandwiches" :key="sandwich.ID">
        <h3>{{ sandwich.Nombre }}</h3>
        <img
          v-if="sandwich.Foto"
          :src="`http://localhost:3000/uploads/${sandwich.Foto}`"
          :alt="sandwich.Nombre"
          width="150"
        />
        <p>{{ sandwich.Descripcion }}</p>
        <p>Precio: ${{ sandwich.Precio }}</p>
        <div>
          <button @click="decrease(index)">-</button>
          <span>{{ quantities[index] }}</span>
          <button @click="increase(index)">+</button>
        </div>
        <button @click="addToCart(sandwich, index)">Agregar al carrito</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineEmits, computed, onMounted } from 'vue'
import axios from 'axios'

const sandwiches = ref([])
const quantities = ref([])
const selectedType = ref('todas')

const emit = defineEmits(['add-to-cart'])

const increase = (index) => {
  quantities.value[index]++
}
const decrease = (index) => {
  if (quantities.value[index] > 1) {
    quantities.value[index]--
  }
}

const addToCart = (sandwich, index) => {
  const quantity = quantities.value[index]
  if (quantity < 1) return
  emit('add-to-cart', { ...sandwich, quantity })
}

// Filtrar sandwiches por tipo
const filtroSandwiches = computed(() => {
  if (selectedType.value === 'todas') {
    return sandwiches.value
  }
  return sandwiches.value.filter(
    sandwich => sandwich.CategoriaDetalle === selectedType.value
  )
})

// Cargar productos desde el backend al montar el componente
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/productos')
    // Solo sandwiches: filtra por CategoriaSeccion
    sandwiches.value = response.data.filter(
      p => p.CategoriaSeccion && p.CategoriaSeccion === 'Sandwich'
    )
    quantities.value = sandwiches.value.map(() => 1)
  } catch (error) {
    console.error('Error al cargar productos:', error)
  }
})
</script>

<style scoped>
img {
  border-radius: 10px;
  margin-bottom: 10px;
  display: block;
}
</style>