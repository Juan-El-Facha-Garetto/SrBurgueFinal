<template>
  <div class="home">
    <h1 class="Bienvenidos">Bienvenidos a SrBurgues</h1>
    <div class="botones">
      <button
         v-for="cat in categorias"
            :key="cat.ID"
            @click="irAProductos(cat.ID)"
          >
        {{ cat.Seccion }} 
      </button>
      <div>
        <button v-if="esAdmin" @click="router.push('/admin')">Ir al panel de administrador</button>
        <button v-else @click="router.push('/login')">Iniciar sesión (Admin)</button>
      </div>
    </div>
    <CarritoIcon :totalItems="totalItems" @abrir-carrito="irAlCarrito" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import CarritoIcon from './CarritoIcon.vue'
import { useCartStore } from '@/stores/cart'

// Componente para la página de inicio
const user = JSON.parse(localStorage.getItem('user') || '{}')
const esAdmin = user.rol === 'admin'

const categorias = ref([]) 
const router = useRouter()
const cartStore = useCartStore()

const totalItems = computed(() => cartStore.items.reduce((sum, item) => sum + item.quantity, 0))

onMounted(async () => {
  const response = await fetch('http://localhost:3000/api/categorias')
  if (response.ok) {
    categorias.value = await response.json()
  } else {
    alert('Error al cargar categorías')
  }
})

function irAProductos(idCategoria) {
  router.push({ name: 'productos-categoria', params: { categoria: idCategoria } })
}

function irAlCarrito() {
  router.push('/carrito')
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

.Bienvenidos {
  text-align: center;
  margin-top: 30px; 
}
.botones {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px; 
}

</style>
