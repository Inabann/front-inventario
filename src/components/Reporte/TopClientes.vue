<template>
	<b-table :data="clientes" :mobile-cards="true" :paginated="true" :per-page="7" :narrowed="true">
    <template scope="props">
    	<b-table-column field="dni_ruc" label="DNI/RUC" width="20" sortable>
        {{ props.row.dni_ruc }}
      </b-table-column>
      <b-table-column field="nombre" label="Nombre" width="40" sortable>
        {{ props.row.nombre }}
      </b-table-column>
      <b-table-column field="total" label="Total" width="40" sortable>
        {{ props.row.total }}
      </b-table-column>
    </template>
    <div slot="empty" class="has-text-centered">
      Cargando ...
    </div>
  </b-table>
</template>

<script>
export default {
	props:['fecha'],
  name: 'TopClientes',

  data () {
    return {
    	clientes: []
    };
  },
  methods:{
  	getTop(){
  		this.$http.post('/api/DetalleVenta/mejorCliente', {fecha: this.fecha}).then( res => {
  			this.clientes = res.body
  		})
  	}
  },
  watch:{
  	fecha: function(value){
  		this.getTop()
  	}
  },
  mounted(){
  	this.getTop()
  }
};
</script>

<style lang="css" scoped>
</style>