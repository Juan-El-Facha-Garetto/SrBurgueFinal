<template>
  <div>
    <VolverHomeButton @click="volverAlCarrito" texto="Volver al carrito" />
    <h2>Resumen del Pedido</h2>

     <div style="margin-bottom: 10px;">
        <label><strong>A nombre de:</strong></label>
        <input v-model="nombreEntrega" required placeholder="Ej: Juan Pérez" />
      </div>

    <!-- Selección de forma de entrega -->
    <div>
      <button
        :class="{ seleccionado: formaEntrega === 'retiro' }"
        @click="formaEntrega = 'retiro'"
        type="button"
      >
        Retiro en sucursal
      </button>
      <button
        :class="{ seleccionado: formaEntrega === 'envio' }"
        @click="formaEntrega = 'envio'"
        type="button"
      >
        Envío
      </button>
    </div>

    <!-- Formulario solo si elige envío -->
    <form
      v-if="formaEntrega === 'envio'"
      @submit.prevent="guardarDatosEnvio">
      <div style="margin-bottom: 10px;">
        <label><strong>Dirección de entrega:</strong></label>
        <input v-model="direccionEntrega" required placeholder="Ej: Calle 123" />
      </div>
      <div style="margin-bottom: 10px;">
        <label><strong>Ciudad:</strong></label>
        <input v-model="ciudad" required placeholder="Ej: San Francisco" />
      </div> 
      <div v-if="errorEnvio" style="color: red; margin-top: 5px;">{{ errorEnvio }}</div>
    </form>

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
          <th>Observaciones</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="detalle in detalles" :key="detalle.ID">
          <td>{{ detalle.NombreProducto }}</td>
          <td>{{ detalle.Cantidad }}</td>
          <td>{{ detalle.PrecioUnitario }}</td>
          <td>{{ detalle.Observaciones }}</td>
          <td>{{ detalle.Subtotal }}</td>
        </tr>
      </tbody>
    </table>
    <p><strong>Total: ${{ total }}</strong></p>

    <button
      type="button"
      @click="enviarPorWhatsapp"
      style="margin-top: 10px;"
      :disabled="!nombreEntrega || (formaEntrega === 'envio' && (!direccionEntrega || !ciudad))"
    >
      Enviar pedido por WhatsApp
    </button>
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

const formaEntrega = ref('retiro');
const direccionEntrega = ref('');
const nombreEntrega = ref('');
const ciudad = ref('');
const Observaciones = ref('');
const errorEnvio = ref('');

const volverAlCarrito = () => {
  router.push({ name: 'Carrito' });
};


const enviarPorWhatsapp = () => {

  errorEnvio.value = '';
  let mensaje = `*SR BURGUERS*\n Pedido #${pedidoId}\n`;

  mensaje += `*Forma de entrega:* ${formaEntrega.value === 'retiro' ? 'Retiro en sucursal' : 'Envío'}\n`;
  mensaje += `*A nombre de:* ${nombreEntrega.value}\n`; // SIEMPRE
  if (formaEntrega.value === 'envio') {
    mensaje += `Dirección de entrega: ${direccionEntrega.value}\n`;
    mensaje += `Ciudad: ${ciudad.value}\n`;
  }
  mensaje += `*Observaciones:* ${Observaciones.value}\n`; // SIEMPRE
  mensaje += `*Método de pago:* ${metodo === 1 ? 'Efectivo' : 'Transferencia'}\n\n`;

  // Agregar datos de transferencia si corresponde
  if (metodo === 2 && cuentasTransferencia.value.length > 0) {
    const cuenta = cuentasTransferencia.value[0]; // Puedes elegir la cuenta que prefieras
    mensaje += `\n*Datos para Transferencia:*\n`;
    mensaje += `Alias:*${cuenta.Alias}*\n`;
    mensaje += `Titular: *${cuenta.NombreYApellido}*\n`;
    mensaje += `Banco: *${cuenta.Entidad}*\n`;
  }

  mensaje += `*Detalle del pedido:*\n`;
  detalles.value.forEach(detalle => {
  mensaje += `- ${detalle.NombreProducto} x${detalle.Cantidad} ($${detalle.Subtotal})`;
  if (detalle.Observaciones) mensaje += ` [Obs: ${detalle.Observaciones}]`;
  mensaje += '\n';
}); 
  if (metodo === 2) {
    mensaje += `\n*SUBIR COMPROBANTE EN ESTE CHAT.*\n`;}

  mensaje += `\n_*Total: $${total.value}*_`;
  const telefono = '3564228826'; // <-- tu número aquí
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
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

<style scoped>
.seleccionado {
  background: #111c2b;
  color: #fff;
}
</style>