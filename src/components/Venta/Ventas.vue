<template>
<div class="container">
	<h1 class="title is-3 has-text-centered"><span class="has-text-info">Registro de Ventas Realizadas</span></h1>
  <div class="field is-grouped is-grouped-right">
    <p class="control"><input type="number" class="input" v-model="year" style="width: 70px" min="2017"></p>
    <p class="control"><input type="number" class="input" v-model="month" style="width: 60px" min="1" max="12"></p> 
    <a class="button is-primary" @click="generarExcel"><span>Generar Excel</span></a>
    <JsonExcel class="button is-primary" :data="json_data" :fields="json_fields" name="filename.xls">Generar Excel2</JsonExcel>
  </div>
	<b-table :data="ventas" :mobile-cards="true" :paginated="true" :per-page="10" >
    <template scope="props">
    	<b-table-column field="fecha_venta" label="F. Venta" sortable>
        <span class="tag is-success">
          <!-- {{ new Date(props.row.fecha_ingreso).toLocaleDateString() }} -->
          {{ props.row.fecha_venta  | moment("add","1 days","YYYY / MM / DD") }}
        </span>
      </b-table-column>
      <b-table-column field="tipo" label="Tipo"  sortable>
        {{ props.row.tipo | capitalize }}
      </b-table-column>
      <b-table-column field="clienteId" label="Cliente" sortable>
        {{ props.row.cliente.nombre | capitalize }}
      </b-table-column>
      <b-table-column field="direccion" label="Destino" sortable>
        {{ props.row.direccion | capitalize }}
      </b-table-column>
      <b-table-column field="costo_envio" label="C. Envio">
        {{ props.row.costo_envio }}
      </b-table-column>
      <b-table-column field="" label="Productos">
        <ListaProductos :detalleVentaId="props.row.id"></ListaProductos>
      </b-table-column>
      <b-table-column field="total" label="Total" numeric>
        {{ props.row.total }}
      </b-table-column>
      <b-table-column label="Opciones">
        <VerVenta :detalleVenta="props.row"></VerVenta>
      </b-table-column>
    </template>
    <div slot="empty" class="has-text-centered">
      Cargando ...
    </div>
  </b-table>
</div>
</template>

<script>
import ListaProductos from '@/components/Venta/ListaProductos'
import VerVenta from '@/components/Dashboard/VerVenta'
import JsonExcel from 'vue-json-excel'

export default {

  name: 'Ventas',
  components: { ListaProductos, VerVenta, JsonExcel },
  data () {
    return {
    	ventas: [],
      year: 0,
      month: 0,
      json_fields : {
        fecha: 'String',
        dni_ruc: 'String',
        cliente: 'String',
        direccion: 'String',
        "costo envio": 'Number',
        total: 'Number'
      },
      json_data : []
    };
  },
  methods: {
  	getVentas(){
  		this.$http.get('/api/DetalleVenta?filter=%7B%22order%22%3A%22fecha_venta%20DESC%22%2C%22include%22%3A%22cliente%22%7D').then(res => this.ventas = res.body).catch(err => console.log(err))
  	},
    generarExcel(){
      this.json_data = []
      this.$http.post('/api/DetalleVenta/GenerarExcel', {fecha: this.year+'-'+this.month+'-15'}).then(res => {
        let lista = res.body
        lista.forEach(item => {
          this.json_data.push({
            fecha: item.fecha_venta,
            dni_ruc: item.cliente_nombre[0].dni_ruc,
            cliente: item.cliente_nombre[0].nombre,
            direccion: item.direccion,
            "costo envio": item.costo_envio,
            total: item.total
          })
        })
        console.log(this.json_data)
        
      })
    }
  },
  created: function(){
  	this.getVentas()
  },
  watch:{
    year: function(value){
      this.generarExcel()
    },
    month: function(value){
      this.generarExcel()
    }
  }
};
</script>

<style lang="css" scoped>
</style>