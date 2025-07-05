<template>
  <div>
    <h2 class="titulo">Cuentas para Transferencia</h2>
    <table class="tabla-transferencias">
      <thead>
        <tr>
          <th>Alias</th>
          <th>Cuit</th>
          <th>Nombre y Apellido</th>
          <th>Entidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cuenta in cuentas" :key="cuenta.ID">
          <td>{{ cuenta.alias }}</td>
          <td>{{ cuenta.cuit }}</td>
          <td>{{ cuenta.nombreyapellido }}</td>
          <td>{{ cuenta.entidad }}</td>
          <td>
            <button @click="editarCuenta(cuenta)">Editar</button>
            <button @click="eliminarCuenta(cuenta.ID)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
      <div class="formulario crear-producto">
  <h2>{{ editando ? 'Editar cuenta' : 'Agregar nueva cuenta' }}</h2>
  <form @submit.prevent="editando ? guardarEdicion() : agregarCuenta()" class="form">
    <div class="form-group">
      <label for="alias">Alias:</label>
      <input v-model="nueva.alias" placeholder="Alias" required />
    </div>
    <div class="form-group">
      <label for="cuit">C.U.I.T.:</label>
      <input v-model="nueva.cuit" placeholder="Cuit" required />
    </div>
    <div class="form-group">
      <label for="nombreyapellido">Nombre y Apellido:</label>
      <input v-model="nueva.nombreyapellido" placeholder="Nombre y Apellido" required />
    </div>
    <div class="form-group">
      <label for="entidad">Entidad:</label>
      <input v-model="nueva.entidad" placeholder="Entidad" required />
    </div>
    <div class="form-group botones">
      <button type="submit">{{ editando ? 'Guardar' : 'Agregar' }}</button>
      <button v-if="editando" type="button" @click="cancelarEdicion">Cancelar</button>
    </div>
  </form>
</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const API_URL = process.env.VUE_APP_API_URL;
const cuentas = ref([]);
const nueva = ref({ alias: '', cuit: '', nombreyapellido: '', entidad: '' });
const editando = ref(false);
const editId = ref(null);

const cargarCuentas = async () => {
  const res = await fetch(`${API_URL}/api/transferencias`);
  cuentas.value = await res.json();
};

const agregarCuenta = async () => {
  await fetch(`${API_URL}/api/transferencias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nueva.value)
  });
  nueva.value = { Aalias: '', cuit: '', nombreyapellido: '', entidad: '' };
  cargarCuentas();
};

const editarCuenta = (cuenta) => {
  nueva.value = { ...cuenta };
  editando.value = true;
  editId.value = cuenta.ID;
};

const guardarEdicion = async () => {
  await fetch(`${API_URL}/api/transferencias/${editId.value}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nueva.value)
  });
  nueva.value = { alias: '', cuit: '', nombreyapellido: '', entidad: '' };
  editando.value = false;
  editId.value = null;
  cargarCuentas();
};

const cancelarEdicion = () => {
  nueva.value = { alias: '', cuit: '', nombreyapellido: '', entidad: '' };
  editando.value = false;
  editId.value = null;
};

const eliminarCuenta = async (id) => {
  await fetch(`${API_URL}/api/transferencias/${id}`, {
    method: 'DELETE'
  });
  cargarCuentas();
};

onMounted(cargarCuentas);
</script>

<style scoped>
.titulo,
 h2 {
  text-align: center;
  font-family: 'Georgia', serif;
  color: #000000;
  margin-bottom: 20px;
}


.tabla-transferencias {
  max-width: calc(100% - 40px);
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #000000;
  border-radius: 4px;
}
.tabla-transferencias h2 {
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Georgia', serif;
  color: #000000;
}
.tabla-transferencias tr{ 
  background-color: var(--primary-color);
  font-family: 'Georgia', serif;
  color: #000000;
  border: 2px solid #000000;

}
.tabla-transferencias button {
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
.formulario.crear-producto {
  font-family: 'Georgia', serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--primary-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.formulario .form-group {
  margin-bottom: 16px;
}

.formulario label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.formulario input,
.formulario textarea {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
}

.formulario button {
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
.form-group.botones {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

</style>