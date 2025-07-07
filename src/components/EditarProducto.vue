<template>
  <div class="editar-producto">
    <h2>Editar Producto</h2>
    <form @submit.prevent="submitProduct">
      <div class="form-group">
        <label for="categoria">Categoría:</label>
        <select id="categoria" v-model="product.id_categoria" required>
          <option value="" disabled>Seleccione una categoría</option>
          <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
            {{ cat.seccion }} - {{ cat.detalle }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="product.nombre" required />
      </div>
      <div class="form-group">
        <label for="description">Descripción:</label>
        <textarea id="description" v-model="product.descripcion" required></textarea>
      </div>
      <div class="form-group">
        <label for="price">Precio:</label>
        <input type="number" id="price" v-model="product.precio" required />
      </div>
      <div class="form-group">
        <label for="photo">Foto:</label>
        <input type="file" id="photo" @change="handleFileUpload" />
        <div v-if="product.foto && typeof product.foto === 'string'">
          <img :src="`${API_URL}/uploads/${product.foto}`" alt="Foto actual" 
          class="img-preview"/>
        </div>
      </div>
      <button type="submit">Guardar Producto</button>
      <button type="button" @click="router.push('/admin')">Volver al lobby</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { authFetch } from '@/helpers/authFetch'

const route = useRoute()
const router = useRouter()
const productId = route.params.id

const API_URL = process.env.VUE_APP_API_URL;
const categorias = ref([])
const product = ref({
  id_categoria: '',
  nombre: '',
  descripcion: '',
  precio: null,
  foto: null,
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  product.value.foto = file || null
}

const loadCategorias = async () => {
  const response = await axios.get(`${API_URL}/api/categorias`)
  categorias.value = response.data
}

const loadProduct = async () => {
  const response = await axios.get(`${API_URL}/api/productos/${productId}`)
  product.value = response.data
}

const submitProduct = async () => {
  try {
    const formData = new FormData()
    formData.append('id_categoria', product.value.id_categoria)
    formData.append('nombre', product.value.nombre)
    formData.append('descripcion', product.value.descripcion)
    formData.append('precio', product.value.precio)
    // Si se subió una nueva foto, la enviamos
    if (product.value.foto instanceof File) {
      formData.append('foto', product.value.foto)
    } else if (typeof product.value.foto === 'string') {
      formData.append('foto', product.value.foto)
    }

   const response = await authFetch(`${API_URL}/api/productos/${productId}`, {
      method: 'PUT',
      body: formData
    })
    if (!response.ok) throw new Error('Error al editar producto')
    alert('Producto editado con éxito')
    router.push('/admin')
  } catch (error) {
    alert('Error al editar producto')
    console.error(error)
  }
}

onMounted(() => {
  loadCategorias()
  loadProduct()
})
</script>

<style scoped>
.editar-producto {
  font-family: 'Georgia', serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.img-preview {
  display: block;
  margin: 0 auto 10px auto; /* Centra y agrega margen abajo */
  width: 180px;             /* O el tamaño que prefieras */
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
}

button {
  font-family: 'Georgia', serif;
  font-size: 20px;
  width: 100%;
  padding: 10px;
  background-color: var(--primary-color);
  color: var(--text-color);
  border-radius: 8px;
  border: 2px solid #000000;
  transition: background-color 0.6s ease;
  cursor: pointer;
}

button:hover {
  background-color: var(--secondary-color);
}
button + button {
  margin-top: 10px;
}
a{
  display: block;
  text-align: center;
  margin-top: 10px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 14px;
}
</style>