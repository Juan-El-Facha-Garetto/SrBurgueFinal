<template>
  <div class="crear-producto">
    <h2>Crear Producto</h2>
    <form @submit.prevent="submitProduct">
      <div class="form-group">
        <label for="Id">Id:</label>
        <input type="text" id="Id" v-model="product.Id" required />
      </div>
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="product.name" required />
      </div>
      <div class="form-group">
        <label for="description">Descripción:</label>
        <textarea id="description" v-model="product.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="price">Precio:</label>
        <input type="number" id="price" v-model="product.price" required />
      </div>
      <div class="form-group">
        <label for="photo">Foto:</label>
        <input type="file" id="photo" @change="handleFileUpload" />
      </div>
      <button type="submit">Crear Producto</button>
      <a href="/admin">Volver al menu principal</a>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const product = ref({
  Id: '',
  name: '',
  description: '',
  price: null,
  photo: null,
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  product.value.photo = file
}

const submitProduct = () => {
  console.log('Producto creado:', product.value)
  alert('Producto creado con éxito')
  // Aquí puedes agregar la lógica para enviar el producto al backend
}
</script>

<style scoped>
.crear-producto {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
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