<template>
  <div>
    <h2>Categorías de comida</h2>
    <table>
      <thead>
        <tr>
          <th>Sección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categorias" :key="cat.ID">
          <td>
            <input v-if="editando && editandoId === cat.ID" v-model="editandoSeccion" required />
            <span v-else>{{ cat.Seccion }}</span>
          </td>
          <td>
            <button v-if="!editando || editandoId !== cat.ID" @click="empezarEdicion(cat)">Editar</button>
            <button v-if="editando && editandoId === cat.ID" @click="guardarEdicion(cat)">Guardar</button>
            <button v-if="editando && editandoId === cat.ID" @click="cancelarEdicion">Cancelar</button>
            <button @click="eliminarCategoria(cat.ID)">Eliminar</button>
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

const editando = ref(false)
const editandoId = ref(null)
const editandoSeccion = ref('')

const cargarCategorias = async () => {
  const response = await fetch('http://localhost:3000/api/categorias')
  if (response.ok) {
    categorias.value = await response.json()
  }
}

const crearCategoria = async () => {
  mensaje.value = ''
  if (!seccion.value) return

  const body = {
    Seccion: seccion.value,
    Detalle: null
  }

  const response = await fetch('http://localhost:3000/api/categorias', {
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
  editandoId.value = cat.ID
  editandoSeccion.value = cat.Seccion
  seccion.value = cat.Seccion
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
    Seccion: editandoSeccion.value,
    Detalle: null
  }
  const response = await fetch(`http://localhost:3000/api/categorias/${editandoId.value}`, {
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
  const response = await fetch(`http://localhost:3000/api/categorias/${id}`, {
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
  margin-top: 10px;
  font-weight: bold;
  color: #4caf50;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
button {
  margin-right: 6px;
}
</style>