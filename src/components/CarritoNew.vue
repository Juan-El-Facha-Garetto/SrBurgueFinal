<template>

    <button @click="irAlHome" class="volver-home">
      Volver al Home
    </button>

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

        <!-- Si el carrito está vacío, mostrar un mensaje -->
         <p v-if="cart.length ===0">El carrito está vacío</p>

         <!-- Vaciar Carrito Completo -->
         <button v-if="cart.length >0"  @click="confirmRemoveCart">🧹 Vaciar carrito</button>
          <!-- Total del carrito -->
         <p v-if="cart.length > 0">Total: ${{ totalPrice }}</p>

    </div>
    <button v-if="cart.length > 0" @click="confirmarCompra">Confirmar compra</button>
</template>

<script setup>
import { computed,defineProps,defineEmits } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()
const irAlHome = () => {
  router.push({ name: 'home' }) // o router.push('/') si tu home es la raíz
}


const confirmRemoveCart = () =>{
  if(confirm('¿Estás seguro de que deseas eliminar este producto del carrito?😭')){
    emit('clear-cart')
}
}


// Función para eliminar un producto del carrito
const emit = defineEmits(['remove-from-cart'])
const removeItem = (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este producto del carrito?😭')) {
    // Si el usuario confirma, emitimos el evento para eliminar el producto
    emit('remove-from-cart', id)}
}

//Propiedad que recibe el carrito desde el componente padre (HomePage)
const props = defineProps({
    cart: {
        type: Array,
        required: true
    }
})
// Calcular el total del carrito
const totalPrice = computed(() => {
  return props.cart.reduce((sum, item) => {
    const price = Number(item.price) || 0; // Convierte a número y asigna 0 si no es válido
    const quantity = Number(item.quantity) || 0; // Lo mismo para la cantidad
    return sum + (price * quantity)
  }, 0)
})

// Calcular el total de items en el carrito
const totalItems = computed(() => {
  return props.cart.reduce((sum, item) =>  sum + item.quantity, 0)
})

// ...dentro de <script setup>
const confirmarCompra = async () => {
  // Arma el objeto pedido
  const pedido = {
    ID_Usuario: 1, // Cambia por el usuario real si tienes login
    ID_MetodosDePago: 1, // Cambia por el método real si tienes selector
    Total: totalPrice.value // Usa el total calculado del carrito
    // Si solo quieres guardar esto, no envíes los productos
  }

  try {
    const response = await fetch('http://localhost:3000/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    })
    if (response.ok) {
      alert('¡Pedido guardado!')
      // Aquí puedes vaciar el carrito si quieres
    } else {
      alert('Error al guardar el pedido')
    }
  } catch (error) {
    alert('Error de conexión con el servidor')
  }
}


</script>

<style scoped>

.cart {
  border-top: 2px solid #ccc;
  padding-top: 20px;
  margin-top: 20px;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
p {
  font-size: 18px;
}

.volver-home {
  margin: 16px;
  padding: 8px 20px;
  font-size: 16px;
  background: #FFD600;
  border: 2px solid #333;
  border-radius: 5px;
  font-weight: bold; 
  cursor: pointer;
  transition: background 0.2s;
}
.volver-home:hover {
  background: #FFEA70;
}


</style>