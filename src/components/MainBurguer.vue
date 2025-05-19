<template>
  <div>
    <h2>Menú de Hamburguesas</h2>

    <select v-model="selectedType">
  <option value="todas">Todas</option>
  <option value="De Carne">De Carne</option>
  <option value="Veggie">Veggie</option>
</select>

    <ul>
      <li v-for="(burger, index) in filtroBurguers" :key="burger.ID">
        <h3>{{ burger.Nombre }}</h3>
        <img
          v-if="burger.Foto"
          :src="`http://localhost:3000/uploads/${burger.Foto}`"
          :alt="burger.Nombre"
          width="150"
        />
        <p>{{ burger.Descripcion }}</p>
        <p>Precio: ${{ burger.Precio }}</p>
        <p>Categoría: {{ burger.CategoriaSeccion }} - {{ burger.CategoriaDetalle }}</p>

        <div>
          <button @click="decrease(index)">-</button>
          <span>{{ quantities[index] }}</span>
          <button @click="increase(index)">+</button>
        </div>

        <button @click="addToCart(burger, index)">Agregar al carrito</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineEmits, computed, onMounted } from 'vue'
import axios from 'axios'

const burgers = ref([])
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

const addToCart = (burger, index) => {
  const quantity = quantities.value[index]
  if (quantity < 1) return
  emit('add-to-cart', { ...burger, quantity })
}

// Filtrar hamburguesas por tipo
const filtroBurguers = computed(() => {
  if (selectedType.value === 'todas') {
    return burgers.value
  }
  return burgers.value.filter(
    burger => burger.CategoriaDetalle === selectedType.value
  )
})

// Cargar productos desde el backend al montar el componente
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/productos')
    // Solo hamburguesas: filtra por CategoriaSeccion
    burgers.value = response.data.filter(
      p => p.CategoriaSeccion && p.CategoriaSeccion === 'Burguers'
    )
    quantities.value = burgers.value.map(() => 1)
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