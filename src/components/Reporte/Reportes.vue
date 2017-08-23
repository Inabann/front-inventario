<template>
<div class="container">
	<div class="columns">
		<div class="column is-6">
			<div class="card">
				<header class="card-header">
					<h1 class="card-header-title">Total Vendido en los ultimos meses</h1>
				</header><!-- /header -->
			  <div class="card-content">
			    <div class="content">
			      <TotalporMes></TotalporMes>
			    </div>
			  </div>
			</div>
		</div>
		<div class="column is-6">
			<div class="card">
				<header class="card-header">
					<h1 class="card-header-title">Unidades vendidas en los ultimos meses</h1>
				</header><!-- /header -->
			  <div class="card-content">
			    <div class="content">
			    	<LineChart></LineChart>  
			    </div>
			  </div>
			</div>
		</div>
		
	</div>
	<div class="columns">
		<div class="column is-6">
			<div class="card">
				<header class="card-header">
					<h1 class="card-header-title">Deudores</h1>
				</header><!-- /header -->
			  <div class="card-content">
			    <div class="content">
			      <Deudas></Deudas>
			    </div>
			  </div>
			</div>
		</div>
		<div class="column is-6">
			<div class="card">
				<header class="card-header">
					<h1 class="card-header-title">Productos mas vendidos este mes</h1>
				</header><!-- /header -->
			  <div class="card-content">
			    <div class="content">
			      <ProductoNow></ProductoNow>
			    </div>
			  </div>
			</div>
		</div>
		
	</div>
</div>
</template>

<script>
import LineChart from '@/components/Reporte/LineChart'
import TotalporMes from '@/components/Reporte/TotalporMes'
import ProductoNow from '@/components/Reporte/ProductoNow'
import Deudas from '@/components/Reporte/Deudas'

export default {
  name: 'Reporte',
  components: { LineChart, TotalporMes, ProductoNow, Deudas },
  data () {
    return {
    	totalHoy: 0
    };
  },
  methods: {
  	getVentaTotalHoy(){
  		this.$http.post('/api/DetalleVenta/totalHoy').then(res => this.totalHoy = res.body.total)
  	}
  },
  mounted(){
  	this.getVentaTotalHoy()
  }

};
</script>

<style scoped>
.card-header{
	background-color: #E8E9F3;
}
.columns {
	background-color: #EDEEF9;
}
</style>