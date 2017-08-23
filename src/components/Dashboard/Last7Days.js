import { Bar } from 'vue-chartjs'

export default Bar.extend({
  data(){
    return {
      label : [],
      cantidad: [],
      label2: [],
      cantidad2: []
    }
  },
  mounted () {
    this.$http.post('/api/DetalleVenta/Vendidopor7Dias').then(res => {
      this.label = res.body.label
      this.cantidad = res.body.cantidad
      this.$http.post('/api/Venta/Vendidopor7Dias').then(res2 => {
        this.label2 = res2.body.label
        this.cantidad2 = res2.body.cantidad
        this.setGraph()
      })
    })
  },
  methods: {
    setGraph(){
      this.renderChart({
        labels: this.label,
        datasets: [
          {label: 'Total $$', data: this.cantidad, backgroundColor: '#26C485'},
          {label: 'Unidades Vendidas', data: this.cantidad2, backgroundColor: '#FFA630'}
        ]
      },{legend: {display : true}, maintainAspectRatio: false})
    }
  }
})