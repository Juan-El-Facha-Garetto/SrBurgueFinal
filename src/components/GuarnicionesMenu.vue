<template>
  <div>
    <h2>Menú Guarniciones</h2>

    <select v-model="selectedType">
      <option value="todas">Todas</option>
      <option value="Frito">Frito</option>
      <option value="Ensalada">Ensalada</option>
      <option value="Pure">Puré</option>
    </select>

    <ul>
      <li v-for="(guarnicion, index) in filtroGuarniciones" :key="guarnicion.ID">
        <h3>{{ guarnicion.Nombre }}</h3>
        <img
          v-if="guarnicion.Foto"
          :src="`http://localhost:3000/uploads/${guarnicion.Foto}`"
          :alt="guarnicion.Nombre"
          width="150"
        />
        <p>{{ guarnicion.Descripcion }}</p>
        <p>Precio: ${{ guarnicion.Precio }}</p>
        <div>
          <button @click="decrease(index)">-</button>
          <span>{{ quantities[index] }}</span>
          <button @click="increase(index)">+</button>
        </div>
        <button @click="addToCart(guarnicion, index)">Agregar al carrito</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineEmits, computed, onMounted } from 'vue'
import axios from 'axios'

const guarniciones = ref([])
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

const addToCart = (guarnicion, index) => {
  const quantity = quantities.value[index]
  if (quantity < 1) return
  emit('add-to-cart', { ...guarnicion, quantity })
}

// Filtrar guarniciones por tipo
const filtroGuarniciones = computed(() => {
  if (selectedType.value === 'todas') {
    return guarniciones.value
  }
  return guarniciones.value.filter(
    guarnicion => guarnicion.CategoriaDetalle === selectedType.value
  )
})

// Cargar productos desde el backend al montar el componente
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/productos')
    // Solo guarniciones: filtra por CategoriaSeccion
    guarniciones.value = response.data.filter(
      p => p.CategoriaSeccion && p.CategoriaSeccion === 'Guarnicion'
    )
    quantities.value = guarniciones.value.map(() => 1)
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