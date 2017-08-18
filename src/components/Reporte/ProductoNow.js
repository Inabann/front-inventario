import { Doughnut } from 'vue-chartjs'

export default Doughnut.extend({
  data(){
  	return {
  		labels : [],
      cantidad: []
  	}
  },
  mounted () {
    this.$http.post('/api/Venta/porProducto').then(res => {
      this.labels = res.body.labels
      this.cantidad = res.body.cantidad
      this.setGraph()
    })
  },
  methods: {
  	setGraph(){
  		this.renderChart({
  			labels: this.labels,
  			datasets: [
  				{label: 'Productos vendidos este mes', data: this.cantidad, backgroundColor:['#0FA3B1','#FFA630','#EF798A','#26C485','#576066']}
  			]
  		},{
        legend: {
            display: true,
            position: 'bottom'
        }
      })
  	}
  }
})