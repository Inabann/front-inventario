<template>
	<div>
		<h2>hola</h2>
		<input type="text" v-model="nuevo.dni_ruc">
		<input type="text" v-model="nuevo.nombre">
		<input type="text" v-model="nuevo.telefono">

		<button @click="agregar">click</button>
		<ul>
			<li v-for="cliente in clientes">{{ cliente.nombre }}</li>
		</ul>
	</div>
</template>

<script>
export default {

  name: 'cliente',

  data () {
    return {
    	clientes: [],
    	nuevo: {
    		dni_ruc: '',
    		nombre:'',
    		telefono:''
    	}
    };
  },

  methods:{
    agregar(){
      this.$http.post('/api/Clientes', this.nuevo).then((res) => {
        console.log(res.body);
        this.clientes.push(res.body);
      });
    },
    getClientes(){
    	this.$http.get('/api/Clientes').then((res) => {
    		this.clientes = res.body;
    	});
    },
  },
  created: function(){
    let arr = [];
    this.$http.get('/api/Clientes').then((res) => {
      arr = res.body;
      this.clientes = arr;
    });
  }
};
</script>