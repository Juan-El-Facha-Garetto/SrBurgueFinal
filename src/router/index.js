import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import AdminPanel from '@/components/AdminPanel.vue'
import CrearProducto from '@/components/CrearProducto.vue'
import EditarProducto from '@/components/EditarProducto.vue'
import ListaClientes from '@/components/ListaClientes.vue'
import RegisterComponent from '@/components/RegisterComponent.vue'



const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginComponent
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
