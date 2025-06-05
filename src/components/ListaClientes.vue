<template>
  <div class="lista-clientes">
    <h2>Lista de Clientes</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.apellido }}</td>
          <td>{{ cliente.telefono }}</td>
          <td>{{ cliente.direccion }}</td>
          <td>{{ cliente.email }}</td>
          <td>
            <button @click="editarCliente(cliente.id)">Editar</button>
            <button @click="eliminarCliente(cliente.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {  useRouter } from 'vue-router'
import { authFetch } from '@/helpers/authFetch';

const clientes = ref([]);
const router = useRouter();

// Cargar clientes desde el backend al montar el componente
onMounted(async () => {
  try {
    const response = await authFetch('http://localhost:3000/api/personas/all')
    if (response.ok) {
      const data = await response.json()
      console.log('Clientes cargados:',data);
      // Mapea los datos para mostrar dirección como "Calle Altura"
      clientes.value = data.map(c => ({
        id: c.ID,
        nombre: c.Nombre,
        apellido: c.Apellido,
        telefono: `${c.CodArea} ${c.Telefono}`,
        direccion: `${c.Calle} ${c.Altura}`,
        email: c.Email
      }))
    } else {
      alert('Error al cargar clientes')
    }
  } catch (error) {
    alert('Error de conexión al cargar clientes')
  }
});


  // Función para redirigir a la vista de edición
const editarCliente = (id) => {
  router.push(`/editar-cliente/${id}`)
}

// Función para eliminar un cliente
const eliminarCliente = (id) => {
  const index = clientes.value.findIndex((clientes) => clientes.id === id)
  if (index !== -1) {
    clientes.value.splice(index, 1)
    alert('Producto eliminado con éxito')
  }
}

</script>

<style scoped>
.lista-clientes {
  max-width: calc(100% - 40px);
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

th,
td {
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