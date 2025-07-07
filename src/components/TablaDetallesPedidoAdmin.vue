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
        <tr v-for="detalle in detalles" :key="detalle.id_detalle">
          <td>{{ detalle.id_pedido }}</td>
          <td>{{ new Date(detalle.fecha).toLocaleDateString() }}</td>
          <td>{{ detalle.hora.split('T')[1]?.slice(0,5) }}</td>
          <td>{{ detalle.nombreproducto }}</td>
          <td>{{ detalle.cantidad }}</td>
          <td>{{ detalle.preciounitario }}</td>
          <td>{{ detalle.subtotal }}</td>
          <td>{{ detalle.observaciones }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const detalles = ref([])

const API_URL = process.env.VUE_APP_API_URL;
onMounted(async () => {
  const res = await fetch(`${API_URL}/api/pedidos/todos-detalles`)
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