<template>
  <VolverHomeButton @click="irAlHome" />
  <div class="cart">
        <h2>🛒 Carrito de compras</h2>

        <ul>
            <li v-for="(item, idx) in cart" :key="idx">
              <img :src="`${API_URL}/uploads/${item.image}`" :alt="item.name"/>
              <h3 class="nombre-producto">{{ item.name }}</h3>
              <p class="descripcion">Descripcion: {{ item.description }}</p>
              <p class="precio">Precio unitario: ${{ item.price }}</p>
              <p class="titulo-observaciones">Observaciones:</p>
               <input v-if="item.CategoriaSeccion !== 'Bebida'" v-model="item.observaciones" 
               placeholder="Ej: Sin Mayonesa" class="observaciones"/>
              <label v-if="item.CategoriaSeccion === 'Burguers'" class="medallon-extra">
                  <input type="checkbox" v-model="item.medallonExtra" />
                  Medallón extra (+$1500)
              </label>
              <button @click="removeItem(idx)" class="eliminar">❌ Eliminar</button>
            </li>
        </ul>

        <p v-if="cart.length === 0">El carrito está vacío</p>
        <button v-if="cart.length > 0" @click="confirmRemoveCart" class="vaciar-carrito">🧹 Vaciar carrito</button>
        <p v-if="cart.length > 0" class="precio-total"><strong>Total: ${{ totalPrice }}</strong></p>
        <p v-if="cart.length > 0" class="total-productos"><strong>Total de productos: {{ cart.length }}</strong></p>

      

      <div v-if="cart.length > 0" class="metodos-pago">
        <label>Método de pago:</label>
        <button
          :class="{ seleccionado: metodoSeleccionado === 'Efectivo' }"
          @click="seleccionarMetodo('Efectivo')"
          type="button" class="btn-efectivo"
        >
          Efectivo
        </button>
        <button
          :class="{ seleccionado: metodoSeleccionado === 'Transferencia' }"
          @click="seleccionarMetodo('Transferencia')"
          type="button" class="btn-transferencia"
        >
          Transferencia
        </button>
      </div>

    
      <button v-if="cart.length > 0" @click="confirmarCompra" class="confirmar-compra">Confirmar compra</button>

</div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits} from 'vue'
import VolverHomeButton from './VolverHomeButton.vue'
import { useRouter } from 'vue-router'

const API_URL = process.env.VUE_APP_API_URL;
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

const removeItem = (idx) => {
  if (confirm('¿Estás seguro de que deseas eliminar este producto del carrito?😭')) {
    emit('remove-from-cart', idx)
  }
}

const totalPrice = computed(() => {
  return props.cart.reduce((sum, item) => {
    let price = Number(item.price) || 0
    if (item.CategoriaSeccion === 'Burguers' && item.medallonExtra) price += 1500 // Agrega $1500 si tiene medallón extra
    return sum + price
  }, 0)
})

const confirmarCompra = async () => {
  if (!metodoSeleccionado.value) {
    alert('Selecciona un método de pago')
    return
  }
  const id_metodosdepago = metodoSeleccionado.value === 'Efectivo' ? 1 : 2

  // Ya no se usa usuario
  const pedido = {
    id_metodosdepago,
    total: totalPrice.value
  }

  try {
    const API_URL = process.env.VUE_APP_API_URL;
    const response = await fetch(`${API_URL}/api/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    })
    if (response.ok) {
      const data = await response.json();
      const pedidoId = data.id;

      // Guarda cada producto del carrito en DetallePedido
      for (const item of props.cart) {
        const precioFinal = item.CategoriaSeccion === 'Burguers' && item.medallonExtra
          ? Number(item.price) + 1500
          : Number(item.price);
        await fetch(`${API_URL}/api/pedidos/detallepedido`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_pedido: pedidoId,
            id_producto: item.id,
            cantidad: 1,
            preciounitario: precioFinal,
            subtotal: precioFinal,
            observaciones: (item.observaciones || '') + (item.CategoriaSeccion === 'Burguers' && item.medallonExtra ? ' + Medallón extra' : '')
          })
        });
      }

      router.push({
        name: 'resumen-pedido',
        params: {
          id: pedidoId,
          metodo: id_metodosdepago
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
.nombre-producto {
  font-family: 'Georgia', serif;
  font-size: 20px;
  font-weight: bold;
  margin: 4px 0 2px 0;
}
.cart{
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--primary-color);
  border-radius: 8px;
  border: 2px solid #000000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cart h2{
  font-family: 'Georgia', serif;
  text-align: center;
  margin-top: 30px; 
}
.cart img{
  max-width: 160px; /* Ajusta el tamaño de la imagen */
  height: auto;
  border-radius: 8px;
  margin-right: 20px; /* Espacio entre imagen y texto */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}
.cart ul li {
  border-bottom: 1px solid var(--secondary-color, #d6c9a5); 
  padding-bottom: 16px;
  margin-bottom: 16px;
}
.descripcion{
   font-family: 'Georgia', serif;
   margin: 2px 0;
}
.precio {
  font-family: 'Georgia', serif;
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 16px 0 0 0;
}
.medallon-extra{
  font-family: 'Georgia', serif;
  margin-top: 1px;
}
.titulo-observaciones {
  font-family: 'Georgia', serif;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 5px;
}
.observaciones {
  font-family: 'Georgia', serif;
  margin: 5px 0;
  padding: 5px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.eliminar {
  display: block;
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
.eliminar:hover {
  background-color: var(--secondary-color);      /* Mostaza más clara al pasar el mouse */
  
}
.vaciar-carrito {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  font-family: 'Georgia', serif;
  font-size: 18px;
  cursor: pointer;
  background-color: var(--primary-color);
  border-radius: 8px;
  border: 2px solid #000000;
  font-weight: bold;
  transition: background-color 0.6s ease;
}
.vaciar-carrito:hover {
  background-color: var(--secondary-color); /* Mostaza más clara al pasar el mouse */
}

.precio-total, .total-productos {
  font-family: 'Georgia', serif;
  font-size: 25px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
}
.metodos-pago label {
  font-family: 'Georgia', serif;
  font-size: 18px;
  margin-right: 10px;
}
.metodos-pago button{
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
.metodos-pago button:hover {
  background-color: var(--secondary-color);      /* Mostaza más clara al pasar el mouse */
  
}
.confirmar-compra {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  font-family: 'Georgia', serif;
  font-size: 18px;
  cursor: pointer;
  background-color: var(--primary-color);
  border-radius: 8px;
  border: 2px solid #000000;
  font-weight: bold;
  transition: background-color 0.6s ease;
}
.confirmar-compra:hover {
  background-color: var(--secondary-color); /* Mostaza más clara al pasar el mouse */
}

</style>