<template>
  <div>
    <h2>Cuentas para Transferencia</h2>
    <table>
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
          <td>{{ cuenta.Alias }}</td>
          <td>{{ cuenta.Cuit }}</td>
          <td>{{ cuenta.NombreYApellido }}</td>
          <td>{{ cuenta.Entidad }}</td>
          <td>
            <button @click="editarCuenta(cuenta)">Editar</button>
            <button @click="eliminarCuenta(cuenta.ID)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>{{ editando ? 'Editar cuenta' : 'Agregar nueva cuenta' }}</h3>
    <form @submit.prevent="editando ? guardarEdicion() : agregarCuenta()">
      <input v-model="nueva.Alias" placeholder="Alias" required />
      <input v-model="nueva.Cuit" placeholder="Cuit" required />
      <input v-model="nueva.NombreYApellido" placeholder="Nombre y Apellido" required />
      <input v-model="nueva.Entidad" placeholder="Entidad" required />
      <button type="submit">{{ editando ? 'Guardar' : 'Agregar' }}</button>
      <button v-if="editando" type="button" @click="cancelarEdicion">Cancelar</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const cuentas = ref([]);
const nueva = ref({ Alias: '', Cuit: '', NombreYApellido: '', Entidad: '' });
const editando = ref(false);
const editId = ref(null);

const cargarCuentas = async () => {
  const res = await fetch('http://localhost:3000/api/transferencias');
  cuentas.value = await res.json();
};

const agregarCuenta = async () => {
  await fetch('http://localhost:3000/api/transferencias', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nueva.value)
  });
  nueva.value = { Alias: '', Cuit: '', NombreYApellido: '', Entidad: '' };
  cargarCuentas();
};

const editarCuenta = (cuenta) => {
  nueva.value = { ...cuenta };
  editando.value = true;
  editId.value = cuenta.ID;
};

const guardarEdicion = async () => {
  await fetch(`http://localhost:3000/api/transferencias/${editId.value}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nueva.value)
  });
  nueva.value = { Alias: '', Cuit: '', NombreYApellido: '', Entidad: '' };
  editando.value = false;
  editId.value = null;
  cargarCuentas();
};

const cancelarEdicion = () => {
  nueva.value = { Alias: '', Cuit: '', NombreYApellido: '', Entidad: '' };
  editando.value = false;
  editId.value = null;
};

const eliminarCuenta = async (id) => {
  await fetch(`http://localhost:3000/api/transferencias/${id}`, {
    method: 'DELETE'
  });
  cargarCuentas();
};

onMounted(cargarCuentas);
</script>