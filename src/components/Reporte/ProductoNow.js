import { Doughnut } from 'vue-chartjs'

export default Doughnut.extend({
  props: ['fecha'],
  data(){
  	return {
  		labels : [],
      cantidad: []
  	}
  },
  watch:{
    fecha:function(val){
      this.$http.post('/api/Venta/porProducto', {fecha: val}).then( res => {
        this._chart.data.labels = res.body.labels
        this._chart.data.datasets[0].data = res.body.cantidad
        this._chart.update()
      })
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
  				{label: 'Productos vendidos este mes', data: this.cantidad, backgroundColor:['#0FA3B1','#FFA630','#EF798A','#26C485','#576066', 
          '#548687', '#B0413E', '#F3CA40', '#996888', '#BBD8B3'
          ]}
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