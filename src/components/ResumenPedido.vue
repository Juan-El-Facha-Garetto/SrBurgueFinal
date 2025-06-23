<template>
  <div class="resumen-pedido">
    <VolverHomeButton @click="volverAlCarrito" texto="Volver al carrito" />
    <h2>Resumen del Pedido</h2>

     <div class="nombre-entrega">
        <label><strong>A nombre de:</strong></label>
        <input v-model="nombreEntrega" required placeholder="Ej: Juan Pérez" />
      </div>

    <!-- Selección de forma de entrega -->
    <div class="formas-entrega">
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
    <form class="formulario-envio"
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

    <h3>Detalle del pedido</h3>
    <table class="tabla-detalles">
      <thead>
        <tr>
          <th>Cantidad</th>
          <th>Producto</th>
          <th>Precio unitario</th>
          <th>Observaciones</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="detalle in detalles" :key="detalle.ID">
          <td>{{ detalle.Cantidad }}</td>
          <td>{{ detalle.NombreProducto }}</td>
          <td>{{ detalle.PrecioUnitario }}</td>
          <td>{{ detalle.Observaciones }}</td>
          <td>{{ detalle.Subtotal }}</td>
        </tr>
      </tbody>
    </table>
    <p class="precio"><strong>Total: ${{ total }}</strong></p>

    <button
      type="button"
      @click="enviarPorWhatsapp"
      style="margin-top: 10px;"
      class="enviar-pedido-whatsapp">
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
const errorEnvio = ref('');

const volverAlCarrito = () => {
  router.push({ name: 'Carrito' });
};


const enviarPorWhatsapp = () => {

  errorEnvio.value = '';

  if (!nombreEntrega.value.trim()) {
    alert('Por favor, ingresa tu nombre antes de enviar el pedido.');
    return;
  }
  if (
    formaEntrega.value === 'envio' &&
    (!direccionEntrega.value.trim() || !ciudad.value.trim())
  ) {
    alert('Por favor, completa la dirección y la ciudad para el envío.');
    return;
  }

  let mensaje = `*SR Burgues*\n\n*Pedido* #${pedidoId}\n`;

  mensaje += `*A nombre de:* ${nombreEntrega.value}\n\n`; 
  mensaje += `*Forma de entrega:* ${formaEntrega.value === 'retiro' ? 'Retiro en sucursal' : 'Envío'}\n`;
  
  if (formaEntrega.value === 'envio') {
    mensaje += `*Dirección de entrega*: ${direccionEntrega.value}\n`;
    mensaje += `*Ciudad:* ${ciudad.value}\n\n`;
  } else {
    mensaje += `*Sucursal:* Av. 9 De Julio 1851, San Francisco\n\n`;
  }
  
  mensaje += `*Método de pago:* ${metodo === 1 ? 'Efectivo' : 'Transferencia'}\n\n`;

  // Agregar datos de transferencia si corresponde
  if (metodo === 2 && cuentasTransferencia.value.length > 0) {
    const cuenta = cuentasTransferencia.value[0]; // Puedes elegir la cuenta que prefieras
    mensaje += `*Datos para Transferencia:*\n`;
    mensaje += `Alias: _*${cuenta.Alias}*_\n`;
    mensaje += `Titular: _*${cuenta.NombreYApellido}*_\n`;
    mensaje += `Banco: _*${cuenta.Entidad}*_\n\n`;
  }

  mensaje += `*Detalle del pedido:*\n`;
  detalles.value.forEach(detalle => {
  mensaje += `- ${detalle.NombreProducto} x${detalle.Cantidad} ($${detalle.Subtotal})`;
  if (detalle.Observaciones) mensaje += ` [Obs: ${detalle.Observaciones}]`;
  mensaje += '\n';
}); 
  
  mensaje += `\n_*Total: $${total.value}*_\n`;

  if (metodo === 2) {
    mensaje += `\n*SUBIR COMPROBANTE EN ESTE CHAT.*\n`;
  }

  const telefono = '3564659182'; // <-- tu número aquí
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
};

onMounted(async () => {
  // Trae los detalles del pedido
   const res = await fetch(`http://localhost:3000/api/pedidos/detallepedido/${pedidoId}`);
  if (res.ok) {
    detalles.value = await res.json();
    console.log('Detalles recibidos:', detalles.value); // AGREGA ESTA LÍNEA
    console.log('Pedido ID:', pedidoId);
    total.value = detalles.value.reduce((sum, d) => sum + (d.PrecioUnitario * d.Cantidad), 0);
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
.resumen-pedido {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--primary-color);
  border-radius: 8px;
  border: 2px solid #000000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.resumen-pedido h2{
  font-family: 'Georgia', serif;
  text-align: center;
  margin-top: 30px; 
}




.nombre-entrega{
  font-family: 'Georgia', serif;
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 16px 0 0 0;
  margin-bottom: 10px;
}
.nombre-entrega input {
  margin-top: 6px;
  display: block;
}
.formulario-envio label{
  font-family: 'Georgia', serif;
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 16px 0 0 0;
  margin-bottom: 10px;
}
.formulario-envio input {
  margin-top: 6px;
  display: block;
}
.formas-entrega {
  display: flex;
  gap: 2px; /* Espacio entre los botones */
}
.formas-entrega button{
  display: inline-block;
  margin: 10px;
  padding: 10px 10px;
  font-family: 'Georgia', serif;
  font-size: 15px;
  cursor: pointer;
  background-color: var(--primary-color);
  border-radius: 8px;
  border: 2px solid #000000;
  font-weight: bold;
  transition: background 0.6s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.formas-entrega button:hover {
  background-color: var(--secondary-color);      /* Mostaza más clara al pasar el mouse */
  
}

 h3{
  font-family: 'Georgia', serif;
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 16px 0 0 0;
  margin-bottom: 10px;
 } 
 
 .tabla-detalles {
  font-family: 'Georgia', serif;
  background-color: var(--primary-color);
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #000000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}
.tabla-detalles tbody{
  text-align: center;
  vertical-align: middle;
  font-size: 18px;
  color: black;
}
.tabla-detalles th{
  font-family: 'Georgia', serif;
  font-size: 20px;
  color: black;
  text-align: center;
  padding: 10px;

}
.precio {
  font-family: 'Georgia', serif;
  font-size: 25px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
}
.enviar-pedido-whatsapp {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  font-family: 'Georgia', serif;
  color: black;
  font-size: 18px;
  cursor: pointer;
  background-color: var(--primary-color);
  border-radius: 8px;
  border: 2px solid #000000;
  font-weight: bold;
  transition: background-color 0.6s ease;
}
.enviar-pedido-whatsapp:hover {
  background-color: var(--secondary-color); /* Mostaza más clara al pasar el mouse */
}

</style>