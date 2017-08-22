<template>
<div class="container">
	<h1 class="title is-3 has-text-centered"><span class="has-text-info">Registro de Ventas Realizadas</span></h1>
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
      <b-table-column label="Opciones" >
        <a class="button is-danger is-small" >Eliminar</a>
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

export default {

  name: 'Ventas',
  components: { ListaProductos },
  data () {
    return {
    	ventas: []
    };
  },
  methods: {
  	getVentas(){
  		this.$http.get('/api/DetalleVenta?filter=%7B%22order%22%3A%22fecha_venta%20DESC%22%2C%22include%22%3A%22cliente%22%7D').then(res => this.ventas = res.body).catch(err => console.log(err))
  	}
  },
  created: function(){
  	this.getVentas()
  }
};
</script>

<style lang="css" scoped>
</style>