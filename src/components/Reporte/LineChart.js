import { Line } from 'vue-chartjs'

export default Line.extend({
  data(){
  	return {
  		Meses : [],
  		cantidad: []
  	}
  },
  mounted () {
  	this.$http.post('/api/Venta/porMes').then(res => {
			this.Meses = res.body.meses
      this.cantidad = res.body.cantidad
			this.setGraph()
		})
  },
  methods: {
  	setGraph(){
  		this.renderChart({
  			labels: this.Meses,
  			datasets: [
  				{label: 'Unidades', data: this.cantidad, backgroundColor: '#26C485'}
  			]
  		},{legend: {display : false}})
  	}
  }
})