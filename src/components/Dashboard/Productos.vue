<template>
	<b-table :data="productos" :mobile-cards="true" :paginated="true" :per-page="6" :narrowed="true">
    <template scope="props">
    	<b-table-column field="modelosId" label="Modelo"  sortable>
        {{ props.row.modelosId | capitalize }}
      </b-table-column>
      <b-table-column field="colorsId" label="Color" sortable>
        {{ props.row.colorsId | capitalize }}
      </b-table-column>
      <b-table-column field="marcasId" label="Marca" sortable>
        {{ props.row.marcasId | capitalize }}
      </b-table-column>
      <b-table-column field="tiposId" label="Tipo" sortable>
        {{ props.row.tiposId | capitalize }}
      </b-table-column>
      <b-table-column field="cantidad" label="Cantidad" numeric sortable  width="30">
        {{ props.row.cantidad | capitalize }}
      </b-table-column>
      <b-table-column field="precio_uni" label="P. Uni" numeric  width="40">
        {{ props.row.precio_uni }}
      </b-table-column>
      <b-table-column label="Opciones" width="40" >
        <a class="button is-warning is-small" @click="edit()">Ver</a>
      </b-table-column>
    </template>
    <div slot="empty" class="has-text-centered">
      Cargando ...
    </div>
  </b-table>
</template>

<script>
export default {

  name: 'Productos',
  props: ['hoy'],
  data () {
    return {
    	productos: []
    };
  },
  methods:{
  	getProductos(){
  		this.$http.get('/api/Productos?filter=%7B%22where%22%3A%7B%22fecha_ingreso%22%3A%22'+this.hoy+'%22%7D%7D').then(res => {
  			this.productos = res.body
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