<template>
  <b-table :data="deudas" :mobile-cards="true" :paginated="true" :per-page="7" :narrowed="true">
    <template scope="props">
    	<b-table-column field="fecha_venta" label="F. Venta" width="20" sortable>
        <span class="tag is-success">
          {{ props.row.fecha_venta  | moment("add","1 days","YYYY / MM / DD") }}
        </span>
      </b-table-column>
      <b-table-column field="clienteId" label="Cliente" width="40" sortable>
        {{ props.row.cliente.nombre | capitalize }}
      </b-table-column>
      <b-table-column field="direccion" label="Destino" width="20" sortable>
        {{ props.row.direccion | capitalize }}
      </b-table-column>

      <b-table-column field="total" label="Total" width="10" numeric>
        {{ props.row.total }}
      </b-table-column>
      <b-table-column label="Opciones" >
        <div class="field is-grouped">
          <p class="control">
            <VerVenta :detalleVenta="props.row"></VerVenta>
          </p>
          <p class="control">
            <a class="button is-warning is-small" @click="pagar(props.row)">Pagar</a>
          </p>
        </div>
      </b-table-column>
    </template>
    <div slot="empty" class="has-text-centered">
      Cargando ...
    </div>
  </b-table>
</template>

<script>
import VerVenta from '@/components/Dashboard/VerVenta'
//Pagar deuda: se agregara al dia y se creara un nuevo detalleVenta co tipo PAGADO || solo se editara el tipo del detalleVenta
export default {
  components: { VerVenta },
  props:['fecha'],
  name: 'Deudas',
  data () {
    return {
    	deudas: []
    };
  },
  methods: {
  	getDeudas(){
  		this.$http.get('/api/DetalleVenta?filter=%7B%22order%22%3A%22fecha_venta%20DESC%22%2C%22include%22%3A%22cliente%22%2C%20%22where%22%3A%7B%22tipo%22%3A%22credito%22%7D%7D').then(res => this.deudas = res.body).catch( err => console.log(err))
  	},
    getDeudasFecha(){
      this.$http.post('/api/DetalleVenta/deudoresMes', {fecha: this.fecha}).then(res => this.deudas = res.body).catch( err => console.log(err))
    },
    pagar(dVenta){
      dVenta.tipo = 'pagado'
      let d = new Date()
      let y = d.getFullYear()
      let m = d.getMonth()+1
      let day = d.getDate()
      dVenta.fecha_venta = y+'-'+m+'-'+day
      this.$http.put('/api/DetalleVenta/'+dVenta.id, dVenta).then((err, res)=>{
        if(err) console.log(err)
        this.deudas.splice(this.deudas.indexOf(dVenta), 1)
      })
    }
  },
  watch:{
    fecha: function(value){
      console.log(this.fecha)
      this.getDeudasFecha()
    }
  },
  mounted(){
  	this.getDeudas()
  }
};
</script>

<style lang="css" scoped>
</style>