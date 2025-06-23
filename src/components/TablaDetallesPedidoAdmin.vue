<template>
  <div class="tabla-detalles">
    <h2>Detalles de Pedidos</h2>
    <table>
      <thead class="thead-detalles">
        <tr>
          <th>Pedido</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Subtotal</th>
          <th>Observaciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="detalle in detalles" :key="detalle.ID_Detalle">
          <td>{{ detalle.ID_Pedido }}</td>
          <td>{{ new Date(detalle.Fecha).toLocaleDateString() }}</td>
          <td>{{ detalle.Hora.split('T')[1]?.slice(0,5) }}</td>
          <td>{{ detalle.NombreProducto }}</td>
          <td>{{ detalle.Cantidad }}</td>
          <td>{{ detalle.PrecioUnitario }}</td>
          <td>{{ detalle.Subtotal }}</td>
          <td>{{ detalle.Observaciones }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const detalles = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/pedidos/todos-detalles')
  if (res.ok) {
    detalles.value = await res.json()
    console.log('Cantidad de detalles:', detalles.value.length)
    console.log(detalles.value)
  }
})
</script>

<style scoped>
.tabla-detalles {
  font-family: 'Georgia', serif;
  background-color: var(--primary-color);
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #000000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}
.tabla-detalles h2{
  text-align: center;
  margin-bottom: 20px;
}
.thead-detalles{
  background-color: var(--secondary-color);
}
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
thead {
  background: #eee;
}
</style>