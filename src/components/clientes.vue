<template>
	<div>
		<h2>hola</h2>
		<input type="text" v-model="nuevo.dni_ruc">
		<input type="text" v-model="nuevo.nombre">
		<input type="text" v-model="nuevo.telefono">

		<button @click="agregar">click</button>
		<ul>
			<li v-for="cliente in clientes"></li>
		</ul>
	</div>
</template>

<script>
export default {

  name: 'cliente',

  data () {
    return {
    	clientes: '',
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
        console.log(res);
        this.mostrar();
      });
    },
    mostrar(){
    	this.$http.get('/api/Clientes').then((res) => {
    		this.clientes = res.body;
    	});
    },
    computed:{
    	jalar: function () {
    		// body...
    	}
    }
  }
};
</script>