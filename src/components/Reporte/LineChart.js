import { Line } from 'vue-chartjs'

export default Line.extend({
  props: ['data', 'options'],
  data(){
  	return {
  		Meses : [],
  		cantidad: []
  	}
  },
  mounted () {
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
			this.setGraph()
		})
  },
  methods: {
  	setGraph(){
  		this.renderChart({
  			labels: this.Meses,
  			datasets: [
  				{label: 'Ventas de producto por mes', data: this.cantidad, backgroundColor: '#26C485'}
  			]
  		})
  	}
  }
})