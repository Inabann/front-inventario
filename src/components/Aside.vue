<template>
	<aside class="menu">
  <p class="menu-label">
   <span >General</span>
  </p>
 <ul class="menu-list">
	   <router-link :to="{ path: '/home/dashboard' }" tag="li" replace @click.native="cambiar(0)"><a :class="{ 'is-active': menu[0] }"><span class="icon">
      <i class="fa fa-tachometer"></i></span><span> Dashboard</span></a></router-link>
		 <router-link :to="{ path: '/home/reportes' }" tag="li" replace @click.native="cambiar(1)" v-if="flag"><a :class="{ 'is-active': menu[1] }"><span class="icon">
      <i class="fa fa-bar-chart"></i></span><span> Reportes</span></a></router-link>
	  </ul>
	  <p class="menu-label" v-if="flag">
	    <span >Inventario</span>
	  </p>
	  <ul class="menu-list" v-if="flag">
	    <li ><router-link :to="{ path: '/home/productos'} " replace :class="{ 'is-active': menu[2] }" @click.native="cambiar(2)" ><span class="icon">
      <i class="fa fa-cubes"></i></span><span> Producto</span></router-link></li>
	    <li><router-link :to="{ path: '/home/stock'} " replace :class="{ 'is-active': menu[3] }" @click.native="cambiar(3)"><span class="icon">
      <i class="fa fa-tags"></i></span><span> Stock</span></router-link></li>

	  </ul>
	  <p class="menu-label">
	    <span>VENTAS</span>
	  </p>
	  <ul class="menu-list">
	    <li ><router-link :to="{ path: '/home/registrar_venta'} " replace :class="{ 'is-active': menu[4] }" @click.native="cambiar(4)"><span class="icon">
      <i class="fa fa-pencil"></i></span><span > Nuevo</span></router-link></li>
	   	<li ><router-link :to="{ path: '/home/ventas'} " replace :class="{ 'is-active': menu[5] }" @click.native="cambiar(5)"><span class="icon">
      <i class="fa fa-book"></i></span><span > Registro</span></router-link></li>
	  </ul>
	  <p class="menu-label" v-if="flag">
	  	<span>Cliente</span>
	  </p>
	  <ul class="menu-list" v-if="flag">
	  	<li><router-link :to="{ path: '/home/clientes'} " replace :class="{ 'is-active': menu[6] }" @click.native="cambiar(6)"><span class="icon">
      <i class="fa fa-users"></i></span><span> Clientes</span></router-link></li>
      <li><router-link :to="{ path: '/home/usuarios'} " replace :class="{ 'is-active': menu[7] }" @click.native="cambiar(7)"><span class="icon">
      <i class="fa fa-users"></i></span><span> Usuarios</span></router-link></li>
	  </ul>
	  <br class="is-hidden-mobile">
	  <br class="is-hidden-mobile">
	  <br class="is-hidden-mobile">
	  <br class="is-hidden-mobile">
	  <br class="is-hidden-mobile">
	  <br class="is-hidden-mobile">
		<!-- La ptmr soy un genio :v -->
</aside>
</template>

<script>

export default {

  name: 'appMenu',

  data () {
    return {
    	menu: [true, false, false, false, false, false, false, false],
    	user: '596fbb360d8458117cd8983c',
    	flag: true
    };
  },
  methods: {
  	cambiar(opcion){
  		this.menu = [false, false, false, false, false, false, false, false]
  		this.menu[opcion] = true
  	}
  },
  created(){
  	let t = this.$auth.getToken().userId
  	if( t != this.user) this.flag = false
  }
};
</script>

<style lang="css" scoped>
.menu-label span{
	color: white;
}
.menu-list span{
	color: white;
}
.menu-list a:hover span {
	color: black;
}

</style>
