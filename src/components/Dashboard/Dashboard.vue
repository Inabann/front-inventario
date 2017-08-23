<template>
<div>
	<HoyCards :hoy="hoy"></HoyCards>
	<div class="columns">
		<div class="column">
			<Last7Days></Last7Days>
		</div>
	</div>
	<div class="columns">
		<div class="column">
			<Ventas :hoy="hoy"></Ventas>
		</div>
		<div class="column">
			<Productos :hoy="hoy"></Productos>
		</div>
	</div>
</div>

</template>

<script>
import HoyCards from '@/components/Dashboard/HoyCards'
import Productos from '@/components/Dashboard/Productos'
import Ventas from '@/components/Dashboard/Ventas'
import Last7Days from '@/components/Dashboard/Last7Days'

export default {
	components: { HoyCards, Productos, Ventas, Last7Days },
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