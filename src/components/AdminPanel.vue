<template>
  <div class="admin-panel">
    <div class="admin-content">
      <h2>Panel de Administrador</h2>
      <p>Bienvenido, administrador. Aquí puedes gestionar el sistema.</p>
    </div>
    <nav class="admin-nav">
      <ul>
        <li>
          <a href="#" @click.prevent="mostrarComponente('productos')">Ver Productos</a>
        </li>
         <li>
          <a href="#" @click.prevent="mostrarComponente('Pedidos')">Pedidos</a>
        </li>
        <li>
          <a href="#" @click.prevent="mostrarComponente('Categorias')">Categorias</a>
        </li>
        <li>
          <a href="#" @click.prevent="mostrarComponente('transferencias')">Transferencias</a>
        </li>
        <li>
          <a href="#" @click.prevent="mostrarComponente('CrearProducto')">Crear Producto</a>
        </li>
      </ul>
    </nav>
    <div class="admin-dynamic-content">
      <!-- Renderizado dinámico del componente -->
       <CrearProducto v-if="componenteActual === 'CrearProducto'" />
      <ListaProductos v-if="componenteActual === 'productos'" />
      <TablaDetallesPedidoAdmin v-if="componenteActual === 'Pedidos'" />
      <AdminTransferencias v-if="componenteActual === 'transferencias'" />
      <CategoriasDeComida v-if="componenteActual === 'Categorias'" />
    </div>
    <button class="volver-login" @click="volverAlLogin">Ir a Home</button> |
    <button class="volver-login" @click="cerrarSesion">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'; // Asegúrate de tener un store para manejar el estado del usuario
import CrearProducto from './CrearProducto.vue';
import ListaProductos from './ListaProductos.vue';
import AdminTransferencias from './AdminTransferencias.vue';
import TablaDetallesPedidoAdmin from './TablaDetallesPedidoAdmin.vue';
import CategoriasDeComida from './CategoriasDeComida.vue';
// Importar los componentes necesarios


const componenteActual = ref('productos');
const router = useRouter();
const userStore = useUserStore(); // Componente por defecto

const mostrarComponente = (componente) => {
  componenteActual.value = componente;
};

const volverAlLogin = () => {
  window.location.href = '/home'; // Redirigir al login
};

const cerrarSesion = () => {
  userStore.logout(); // Llamar al método de logout del store
  router.push('/login'); // Redirigir al login
};  
</script>

<style scoped>

.admin-panel {
  padding: 20px;
}

.volver-login {
  font-family: 'Georgia', serif;
  font-size: 16px;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: var(--text-color);
  border-radius: 8px;
  border: 2px solid #000000;
  cursor: pointer;
  transition: background-color 0.6s ease;
}
.volver-login:hover {
  background-color: var(--secondary-color);
}
.lista-productos {
  max-width: auto;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.admin-content {
  font-family: 'Georgia', serif;
  background-color: var(--primary-color);
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #000000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}
.admin-nav {
   font-family: 'Georgia', serif;
  background-color: var(--primary-color);
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #000000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.admin-nav ul {
  list-style: none; 
  padding: 0;
  margin: 0;
 display: flex;           
  flex-direction: row;  
  gap: 10px;               
}

.admin-nav > ul > li {
  position: relative; /* Necesario para posicionar el dropdown */
}

.admin-nav > ul > li > a {
  text-decoration: none;
  color: black;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background-color 0.6s ease;
  display: block;
}

.admin-nav > ul > li > a:hover {
  background-color: var(--secondary-color);
  
}

.dropdown {
  display: none; /* Ocultar el menú desplegable por defecto */
  position: absolute;
  top: 100%; /* Posicionar debajo del elemento principal */
  left: 0;
  background-color: var(--primary-color);
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 1000;
}

.dropdown li {
  margin: 0;
}

.dropdown li a {
  text-decoration: none;
  color: var(--text-color);
  padding: 10px 15px;
  display: block;
  transition: background-color 0.3s ease;
}

.dropdown li a:hover {
  background-color: var(--secondary-color);
  color: var(--background-color);
}

/* Mostrar el menú desplegable al pasar el mouse */
.admin-nav > ul > li:hover .dropdown {
  display: block;
}
</style>