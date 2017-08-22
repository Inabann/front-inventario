<template>
<div>
	<HoyCards :hoy="hoy"></HoyCards>
	<div class="columns">
		<div class="column">
			aqui grafico de ventas de los ultimos 7 dias
		</div>
	</div>
	<div class="columns">
		<div class="column">
			<div class="card">
				<header class="card-header">
					<h1 class="card-header-title">Ventas</h1>
				</header><!-- /header -->
			  <div class="card-content">
			    <div class="content">
			      tabla de ventas de hoy
			    </div>
			  </div>
			</div>
		</div>
		<div class="column">
			<div class="card">
				<header class="card-header">
					<h1 class="card-header-title">Productos Ingresados</h1>
				</header><!-- /header -->
			  <div class="card-content">
			    <div class="content">
			      <Productos :hoy="hoy"></Productos>
			    </div>
			  </div>
			</div>
		</div>
	</div>
</div>

</template>

<script>
import HoyCards from '@/components/Dashboard/HoyCards'
import Productos from '@/components/Dashboard/Productos'

export default {
	components: { HoyCards, Productos },
  name: 'Dashboard',

  data () {
    return {
    	hoy: ''
    };
  },
  created(){
  	let hoy = new Date()
		let y = hoy.getFullYear()
		let m = hoy.getMonth() +1
		let d = hoy.getDate()
		if (m < 10) m = '0'+m
		this.hoy = y+'-'+m+'-'+d
  }
};
</script>

<style lang="css" scoped>
</style>