import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Cliente from '@/components/Cliente/Clientes'
import Reportes from '@/components/Reporte/Reportes'
import Producto from '@/components/Producto/Productos'
import Stock from '@/components/Producto/Stock'
import RegistrarProducto from '@/components/Producto/Registrar'


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
          path: 'registrar_producto',
          component: RegistrarProducto
        },
        {
          path: 'stock',
          component: Stock
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

