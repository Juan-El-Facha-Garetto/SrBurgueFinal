<template>
   <!-- Ícono flotante del carrito que navega a la página del carrito -->
    <router-link to="/carrito" class="carrito-flotante-link">
      <CarritoIcon :totalItems="totalItems" />
    </router-link>
    <VolverHomeButton />
    <div v-if="mensaje" class="notificacion">{{ mensaje }}</div>
  <div class="lista-productos">
   <h2 v-if="productos.length">Productos de {{ productos[0].CategoriaSeccion }}</h2>
    <h2 v-else>Productos</h2>
    <ul v-if="productos.length">
      <li v-for="producto in productos" :key="producto.ID">
        <img v-if="producto.Foto" :src="`http://localhost:3000/uploads/${producto.Foto}`" :alt="producto.Nombre"/>
        <h3>{{ producto.Nombre }}</h3>
        <p class="descripcion">{{ producto.Descripcion }}</p>
        <p class="precio">Precio: ${{ producto.Precio }}</p>

        <input type="number" min="1" v-model.number="cantidades[producto.ID]" style="width: 60px; margin-right: 8px;"/>

        <button @click="agregar(producto)">Agregar al carrito</button>
      </li>
    </ul>
    <p v-else>No hay productos en esta categoría.</p>
  </div>

  <CarritoNew :cart="cart" @remove-from-cart="handleRemoveFromCart" @clear-cart="handleClearCart" />

</template>

<script setup>
import { ref, onMounted, watch, computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import CarritoIcon from './CarritoIcon.vue'
import VolverHomeButton from './VolverHomeButton.vue'

const productos = ref([])
const route = useRoute()
const mensaje = ref('')
const cart = inject('cart')
const categoria = ref(route.params.categoria)
console.log('Categoría actual:', categoria.value)
const cantidades = ref({}) // NUEVO

function addToCartMultiple(producto, cantidad) {
  for (let i = 0; i < cantidad; i++) {
    cart.value.push({
      id: producto.ID,
      name: producto.Nombre,
      description: producto.Descripcion,
      price: producto.Precio,
      image: producto.Foto,
      CategoriaSeccion: producto.CategoriaSeccion,
      observaciones: '' // Cada unidad con su observación individual
    })
  }
}

const agregar = (producto) => {
  const cantidad = cantidades.value[producto.ID] || 1
  addToCartMultiple(producto, cantidad)
  cantidades.value[producto.ID] = 1
  mensaje.value = `¡${cantidad} ${producto.Nombre}${cantidad > 1 ? 's' : ''} agregado${cantidad > 1 ? 's' : ''} al carrito!`
  setTimeout(() => mensaje.value = '', 1800)
}

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

const totalItems = computed(() => cart.value.length)
</script>



<style scoped>

.notificacion {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #4caf50;
  color: #fff;
  padding: 14px 24px;
  border-radius: 8px;
  font-weight: bold;
  font-family: 'Georgia', serif;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: opacity 0.6s;
}


.lista-productos {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--primary-color);
  border-radius: 8px;
  border: 2px solid #000000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.lista-productos h2{
 font-family: 'Georgia', serif;
  text-align: center;
  margin-top: 30px; 
}
.lista-productos h3{
  font-family: 'Georgia', serif;
  margin: 10px 0;
}
.lista-productos ul li {
  margin-bottom: 30px; /* Ajusta el valor según prefieras */
  padding-bottom: 10px;
  border-bottom: 1px solid var(--secondary-color); /* Opcional: línea divisoria suave */
}
.lista-productos button {
  margin: 10px;
  padding: 10px 10px;
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
.lista-productos img {
  max-width: 160px; /* Ajusta el tamaño de la imagen */
  height: auto;
  border-radius: 8px;
  margin-right: 20px; /* Espacio entre imagen y texto */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}
.descripcion{
  font-family: 'Georgia', serif;
  margin: 5px 0;
}
.precio {
  font-family: 'Georgia', serif;
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 5px 0;
}
</style>