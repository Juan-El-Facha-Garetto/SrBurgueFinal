<template>
  <div class="tabla-categorias">
    <h2>Categorías de comida</h2>
    <table>
      <thead>
        <tr>
          <th>Sección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categorias" :key="cat.id">
          <td>
            <input v-if="editando && editandoId === cat.id" v-model="editandoSeccion" required />
            <span v-else>{{ cat.seccion }}</span>
          </td>
          <td>
            <button v-if="!editando || editandoId !== cat.id" @click="empezarEdicion(cat)">Editar</button>
            <button v-if="editando && editandoId === cat.id" @click="guardarEdicion(cat)">Guardar</button>
            <button v-if="editando && editandoId === cat.id" @click="cancelarEdicion">Cancelar</button>
            <button @click="eliminarCategoria(cat.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3 style="margin-top:30px;">{{ editando ? 'Editar categoría' : 'Agregar nueva categoría' }}</h3>
    <form @submit.prevent="editando ? guardarEdicion() : crearCategoria()">
      <input v-model="seccion" placeholder="Sección" required />
      <button type="submit">{{ editando ? 'Guardar' : 'Agregar' }}</button>
      <button v-if="editando" type="button" @click="cancelarEdicion">Cancelar</button>
    </form>
    <div v-if="mensaje" class="mensaje">{{ mensaje }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const seccion = ref('')
const mensaje = ref('')
const categorias = ref([])
const API_URL = process.env.VUE_APP_API_URL;
const editando = ref(false)
const editandoId = ref(null)
const editandoSeccion = ref('')

const cargarCategorias = async () => {
  const response = await fetch(`${API_URL}/api/categorias`)
  if (response.ok) {
    categorias.value = await response.json()
  }
}

const crearCategoria = async () => {
  mensaje.value = ''
  if (!seccion.value) return

  const body = {
    seccion: seccion.value,
  }

  const response = await fetch(`${API_URL}/api/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (response.ok) {
    mensaje.value = '¡Categoría creada exitosamente!'
    seccion.value = ''
    await cargarCategorias()
  } else {
    mensaje.value = 'Error al crear la categoría.'
  }
}

const empezarEdicion = (cat) => {
  editando.value = true
  editandoId.value = cat.id
  editandoSeccion.value = cat.seccion
  seccion.value = cat.seccion
}

const cancelarEdicion = () => {
  editando.value = false
  editandoId.value = null
  editandoSeccion.value = ''
  seccion.value = ''
}

const guardarEdicion = async () => {
  if (!editandoSeccion.value) return
  const body = {
    seccion: editandoSeccion.value,
  }
  const response = await fetch(`${API_URL}/api/categorias/${editandoId.value}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (response.ok) {
    mensaje.value = '¡Categoría editada!'
    await cargarCategorias()
    cancelarEdicion()
  } else {
    mensaje.value = 'Error al editar la categoría.'
  }
}

const eliminarCategoria = async (id) => {
  if (!confirm('¿Seguro que deseas eliminar esta categoría?')) return
  const response = await fetch(`${API_URL}/api/categorias/${id}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    mensaje.value = '¡Categoría eliminada!'
    await cargarCategorias()
  } else {
    mensaje.value = 'Error al eliminar la categoría.'
  }
}

onMounted(() => {
  cargarCategorias()
})
</script>

<style scoped>
.mensaje {
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
  color: #4caf50;
}
.tabla-categorias{
  font-family: 'Georgia', serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #e2dbcc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.tabla-categorias option {
 font-family: 'Georgia', serif;
  font-size: 16px;
  color: #000000;
}
.tabla-categorias textarea {
  font-family: 'Georgia', serif;
  font-size: 16px;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
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