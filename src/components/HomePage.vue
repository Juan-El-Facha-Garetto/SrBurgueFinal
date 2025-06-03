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
    </div>
    <router-view />
    <CarritoNew :cart="cart" @remove-from-cart="handleRemoveFromCart" @clear-cart="cart = []"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CarritoNew from './CarritoNew.vue'

const categorias = ref([]) // <--- nombre correcto
const cart = ref([])
const router = useRouter()

onMounted(async () => {
  const response = await fetch('http://localhost:3000/api/categorias')
  if (response.ok) {
    categorias.value = await response.json()
  } else {
    alert('Error al cargar categorías')
  }
})

function irAProductos(idCategoria) {
  console.log('Navegando a productos de categoría:', idCategoria)
  router.push({ name: 'productos-categoria', params: { categoria: idCategoria } })
}

function handleRemoveFromCart(id) {
  cart.value = cart.value.filter(item => item.id !== id)
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
