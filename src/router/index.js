import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Cliente from '@/components/Cliente/Clientes'
import Reportes from '@/components/Reporte/Reportes'
import Producto from '@/components/Producto/Productos'
import Stock from '@/components/Producto/Stock'
import RegistrarVenta from '@/components/Venta/RegistrarVenta'
import Ventas from '@/components/Venta/Ventas'
import Dashboard from '@/components/Dashboard/Dashboard'
import Usuario from '@/components/Usuario/Usuarios'



Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        forVisitors: true
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        forAuth: true
      },
      children: [
        {
          path: 'clientes',
          component: Cliente
        },
        {
          path: 'reportes',
          component: Reportes
        },
        {
          path: 'productos',
          component: Producto
        },
        {
          path: 'stock',
          component: Stock
        },
        {
          path: 'registrar_venta',
          component: RegistrarVenta
        },
        {
          path: 'ventas',
          component: Ventas
        },
        {
          path: 'dashboard',
          component: Dashboard
        },
        {
          path: 'usuarios',
          component: Usuario
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

