import { createRouter, createWebHistory } from 'vue-router'
 

import HomeView from '../views/HomeView.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import AdminPanel from '@/components/AdminPanel.vue'
import CrearProducto from '@/components/CrearProducto.vue'
import EditarProducto from '@/components/EditarProducto.vue'
import RegisterComponent from '@/components/RegisterComponent.vue'
import UsuarioComponent from '@/components/UsuarioComponent.vue'
import ListaProductosDinamica from '@/components/ListaProductosDinamica.vue'
import CarritoView from '@/views/CarritoView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginComponent
  },
  {
    path: '/carrito',
    name: 'Carrito',
    component: CarritoView
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
    path: '/admin',
    name: 'admin',
    component: AdminPanel,
    meta: { requiresAuth: true, requiresAdmin: true }
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
  },
  {
  path: '/resumen-pedido/:id/:metodo',
  name: 'resumen-pedido',
  component: () => import('@/components/ResumenPedido.vue')
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('user') // O usa Vuex/pinia
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'login' })
  }
  if (to.meta.requiresAdmin && user.rol !== 'admin') {
    return next({ name: 'home' }) 
  }
  next()
})


export default router
