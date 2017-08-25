import { Line } from 'vue-chartjs'

export default Line.extend({
  data(){
    return {
      label : [],
      cantidad: []
    }
  },
  mounted () {
    this.$http.post('/api/Productos/GastadoporMes').then(res => {
      this.label = res.body.label
      this.cantidad = res.body.cantidad
      this.setGraph()
    })
  },
  methods: {
    setGraph(){
      this.renderChart({
        labels: this.label,
        datasets: [
          {label: '$', data: this.cantidad, backgroundColor: '#26C485'}
        ]
      },{legend: {display : false}, maintainAspectRatio: false})
    }
  }
})