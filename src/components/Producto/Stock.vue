<template>
	<div class="container">
    <h1 class="has-text-centered title"><span class="has-text-info">Stock de productos</span></h1>
    <b-field grouped>
      <b-input placeholder="Buscar modelos..." type="search" icon-pack="fa" icon="search" v-model="filter"></b-input>
      <b-input placeholder="Buscar marca... aun no funciona" type="search" icon-pack="fa" icon="search"></b-input>
      <b-input placeholder="Buscar color... aun no funciona" type="search" icon-pack="fa" icon="search"></b-input>
      <b-input placeholder="Buscar tipo... aun no funciona" type="search" icon-pack="fa" icon="search"></b-input>
    </b-field>
    <b-table :data="filteredStock" :mobile-cards="true" :paginated="true" :per-page="10" default-sort="_id.modelos">

    <template scope="props">
      <b-table-column field="_id.modelo" label="Modelo"  sortable>
        {{ props.row._id.modelo }}
      </b-table-column>

      <b-table-column field="_id.marca" label="Marca" sortable>
        {{ props.row._id.marca }}
      </b-table-column>

      <b-table-column field="_id.color" label="Color" sortable>
        {{ props.row._id.color }}
      </b-table-column>

      <b-table-column field="_id.tipo" label="Tipo" sortable>
        {{ props.row._id.tipo }}
      </b-table-column>
      <b-table-column field="cantidad" label="Cantidad" sortable>
        {{ props.row.cantidad }}
      </b-table-column>
    </template>
    <div slot="empty" class="has-text-centered">
      This table is empty!
    </div>
    </b-table>

    <!-- <table class="table">
    <thead>
      <tr>
        <th>Modelo</th>
        <th>Marca</th>
        <th>Color</th>
        <th>Tipo</th>
        <th>Cantidad</th>
      </tr>
    </thead>
    <tbody>
       <tr v-for="producto in stock">
        <td >{{ producto._id.modelo }}</td>
        <td >{{ producto._id.marca }}</td>
        <td >{{ producto._id.color }}</td>
        <td >{{ producto._id.tipo }}</td>
        <td>{{ producto.cantidad }}</td>
      </tr>
    </tbody>
  </table> -->
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
      filter: ''
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
        return producto._id.modelo.match(this.filter);
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