<template>
  <div class="crear-producto">
    <h2>Crear Producto</h2>
    <form @submit.prevent="submitProduct">
      <div class="form-group">
        <label for="categoria">Categoría:</label>
        <select id="categoria" v-model="product.ID_Categoria" required>
          <option value="" disabled>Seleccione una categoría</option>
          <option v-for="cat in categorias" :key="cat.ID" :value="cat.ID">
            {{ cat.Seccion }}
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
      </div>
      <button type="submit">Crear Producto</button>
     
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
import { authFetch } from '@/helpers/authFetch'

// Verificación de autenticación al montar el componente
onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login') // o la ruta de login que uses
  }
})



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

const submitProduct = async () => {
  try {
    const formData = new FormData();
    formData.append('ID_Categoria', product.value.ID_Categoria);
    formData.append('Nombre', product.value.Nombre);
    formData.append('Descripcion', product.value.Descripcion);
    formData.append('Precio', product.value.Precio);
    if (product.value.Foto) {
      formData.append('Foto', product.value.Foto);
    }

   const response = await authFetch('http://localhost:3000/api/productos', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Error al crear producto');
    alert('Producto creado con éxito');
    router.push('/admin');
  } catch (error) {
    alert('Error al crear producto');
    console.error(error);
  }
}

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/categorias')
    categorias.value = response.data
  } catch (error) {
    console.error('Error al obtener categorías:', error)
  }
})
</script>

<style scoped>
.crear-producto {
  font-family: 'Georgia', serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--primary-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.crear-producto option {
 font-family: 'Georgia', serif;
  font-size: 16px;
  color: #000000;
}
.crear-producto textarea {
  font-family: 'Georgia', serif;
  font-size: 16px;
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
a{
  display: block;
  text-align: center;
  margin-top: 10px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 14px;
}
</style>