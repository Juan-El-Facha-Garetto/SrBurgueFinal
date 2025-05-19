<template>
  <div class="editar-producto">
    <h2>Editar Producto</h2>
    <form @submit.prevent="submitProduct">
      <div class="form-group">
        <label for="categoria">Categoría:</label>
        <select id="categoria" v-model="product.ID_Categoria" required>
          <option value="" disabled>Seleccione una categoría</option>
          <option v-for="cat in categorias" :key="cat.ID" :value="cat.ID">
            {{ cat.Seccion }} - {{ cat.Detalle }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="product.Nombre" required />
      </div>
      <div class="form-group">
        <label for="description">Descripción:</label>
        <textarea id="description" v-model="product.Descripcion" required></textarea>
      </div>
      <div class="form-group">
        <label for="price">Precio:</label>
        <input type="number" id="price" v-model="product.Precio" required />
      </div>
      <div class="form-group">
        <label for="photo">Foto:</label>
        <input type="file" id="photo" @change="handleFileUpload" />
        <div v-if="product.Foto && typeof product.Foto === 'string'">
          <img :src="`http://localhost:3000/uploads/${product.Foto}`" alt="Foto actual" width="80" />
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

const route = useRoute()
const router = useRouter()
const productId = route.params.id

const categorias = ref([])
const product = ref({
  ID_Categoria: '',
  Nombre: '',
  Descripcion: '',
  Precio: null,
  Foto: null,
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  product.value.Foto = file || null
}

const loadCategorias = async () => {
  const response = await axios.get('http://localhost:3000/api/categorias')
  categorias.value = response.data
}

const loadProduct = async () => {
  const response = await axios.get(`http://localhost:3000/api/productos/${productId}`)
  product.value = response.data
}

const submitProduct = async () => {
  try {
    const formData = new FormData()
    formData.append('ID_Categoria', product.value.ID_Categoria)
    formData.append('Nombre', product.value.Nombre)
    formData.append('Descripcion', product.value.Descripcion)
    formData.append('Precio', product.value.Precio)
    // Si se subió una nueva foto, la enviamos
    if (product.value.Foto instanceof File) {
      formData.append('Foto', product.value.Foto)
    } else if (typeof product.value.Foto === 'string') {
      formData.append('Foto', product.value.Foto)
    }

    await axios.put(`http://localhost:3000/api/productos/${productId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
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
  max-width: 500px;
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
  width: 100%;
  padding: 10px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: var(--accent-color);
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