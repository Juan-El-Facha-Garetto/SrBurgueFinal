<template>
  <div>
    <VolverHomeButton @click="volverAlCarrito" texto="Volver al carrito" />
    <h2>Resumen del Pedido</h2>
    <div v-if="metodo === 2">
      <h3>Datos para Transferencia</h3>
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
          <tr v-for="cuenta in cuentasTransferencia" :key="cuenta.ID">
            <td>{{ cuenta.Alias }}</td>
            <td>{{ cuenta.Cuit }}</td>
            <td>{{ cuenta.NombreYApellido }}</td>
            <td>{{ cuenta.Entidad }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3>Detalle del pedido</h3>
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio unitario</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="detalle in detalles" :key="detalle.ID">
          <td>{{ detalle.NombreProducto }}</td>
          <td>{{ detalle.Cantidad }}</td>
          <td>{{ detalle.PrecioUnitario }}</td>
          <td>{{ detalle.Subtotal }}</td>
        </tr>
      </tbody>
    </table>
    <p><strong>Total: ${{ total }}</strong></p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import VolverHomeButton from './VolverHomeButton.vue';

const route = useRoute();
const router = useRouter();
const pedidoId = route.params.id;
const metodo = Number(route.params.metodo);

const detalles = ref([]);
const total = ref(0);
const cuentasTransferencia = ref([]);

const volverAlCarrito = () => {
  router.push({ name: 'Carrito' });
};

onMounted(async () => {
  // Trae los detalles del pedido
  const res = await fetch(`http://localhost:3000/api/pedidos/detallepedido/${pedidoId}`);
  if (res.ok) {
    detalles.value = await res.json();
    total.value = detalles.value.reduce((sum, d) => sum + d.Subtotal, 0);
  }
  // Trae los datos de transferencia solo si corresponde
  if (metodo === 2) {
    const resCuentas = await fetch('http://localhost:3000/api/transferencias');
    if (resCuentas.ok) {
      cuentasTransferencia.value = await resCuentas.json();
    }
  }
});
</script>