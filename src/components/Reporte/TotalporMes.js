import { Line } from 'vue-chartjs'

export default Line.extend({
  data(){
  	return {
  		labels : [],
      cantidad: []
  	}
  },
  mounted () {
    this.$http.post('/api/DetalleVenta/VendidoporMes').then(res => {
      this.labels = res.body.meses
      this.cantidad = res.body.cantidad
      this.setGraph()
    })
  },
  methods: {
  	setGraph(){
  		this.renderChart({
  			labels: this.labels,
  			datasets: [
  				{label: 'vendido $$', data: this.cantidad, backgroundColor: '#0FA3B1'}
  			]
  		}, {legend: {display : false}})
  	}
  }
})