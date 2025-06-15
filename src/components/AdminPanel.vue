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
      </ul>
    </nav>
    <div class="admin-dynamic-content">
      <!-- Renderizado dinámico del componente -->
      <ListaProductos v-if="componenteActual === 'productos'" />
      <TablaDetallesPedidoAdmin v-if="componenteActual === 'Pedidos'" />
      <AdminTransferencias v-if="componenteActual === 'transferencias'" />
      <CategoriasDeComida v-if="componenteActual === 'Categorias'" />
    </div>
    <button class="volver-login" @click="volverAlLogin">Ir a Home</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ListaProductos from './ListaProductos.vue';
import AdminTransferencias from './AdminTransferencias.vue';
import TablaDetallesPedidoAdmin from './TablaDetallesPedidoAdmin.vue';
import CategoriasDeComida from './CategoriasDeComida.vue';

const componenteActual = ref('productos'); // Componente por defecto

const mostrarComponente = (componente) => {
  componenteActual.value = componente;
};

const volverAlLogin = () => {
  window.location.href = '/home'; // Redirigir al login
};
</script>

<style scoped>
.admin-panel {
  padding: 20px;
}

.volver-login {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--background-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.lista-productos {
  max-width: auto;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.Principal {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
}
.admin-content {
  background-color: var(--background-color);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.admin-nav {
  background-color: var(--primary-color);
  display: flex ;
  flex-direction: column;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.admin-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
 
}

.admin-nav > ul > li {
  position: relative; /* Necesario para posicionar el dropdown */
}

.admin-nav > ul > li > a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  display: block;
}

.admin-nav > ul > li > a:hover {
  background-color: var(--secondary-color);
  color: var(--background-color);
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