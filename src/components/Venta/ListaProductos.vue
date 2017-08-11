<template>
<div>
	<ul>
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
    	productos: []
    };
  },
  methods:{
  	getProductos(){
  		this.$http.get('/api/DetalleVenta/'+this.detalleVentaId+'/venta').then(res => this.productos = res.body)
  	}
  },
  created: function(){
  	this.getProductos()
  }
};
</script>

<style lang="css" scoped>
</style>