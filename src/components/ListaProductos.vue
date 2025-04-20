<template>
  <div class="lista-productos">
    <h2>Lista de Productos</h2>
    <table>
      <thead>
        <button @click="agregarProducto" class="Agregar">Agregar Producto</button>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>{{ producto.name }}</td>
          <td>{{ producto.description }}</td>
          <td>${{ producto.price }}</td>
          <td>
            <button @click="editarProducto(producto.id)">Editar</button>
            <button @click="eliminarProducto(producto.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Lista de productos simulada
const productos = ref([
  { id: '1', name: 'Hamburguesa', description: 'Deliciosa hamburguesa', price: 10 , photo: null},
  { id: '2', name: 'Papas Fritas', description: 'Crujientes papas fritas', price: 5, photo: null},
  { id: '3', name: 'Refresco', description: 'Refresco frío y refrescante', price: 3, photo: null},
  { id: '4', name: 'Pizza', description: 'Pizza con ingredientes frescos', price: 12, photo: null},
  { id: '5', name: 'Ensalada', description: 'Ensalada fresca y saludable', price: 8, photo: null},
  { id: '6', name: 'Taco', description: 'Taco con carne y vegetales', price: 4, photo: null},
  { id: '7', name: 'Sopa', description: 'Sopa caliente y reconfortante', price: 6, photo: null},
])

// Función para agregar un nuevo producto
const agregarProducto = () => {
  router.push('/crear-producto')
}
// Función para redirigir a la vista de edición
const editarProducto = (id) => {
  router.push(`/editar-producto/${id}`)
}

// Función para eliminar un producto
const eliminarProducto = (id) => {
  const index = productos.value.findIndex((producto) => producto.id === id)
  if (index !== -1) {
    productos.value.splice(index, 1)
    alert('Producto eliminado con éxito')
  }
}
</script>

<style scoped>
.lista-productos {
  max-width: calc(100% - 40px);
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.Agregar {
  width: calc(100% - 20px);
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: var(--background-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: var(--primary-color);
  color: var(--text-color);
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid var(--border-color);
}

tbody tr:nth-child(even) {
  background-color: var(--secondary-color);
}

button {
  padding: 5px 10px;
  margin-right: 5px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: var(--accent-color);
}
</style>