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
					<h1 class="card-header-title">Mejores Clientes: </h1>
					<div class="field is-grouped is-grouped-right card-header-icon">
					<p class="control"><input type="number" class="input is-small" v-model="cYear" style="width: 60px"></p>
					<p class="control"><input type="number" class="input is-small" v-model="cMonth" style="width: 60px"></p>	
					</div>
					
				</header><!-- /header -->
			  <div class="card-content">
			    <div class="content">
			      <TopClientes :fecha="cfecha"></TopClientes>
			    </div>
			  </div>
			</div>
		</div>
		
	</div>
	
	<div class="columns">
		<div class="column is-6">
			<div class="card">
				<header class="card-header">
					<h1 class="card-header-title">Cuanto se "Gasto" por mes</h1>
				</header><!-- /header -->
				<div class="card-content">
					<div class="content">
						<Balance></Balance>
					</div>
				</div>
			</div>
		</div>
		<div class="column is-6">
			<div class="card">
				<header class="card-header">
					<h1 class="card-header-title">Productos mas vendidos: </h1>
					<div class="field is-grouped is-grouped-right card-header-icon">
					<p class="control"><input type="number" class="input is-small" v-model="year" style="width: 60px"></p>
					<p class="control"><input type="number" class="input is-small" v-model="month" style="width: 60px"></p>	
					</div>
					
				</header><!-- /header -->
			  <div class="card-content">
			    <div class="content">
			      <ProductoNow :fecha="fecha"></ProductoNow>
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
import TopClientes from '@/components/Reporte/TopClientes'
import Balance from '@/components/Reporte/Balance'


export default {
  name: 'Reporte',
  components: { LineChart, TotalporMes, ProductoNow, Deudas, TopClientes , Balance},
  data () {
    return {
    	year: 0,
    	month: 0,
    	cYear: 0,
    	cMonth: 0
    };
  },
  computed: {
  	fecha: function(){
  		return this.year+'-'+this.month+'-15'
  	},
  	cfecha: function(){
  		return this.cYear+'-'+this.cMonth+'-15'
  	}
  },
  mounted(){
  	let hoy = new Date
  	this.year = hoy.getFullYear()
  	this.month = hoy.getMonth() +1
  	this.cYear = hoy.getFullYear()
  	this.cMonth = hoy.getMonth() +1
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