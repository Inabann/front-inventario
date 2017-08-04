<template>
	<div>
		<h3 class="title is-4">Agregar Productos</h3>
		<table class="table">
      <thead>
        <tr>
          <th>
		        <b-select placeholder="Modelo" @change="setModelo">
			        <option v-for="option in modelos" :value="option.nombre">{{ option.nombre }}</option>
		  			</b-select>
    			</th>
          <th>
          	<b-select placeholder="Color">
			        <option v-for="option in colores" :value="option.nombre"> {{ option.nombre }}</option>
		  			</b-select>
          </th>
          <th>
          	<b-select placeholder="Marca">
			        <option v-for="option in marcas" :value="option.nombre">{{ option.nombre }}</option>
		  			</b-select>
          </th>
          <th>
          	<b-select placeholder="Tipo">
			        <option v-for="option in tipos" :value="option.nombre">{{ option.nombre }}</option>
		  			</b-select>
          </th>
          <th>En Stock</th>
          <th>Vender</th>
          <th>Agregar</th>
        </tr>
      </thead>
      <tbody v-show="active">
        <tr v-for="producto in Busqueda">

          <td >{{ producto._id.modelo }}</td>
          <td >{{ producto._id.color }}</td>
          <td >{{ producto._id.marca }}</td>
          <td >{{ producto._id.tipo }}</td>
          <td >{{ producto.cantidad }}</td>
          <td ><input type="number" class="input" v-model="restarCantidad"></td>
          <td >
            <a class="button is-info is-small" @click="addCart(producto)"><span class="icon is-small"><i class="fa fa-shopping-cart"></i></span></a>
          </td>
        </tr>
      </tbody>
    </table>
    <h3 class="title is-5">Shopping Cart o Carro de compras :v</h3>
    <table class="table">
    	<thead>
    		<tr>
    			<th>Modelo</th>
    			<th>Color</th>
    			<th>Marca</th>
    			<th>Tipo</th>
    			<th>Cantidad</th>
    			<th>Opciones</th>
    		</tr>
    	</thead>
    	<tbody>
    		<tr v-for="venta in ventas">
    			<td>{{ venta.modelo }}</td>
    			<td>{{ venta.color }}</td>
    			<td>{{ venta.marca }}</td>
    			<td>{{ venta.tipo }}</td>
    			<td>{{ venta.cantidad }}</td>
    			<td>
    				<a class="button is-warning is-small" @click="removeCart(venta)"><span class="icon is-small"><i class="fa fa-minus"></i></span></a>
    			</td>
    		</tr>
    	</tbody>
    </table>
    <pre>
    	{{ ventas }}
    </pre>
	</div>
	
</template>

<script>
export default {

  name: 'MostrarStock',

  data () {
    return {
    	active: false,
    	stock: [],
    	ventas: [],
    	restarCantidad: '',
    	modelos: [],
    	colores: [],
    	tipos: [],
    	marcas: [],
    	fModelo: ''
    };
  },
  methods:{
  	addCart(producto){
  		let venta = {}
			venta.modelo = producto._id.modelo
  		venta.tipo = producto._id.tipo
  		venta.marca = producto._id.marca
  		venta.color = producto._id.color
  		venta.cantidad = this.restarCantidad
  		this.ventas.push(venta)
  		console.log(this.ventas)
  	},
  	removeCart(venta){
  		this.ventas.splice(this.ventas.indexOf(venta), 1)
  	},
  	//es el filtro de la busqueda
  	setModelo(event){
  		this.fModelo = event
  		this.active = true
  	},

  	//opciones de los select
  	getStock(){
  		this.$http.post('/api/Productos/stock').then( (res) => {
  			this.stock = res.body;
  		})
  	},
  	getModelos(){
  		this.$http.get('/api/Modelos').then(res => this.modelos = res.body)
  	},
  	getColores(){
  		this.$http.get('/api/Colors').then(res => this.colores = res.body)
  	},
  	getTipos(){
  		this.$http.get('/api/Tipos').then(res => this.tipos = res.body)
  	},
  	getMarcas(){
  		this.$http.get('/api/Marcas').then(res => this.marcas = res.body)
  	}
  },
  computed:{
  	filteredStock: function(){
      return this.stock.filter((producto) => {
        return producto.cantidad > 0;
        //para usar mas de un filtro usar ejemplo ;v
        //blog.title.match(search1) || blog.content.match(search2)
      });
    },
    Busqueda: function(){
      return this.filteredStock.filter((producto) => {
        return producto._id.modelo.match(this.fModelo);
        //para usar mas de un filtro usar ejemplo ;v
        //blog.title.match(search1) || blog.content.match(search2)
      });
    }
  },
  created:function(){
  	this.getStock()
  	this.getModelos()
  	this.getMarcas()
  	this.getColores()
  	this.getTipos()
  }
};
</script>

<style lang="css" scoped>
</style>