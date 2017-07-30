<template>
	<div class="container">
		<div class="columns">
	<div class="column">
		<table class="table">
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
  </table>
	</div>
		
	</div>
	</div>
	
	
</template>

<script>
export default {

  name: 'Stock',

  data () {
    return {
    	stock: []
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
  created:function(){
  	this.getStock()
  }
};
</script>

<style lang="css" scoped>
</style>