<template>
<div class="container">
	<h1 class="title is-3 has-text-centered"><span class="has-text-info">Registro de Ventas Realizadas</span></h1>
  <div class="columns">
    <div class="column">
      <b-field grouped>
        <b-input placeholder="por filial..." type="search" icon-pack="fa" icon="search" v-model="filter" class="inputBusqueda"></b-input>
        <b-input placeholder="...aaaa-mm-dd" type="search" icon-pack="fa" icon="search" v-model="filter2" class="inputBusqueda"></b-input>
      </b-field>
      
    </div>
    <div class="column">
      <div class="field is-grouped is-grouped-right" v-if="this.$auth.getToken().userId == '596fbb360d8458117cd8983c'">
        <p class="control"><input type="number" class="input" v-model="year" style="width: 70px" min="2017"></p>
        <p class="control"><input type="number" class="input" v-model="month" style="width: 60px" min="1" max="12"></p> 
        <JsonExcel class="button is-primary" :data="json_data" :fields="json_fields" name="filename.xls">Generar Excel</JsonExcel>
      </div>
    </div>
  </div>

  
	<b-table :data="buscar" :mobile-cards="true" :paginated="true" :per-page="10" >
    <template scope="props">
      <b-table-column field="usuario.username" label="Filial" sortable>
        {{ props.row.usuario.username | capitalize }}
      </b-table-column>
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
        <div v-if="props.row.cliente">
          {{ props.row.cliente.nombre | capitalize }}
        </div>
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
        <div v-if="props.row.cliente">
          <VerVenta :detalleVenta="props.row" ></VerVenta>
        </div>
        <div v-if="!props.row.cliente">
          <VerVentaSinCliente :detalleVenta="props.row" ></VerVentaSinCliente>
        </div>
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
import VerVentaSinCliente from '@/components/Dashboard/VerVentaSinCliente'
import JsonExcel from 'vue-json-excel'

export default {

  name: 'Ventas',
  components: { ListaProductos, VerVenta, JsonExcel, VerVentaSinCliente },
  data () {
    return {
    	ventas: [],
      year: 0,
      month: 0,
      filter: '',
      filter2: '',
      json_fields : {
        filial: 'String',
        fecha: 'String',
        dni_ruc: 'String',
        cliente: 'String',
        direccion: 'String',
        "costo envio": 'Number',
        modelo: 'String',
        color: 'String',
        marca: 'String',
        tipo: 'String',
        cantidad: 'Number',
        "precio unitario": 'Number',
        subtotal: 'Number',
        total: 'Number'
      },
      json_data : []
    };
  },
  methods: {
  	getVentas(){
      if(this.$auth.getToken().userId != '596fbb360d8458117cd8983c'){
  		  this.$http.get('/api/DetalleVenta?filter=%7B%22order%22%3A%22fecha_venta%20DESC%22%2C%22include%22%3A%5B%22cliente%22%2C%22usuario%22%5D%2C%22where%22%3A%7B%22usuarioId%22%3A%22'+this.$auth.getToken().userId+'%22%7D%7D').then(res => this.ventas = res.body).catch(err => console.log(err))
      } else{
        this.$http.get('/api/DetalleVenta?filter=%7B%22order%22%3A%22fecha_venta%20DESC%22%2C%22include%22%3A%5B%22cliente%22%2C%22usuario%22%5D%7D').then(res => this.ventas = res.body).catch(err => console.log(err))
      }
  	},
    generarExcel(){
      this.json_data = []
      this.$http.post('/api/DetalleVenta/GenerarExcel', {fecha: this.year+'-'+this.month+'-15'}).then(res => {
        let lista = res.body
        let flag = 'asdasd'
        lista.forEach(item => {
          if(flag != item._id){
            this.json_data.push({
              filial: item.usuario.username,
              fecha: item.fecha_venta.slice(0,10),
              dni_ruc: item.cliente.dni_ruc,
              cliente: item.cliente.nombre,
              direccion: item.direccion,
              "costo envio": item.costo_envio,
              modelo: ' ',
              color: ' ',
              marca: ' ',
              tipo: ' ',
              cantidad: ' ',
              "precio unitario": ' ',
              subtotal: ' ',
              total: item.total
            })
            this.json_data.push({
              filial:  ' ',
              fecha: ' ',
              dni_ruc: ' ',
              cliente: ' ',
              direccion: ' ',
              "costo envio": ' ',
              modelo: item.productos.modelosId,
              color: item.productos.colorsId,
              marca: item.productos.marcasId,
              tipo: item.productos.tiposId,
              cantidad: item.productos.cantidad,
              "precio unitario": item.productos.precio_uni,
              subtotal: item.productos.subtotal,
              total: ' '
            })
            flag = item._id
          } else{
            this.json_data.push({
              filial: ' ',
              fecha: ' ',
              dni_ruc: ' ',
              cliente: ' ',
              direccion: ' ',
              "costo envio": ' ',
              modelo: item.productos.modelosId,
              color: item.productos.colorsId,
              marca: item.productos.marcasId,
              tipo: item.productos.tiposId,
              cantidad: item.productos.cantidad,
              "precio unitario": item.productos.precio_uni,
              subtotal: item.productos.subtotal,
              total: ' '
            })
          }
          
        })       
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
  },
  computed: {
    buscar: function(){
      return this.ventas.filter((venta) => {
        return venta.usuario.username.match(this.filter.toLowerCase()) && venta.fecha_venta.match(this.filter2.toLowerCase());
      });
    }
  }
};
</script>

<style lang="css" scoped>
</style>