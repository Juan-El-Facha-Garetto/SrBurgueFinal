<template>
  <div>
    <h2>Menú Nuggets</h2>

    <select v-model="selectedType">
      <option value="todas">Todas</option>
      <option value="De Pollo">De Pollo</option>
      <option value="De Carne">De Carne</option>
    </select>

    <ul>
      <li v-for="(nugget, index) in filtroNuggets" :key="nugget.ID">
        <h3>{{ nugget.Nombre }}</h3>
        <img
          v-if="nugget.Foto"
          :src="`http://localhost:3000/uploads/${nugget.Foto}`"
          :alt="nugget.Nombre"
          width="150"
        />
        <p>{{ nugget.Descripcion }}</p>
        <p>Precio: ${{ nugget.Precio }}</p>
        <div>
          <button @click="decrease(index)">-</button>
          <span>{{ quantities[index] }}</span>
          <button @click="increase(index)">+</button>
        </div>
        <button @click="addToCart(nugget, index)">Agregar al carrito</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineEmits, computed, onMounted } from 'vue'
import axios from 'axios'

const nuggets = ref([])
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

const addToCart = (nugget, index) => {
  const quantity = quantities.value[index]
  if (quantity < 1) return
  emit('add-to-cart', { ...nugget, quantity })
}

// Filtrar nuggets por tipo
const filtroNuggets = computed(() => {
  if (selectedType.value === 'todas') {
    return nuggets.value
  }
  return nuggets.value.filter(
    nugget => nugget.CategoriaDetalle === selectedType.value
  )
})

// Cargar productos desde el backend al montar el componente
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/productos')
    // Solo nuggets: filtra por CategoriaSeccion
    nuggets.value = response.data.filter(
      p => p.CategoriaSeccion && p.CategoriaSeccion === 'Nuggets'
    )
    quantities.value = nuggets.value.map(() => 1)
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