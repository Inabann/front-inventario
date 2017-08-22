<template>
	<div class="container">
    <h1 class="has-text-centered title"><span class="has-text-info">Stock de productos</span></h1>
    <b-field grouped>
      <b-input placeholder="por modelos..." type="search" icon-pack="fa" icon="search" v-model="filter"></b-input>
      <b-input placeholder="por color..." type="search" icon-pack="fa" icon="search" v-model="fColor"></b-input>
      <b-input placeholder="por marca..." type="search" icon-pack="fa" icon="search" v-model="fMarca"></b-input>
      <b-input placeholder="por tipo..." type="search" icon-pack="fa" icon="search" v-model="fTipo"></b-input>
    </b-field>
    <b-table :data="filteredStock" :mobile-cards="true" :paginated="true" :per-page="10" default-sort="_id.modelos">

    <template scope="props">
      <b-table-column field="_id.modelo" label="Modelo"  sortable>
        {{ props.row._id.modelo | capitalize }}
      </b-table-column>
      <b-table-column field="_id.color" label="Color" sortable>
        {{ props.row._id.color | capitalize }}
      </b-table-column>
      <b-table-column field="_id.marca" label="Marca" sortable>
        {{ props.row._id.marca | capitalize }}
      </b-table-column>
      <b-table-column field="_id.tipo" label="Tipo" sortable>
        {{ props.row._id.tipo | capitalize }}
      </b-table-column>
      <b-table-column field="cantidad" label="Cantidad" sortable>
        {{ props.row.cantidad }}
      </b-table-column>
    </template>
    <div slot="empty" class="has-text-centered">
      Cargando ...
    </div>
    </b-table>
	</div>
</template>

<script>
export default {

  name: 'Stock',

  data () {
    return {
    	stock: [],
      checkedRows: [],
      selected: {},
      filter: '',
      fColor: '',
      fMarca: '',
      fTipo: ''
    };
  },
  methods:{
  	getStock(){
  		this.$http.post('/api/Productos/stock').then( (res) => {
  			let vm = this 
  			vm.stock = res.body;
  		})
  	}
  },
  computed: {
    filteredStock: function(){
      return this.stock.filter((producto) => {
        return producto._id.modelo.match(this.filter.toLowerCase()) && producto._id.color.match(this.fColor.toLowerCase()) && producto._id.marca.match(this.fMarca.toLowerCase()) && producto._id.tipo.match(this.fTipo.toLowerCase()) ;
        //para usar mas de un filtro usar ejemplo ;v
        //blog.title.match(search1) || blog.content.match(search2)
      });
    }
  },
  created:function(){
  	this.getStock()
  }
};
</script>

<style lang="css" scoped>
</style>