<!-- filepath: src/components/AdminTransferencias.vue -->
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="cuenta in cuentas" :key="cuenta.ID">
          <td>{{ cuenta.Alias }}</td>
          <td>{{ cuenta.Cuit }}</td>
          <td>{{ cuenta.NombreYApellido }}</td>
          <td>{{ cuenta.Entidad }}</td>
        </tr>
      </tbody>
    </table>
    <h3>Agregar nueva cuenta</h3>
    <form @submit.prevent="agregarCuenta">
      <input v-model="nueva.Alias" placeholder="Alias" required />
      <input v-model="nueva.Cuit" placeholder="Cuit" required />
      <input v-model="nueva.NombreYApellido" placeholder="Nombre y Apellido" required />
      <input v-model="nueva.Entidad" placeholder="Entidad" required />
      <button type="submit">Agregar</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const cuentas = ref([]);
const nueva = ref({ Alias: '', Cuit: '', NombreYApellido: '', Entidad: '' });

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

onMounted(cargarCuentas);
</script>