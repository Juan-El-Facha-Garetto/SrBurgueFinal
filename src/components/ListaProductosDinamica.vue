<template>
   <!-- Ícono flotante del carrito que navega a la página del carrito -->
    <router-link to="/carrito" class="carrito-flotante-link">
      <CarritoIcon :totalItems="totalItems" />
    </router-link>
    <VolverHomeButton />
  <div>
   <h2 v-if="productos.length">Productos de {{ productos[0].CategoriaSeccion }}</h2>
    <h2 v-else>Productos</h2>
    <ul v-if="productos.length">
      <li v-for="producto in productos" :key="producto.ID">
        <img v-if="producto.Foto" :src="`http://localhost:3000/uploads/${producto.Foto}`" :alt="producto.Nombre" width="120" />
        <h3>{{ producto.Nombre }}</h3>
        <p>{{ producto.Descripcion }}</p>
        <p>Precio: ${{ producto.Precio }}</p>
        <button @click="addToCart(producto)">Agregar al carrito</button>
      </li>
    </ul>
    <p v-else>No hay productos en esta categoría.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import CarritoIcon from './CarritoIcon.vue'
import VolverHomeButton from './VolverHomeButton.vue'

const productos = ref([])
const route = useRoute()
const addToCart = inject('addToCart')
const cart = inject('cart')
const categoria = ref(route.params.categoria)
console.log('Categoría actual:', categoria.value)

async function cargarProductos() {
  const response = await fetch(`http://localhost:3000/api/productos/filtrados?idCategoria=${categoria.value}`)
  if (response.ok) {
    productos.value = await response.json()
  } else {
    productos.value = []
  }
}

onMounted(() => {
  console.log('Cargando productos para la categoría:', categoria.value)
  cargarProductos()
})
// Si cambias de categoría sin recargar la página, vuelve a cargar productos
watch(() => route.params.categoria, (newCat) => {
  categoria.value = newCat
  console.log('Categoría actualizada:', categoria.value)
  cargarProductos()
})

const totalItems = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
</script>



<style scoped>
.categorias-botones {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}
button {
  padding: 10px 20px;
  background: #FFD600;
  border: 2px solid #333;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #FFEA70;
}
</style>