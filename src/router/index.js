import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import AdminPanel from '@/components/AdminPanel.vue'
import CrearProducto from '@/components/CrearProducto.vue'
import EditarProducto from '@/components/EditarProducto.vue'
import ListaClientes from '@/components/ListaClientes.vue'
import RegisterComponent from '@/components/RegisterComponent.vue'
import UsuarioComponent from '@/components/UsuarioComponent.vue'
import ListaProductosDinamica from '@/components/ListaProductosDinamica.vue'
import CarritoView from '@/views/CarritoView.vue'


const routes = [
   { path: '/carrito', 
    name: 'Carrito', 
    component: CarritoView },
  {
    path: '/',
    name: 'login',
    component: LoginComponent
  },
  {
    path: '/productos/:categoria',
    name: 'productos-categoria',
    component: ListaProductosDinamica
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/crear-producto',
    name: 'crear-producto',
    component: CrearProducto
  },
  {
    path: '/editar-producto/:id',
    name: 'editar-producto',
    component: EditarProducto
  },
  {
    path: '/editar-cliente/:id',
    name: 'editar-cliente',
    component: () => import('@/components/EditarCliente.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPanel
  },
  {
    path: '/Lista-Clientes',
    name: 'Lista-Clientes',
    component: ListaClientes
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterComponent
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: UsuarioComponent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
