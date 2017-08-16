<template>
<div>
	<a class="button is-warning is-small" @click="getProductos">
		<span class="icon is-small"><i class="fa fa-list"></i></span><span>Mostrar</span>
		<span class="icon is-small" v-if="!mostrar"><i class="fa fa-toggle-down"></i></span>
		<span class="icon is-small" v-if="mostrar"><i class="fa fa-toggle-up"></i></span>
	</a>
	<ul v-if="mostrar">
		<li v-for="producto in productos">
			<div class="tags has-addons">
			  <span class="tag">{{ producto.modelosId }}</span>
			  <span class="tag is-primary">{{ producto.cantidad }}</span>
			</div>
		</li>
	</ul>
</div>
</template>

<script>
export default {
	props: ['detalleVentaId'],
  name: 'ListaProductos',

  data () {
    return {
    	productos: [],
    	mostrar: false
    };
  },
  methods:{
  	getProductos(){
      if(!this.mostrar){
        this.$http.get('/api/DetalleVenta/'+this.detalleVentaId+'/venta').then(res => {
          this.productos = res.body
          this.mostrar = true
        })
      } else {
        this.mostrar = false
      }
  	}
  }
};
</script>

<style lang="css" scoped>
</style>