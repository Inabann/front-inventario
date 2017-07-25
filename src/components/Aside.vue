<template>
	<aside class="menu">
	  <p class="menu-label">
	    General
	  </p>
	  <ul class="menu-list">
	    <li ><a href="/home">Dashboard</a></li>
		 <li><a>Reportes</a></li>
	  </ul>
	  <p class="menu-label">
	    Inventario
	  </p>
	  <ul class="menu-list">
	    <li ><a>Producto</a></li>
	    <li><a>Stock</a></li>
	    <li><a>Ingreso</a></li>
	  </ul>
	  <p class="menu-label">
	    Ventas
	  </p>
	  <ul class="menu-list">
	    <li><a>Stock</a></li>
	    <li><a>Ingreso</a></li>
	    <li><a href="home/clientes">Cliente</a></li>
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