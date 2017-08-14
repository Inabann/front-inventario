<template>
<div class="container">
	<div class="columns">
		<div class="column is-4">
			<!-- <chart :type="'pie'" :data="data" :options="options"></chart> -->
		</div>
	</div>
</div>
</template>

<script>


export default {
  name: 'Reporte',

  data () {
    return {
    	data: {},
      options: {
        segmentShowStroke: false
      },
      Meses: [],
      cantidad: []
    };
  },
  methods:{
  	getData(){
  		this.$http.post('/api/Venta/porMes').then(res => {
  			res.body.forEach(venta => {
  				if(venta._id.month == 1) this.Meses.push('Enero')
  				else if(venta._id.month == 2) this.Meses.push('Febrero')
  				else if(venta._id.month == 3) this.Meses.push('Marzo')
  				else if(venta._id.month == 4) this.Meses.push('Abril')
  				else if(venta._id.month == 5) this.Meses.push('Mayo')
  				else if(venta._id.month == 6) this.Meses.push('Junio')
  				else if(venta._id.month == 7) this.Meses.push('Julio')
  				else if(venta._id.month == 8) this.Meses.push('Agosto')
  				else if(venta._id.month == 9) this.Meses.push('Septiembre')
  				else if(venta._id.month == 10) this.Meses.push('Octubre')
  				else if(venta._id.month == 11) this.Meses.push('Noviembre')
  				else if(venta._id.month == 12) this.Meses.push('Diciembre')
  				this.cantidad.push(venta.total)	
  			})
  			this.data.labels = this.Meses
	  		this.data.datasets = []
	  		this.data.datasets.push({data : this.cantidad, backgroundColor : ['#1fc8db','#fce473']})
  		})
  	}
  },
  created: function(){
  	this.getData()
  	
  }
};
</script>