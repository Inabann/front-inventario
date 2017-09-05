<template>
	<b-table :data="ventas" :mobile-cards="true" :paginated="true" :per-page="10" :narrowed="true">
    <template scope="props">
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
      <b-table-column field="costo_envio" label="C.Envio">
        {{ props.row.costo_envio }}
      </b-table-column>
      <b-table-column field="total" label="Total" numeric>
        {{ props.row.total }}
      </b-table-column>
      <b-table-column label="Opciones" width="40" >
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
</template>

<script>
import ListaProductos from '@/components/Venta/ListaProductos'
import VerVenta from '@/components/Dashboard/VerVenta'
import VerVentaSinCliente from '@/components/Dashboard/VerVentaSinCliente'

export default {
	components: { ListaProductos, VerVenta, VerVentaSinCliente },
  name: 'Ventas',
  props: ['hoy'],
  data () {
    return {
    	ventas: []
    };
  },
  methods:{
  	getProductos(){
  		this.$http.get('/api/DetalleVenta?filter=%7B%22where%22%3A%7B%22fecha_venta%22%3A%22'+this.hoy+'%22%7D%2C%22include%22%3A%22cliente%22%7D').then(res => {
  			this.ventas = res.body
  		})
  	}
  },
  mounted(){
  	this.getProductos()
  }
};
</script>

<style lang="css" scoped>
</style>