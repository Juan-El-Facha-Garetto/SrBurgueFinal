<template>
  <VolverHomeButton @click="irAlHome" />
  <div class="cart">
    <h2>🛒 Carrito({{ totalItems }})</h2>
    <ul>
      <li v-for="item in cart" :key="item.id">
        <h3>{{ item.name }} (x{{ item.quantity }})</h3>
        <p>Precio unitario: ${{ item.price }}</p>
        <p>Subtotal: ${{ item.price * item.quantity }}</p>
        <button @click="removeItem(item.id)">❌ Eliminar</button>
        <img :src="`http://localhost:3000/uploads/${item.image}`" :alt="item.name" width="50" />
      </li>
    </ul>
    <p v-if="cart.length === 0">El carrito está vacío</p>
    <button v-if="cart.length > 0" @click="confirmRemoveCart">🧹 Vaciar carrito</button>
    <p v-if="cart.length > 0"><strong>Total: ${{ totalPrice }}</strong></p>
  </div>

  <div v-if="cart.length > 0" class="metodos-pago">
    <label>Método de pago:</label>
    <button
      :class="{ seleccionado: metodoSeleccionado === 'Efectivo' }"
      @click="seleccionarMetodo('Efectivo')"
      type="button"
    >
      Efectivo
    </button>
    <button
      :class="{ seleccionado: metodoSeleccionado === 'Transferencia' }"
      @click="seleccionarMetodo('Transferencia')"
      type="button"
    >
      Transferencia
    </button>
  </div>

 
  <button v-if="cart.length > 0" @click="confirmarCompra">Confirmar compra</button>


</template>

<script setup>
import { ref, computed, defineProps, defineEmits} from 'vue'
import VolverHomeButton from './VolverHomeButton.vue'
import { useRouter } from 'vue-router'


const router = useRouter()

const emit = defineEmits(['remove-from-cart', 'clear-cart'])
const props = defineProps({
  cart: {
    type: Array,
    required: true
  }
})

const metodoSeleccionado = ref('');
const seleccionarMetodo = (metodo) => {
  metodoSeleccionado.value = metodo;
};

const confirmRemoveCart = () => {
  if (confirm('¿Estás seguro de que deseas eliminar este producto del carrito?😭')) {
    emit('clear-cart')
  }
}

const removeItem = (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este producto del carrito?😭')) {
    emit('remove-from-cart', id)
  }
}

const totalPrice = computed(() => {
  return props.cart.reduce((sum, item) => {
    const price = Number(item.price) || 0
    const quantity = Number(item.quantity) || 0
    return sum + price * quantity
  }, 0)
})

const confirmarCompra = async () => {
  if (!metodoSeleccionado.value) {
    alert('Selecciona un método de pago')
    return
  }
  const ID_MetodosDePago = metodoSeleccionado.value === 'Efectivo' ? 1 : 2

  // Obtiene el usuario logueado
  const usuario = JSON.parse(localStorage.getItem('user') || '{}')
  const ID_Usuario = usuario.id

  const pedido = {
    ID_Usuario,
    ID_MetodosDePago,
    Total: totalPrice.value
  }

  try {
    const response = await fetch('http://localhost:3000/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    })
    if (response.ok) {
      const data = await response.json();
      const pedidoId = data.id;

      // Guarda cada producto del carrito en DetallePedido
      for (const item of props.cart) {
        await fetch('http://localhost:3000/api/pedidos/detallepedido', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ID_Pedido: pedidoId,
            ID_Producto: item.id,
            Cantidad: item.quantity,
            PrecioUnitario: item.price,
            Subtotal: item.price * item.quantity,
            Observaciones: item.observaciones || ''
          })
        });
      }

      router.push({
        name: 'resumen-pedido',
        params: {
          id: pedidoId,
          metodo: ID_MetodosDePago
        }
      });
    } else {
      alert('Error al guardar el pedido')
    }
  } catch (error) {
    alert('Error de conexión con el servidor')
  }
}
</script>

<style scoped>
.metodos-pago button {
  margin: 0 10px;
  padding: 8px 16px;
  border: 2px solid #FFD600;
  background: #fff;
  cursor: pointer;
  border-radius: 6px;
}
.metodos-pago button.seleccionado {
  background: #FFD600;
  color: #222;
  font-weight: bold;
}
.tabla-transferencia {
  margin-top: 20px;
}
.tabla-transferencia table {
  width: 100%;
  border-collapse: collapse;
}
.tabla-transferencia th, .tabla-transferencia td {
  border: 1px solid #ccc;
  padding: 8px;
}
</style>