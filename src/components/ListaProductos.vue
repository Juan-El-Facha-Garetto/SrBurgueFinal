<template>
  <div class="lista-productos">
    <h2>Lista de Productos</h2>
   
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Categoría</th> 
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody class="productos-lista">
        <tr v-for="producto in productos" :key="producto.ID">
          <td>{{ producto.Nombre }}</td>
          <td>{{ producto.Descripcion }}</td>
          <td>${{ producto.Precio }}</td>
          <td>{{ producto.CategoriaSeccion }}</td> 
          <td>
            <img v-if="producto.Foto" :src="`http://localhost:3000/uploads/${producto.Foto}`" alt="Foto" width="70" />
          </td>
          <td>
            <button @click="editarProducto(producto.ID)">Editar</button>
            <button @click="eliminarProducto(producto.ID)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { authFetch } from '@/helpers/authFetch'

const router = useRouter()
const productos = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/productos')
    productos.value = response.data
  } catch (error) {
    console.error('Error al obtener productos:', error)
  }
})

const editarProducto = (id) => {
  router.push(`/editar-producto/${id}`)
}
const eliminarProducto = async (id) => {
  if (confirm('¿Seguro que deseas eliminar este producto?')) {
    try {
     await authFetch(`http://localhost:3000/api/productos/${id}`, {
        method: 'DELETE'
      });
      productos.value = productos.value.filter(producto => producto.ID !== id);
      alert('Producto eliminado con éxito');
    } catch (error) {
      alert('Error al eliminar producto');
      console.error(error);
    }
  }
}
</script>

<style scoped>
.btnAgregar {
  width: calc(100% - 20px);
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: #000000;
  border: 2px solid #000000;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.6s ease;
   font-family: 'Georgia', serif;
   font-size: 1.5rem;
}

.lista-productos {
  max-width: calc(100% - 40px);
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #000000;
  border-radius: 4px;
}
.lista-productos h2 {
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Georgia', serif;
  color: #000000;
}
.lista-productos tr{ 
  background-color: #e2dbcc;
  font-family: 'Georgia', serif;
  color: #000000;
  border: 2px solid #000000;

}
.productos-lista{
   background-color: #e2dbcc

}
.Agregar {
  width: calc(100% - 20px);
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #e2dbcc;
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.6s ease;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
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
  font-family: 'Georgia', serif;
  padding: 5px 10px;
  margin-right: 5px;
  background-color: var(--primary-color);
  color: var(--text-color);
  border-radius: 8px;
  border: 2px solid #000000;
  cursor: pointer;
  transition: background-color 0.6s ease;
}
button:hover {
  background-color: var(--secondary-color);
}

</style>