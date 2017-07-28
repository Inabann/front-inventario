<template>
	<div>
		<h1 class="title is-4"><b>NUEVO CLIENTE</b></h1>
		<div class="column is-6">
			<div class="field" >
			  <label class="label is-small">DNI / RUC</label>
			  <div class="control">
			    <input class="input" type="number" v-model="cliente.dni_ruc">
			   
			  </div>
			</div>
			<div class="field">
			  <label class="label is-small">Nombre</label>
			  <div class="control">
			    <input class="input" type="text" v-model="cliente.nombre">
			  </div>
			</div>
			<div class="field">
			  <label class="label is-small">Teléfono</label>
			  <div class="control">
			    <input class="input" type="text" v-model="cliente.telefono">
			  </div>
			</div>
			<br>
			<button class="button is-primary" @click="agregar">Guardar</button>
		</div>
	</div>
</template>
<script>

export default {

  name: 'RegistrarCliente',

  data () {
    return {
    	cliente: {
    		dni_ruc: '',
    		nombre:'',
    		telefono:''
    	}
    };
  },

  methods:{
    agregar(){
      this.$http.post('/api/Clientes', this.cliente).then((res) => {
        console.log(res.body);
      });
    }
   
  },

};
</script>

<style lang="css" scoped>

</style>