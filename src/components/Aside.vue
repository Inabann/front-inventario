<template>
	<aside class="menu" id="cssaside">
  <p class="menu-label">
   <span class="has-text-white">General</span>
  </p>
 <ul class="menu-list">
	    <router-link :to="{ path: '/home' }" tag="li" replace><a><span class="has-text-white">Dashboard</span></a></router-link>
		 <li><a><span class="has-text-white">Reportes</span></a></li>
	  </ul>
	  <p class="menu-label">
	    <span class="has-text-white">Inventario</span>
	  </p>
	  <ul class="menu-list">
	    <li ><router-link :to="{ path: '/home/productos'} " replace><span class="has-text-white">Producto</span></router-link></li>
	    <li><router-link :to="{ path: '/home/stock'} " replace><span class="has-text-white">Stock</span></router-link></li>

	  </ul>
	  <p class="menu-label">
	    <span class="has-text-white">VENTAS</span>
	  </p>
	  <ul class="menu-list">
	    <li ><router-link :to="{ path: '/home/registrar_venta'} " replace><span class="has-text-white">Nuevo</span></router-link></li>
	   	<li ><router-link :to="{ path: '/home/ventas'} " replace><span class="has-text-white">Registro</span></router-link></li>
	  </ul>
	  <p class="menu-label">
	  	<span class="has-text-white">Cliente</span>
	  </p>
	  <ul class="menu-list">
	  	<li><router-link :to="{ path: '/home/clientes'} " replace><span class="has-text-white">Clientes</span></router-link></li>
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
#cssaside {
  /* margin-top: 0px;
   margin-left: -90px;
   padding-left: 30px; */

 background-color: #333;
 /*margin-top: -12px;*/

}
</style>
