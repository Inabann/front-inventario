<template>
	<div class="columns is-centered">
		<div class="column is-3">
			<div class="card">
				<header class="card-header">
					<h1 class="card-header-title">Total vendido(contado):</h1>
				</header><!-- /header -->
			  <div class="card-content">
			    <div class="content">
			      <p class="title is-3 has-text-centered">S/. {{ totalHoy }}</p>
			    </div>
			  </div>
			</div>
		</div>
		<!-- end card -->
		<div class="column is-3">
			<div class="card">
				<header class="card-header">
					<h1 class="card-header-title">Total vendido(credito):</h1>
				</header><!-- /header -->
			  <div class="card-content">
			    <div class="content">
			      <p class="title is-3 has-text-centered">S/. {{ creditoHoy }}</p>
			    </div>
			  </div>
			</div>
		</div>
		<!-- end card -->
		<div class="column is-3">
			<div class="card">
				<header class="card-header">
					<h1 class="card-header-title">N° ventas:</h1>
				</header><!-- /header -->
			  <div class="card-content">
			    <div class="content">
			      <p class="title is-3 has-text-centered"># {{ ventasHoy }}</p>
			    </div>
			  </div>
			</div>
		</div>
		<!-- end card -->
	</div>
</template>

<script>
export default {

  name: 'HoyCards',
  props: [ 'hoy'],
  data () {
    return {
    	totalHoy: 0,
    	ventasHoy: 0,
    	creditoHoy: 0
    };
  },
  methods: {
  	getVentaTotalHoy(){
  		this.$http.post('/api/DetalleVenta/totalHoy').then(res => {
  			this.totalHoy = res.body.total
  			this.creditoHoy = res.body.credito
  		})
  	},
  	getVentasHoy(){
  		this.$http.get('/api/DetalleVenta/count?where=%7B%22fecha_venta%22%3A%22'+this.hoy+'%22%7D').then(res => this.ventasHoy = res.body.count)
  	}
  },
  mounted(){
  	this.getVentaTotalHoy()
  	this.getVentasHoy()
  }
};
</script>

<style lang="css" scoped>
.card-header{
	background-color: #E8E9F3;
}
.columns {
	background-color: #EDEEF9;
}
</style>