<template>
	<aside class="menu is-hidden-mobile">
	  <p class="menu-label">
	    General
	  </p>
	  <ul class="menu-list">
	    <router-link :to="{ path: '/home' }" tag="li" replace><a>Dashboard</a></router-link>
		 <li><a>Reportes</a></li>
	  </ul>
	  <p class="menu-label">
	    Inventario
	  </p>
	  <ul class="menu-list">
	    <li ><router-link :to="{ path: '/home/productos'} " replace>Producto</router-link></li>
	    <li><a>Stock</a></li>
	    <li><router-link :to="{ path: '/home/registrar_producto'} " replace>Ingresar</router-link></li>
	  </ul>
	  <p class="menu-label">
	    Ventas
	  </p>
	  <ul class="menu-list">
	    <li><a>Stock</a></li>
	    <li><a>Ingreso</a></li>
	    <li><router-link :to="{ path: '/home/clientes'} " replace>Cliente</router-link></li>
	  </ul>


	</aside>

</template>

<script>

export default {

  name: 'appMenu',

  data () {
    return {

    };
  }
};
</script>

<style lang="css" scoped>

</style>