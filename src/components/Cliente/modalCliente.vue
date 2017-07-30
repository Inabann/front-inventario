<template>
	
		 <!-- MODAL -->
           <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">NUEVO CLIENTE</p>
            <button class="delete"  @click="$emit('close')"></button>
          </header>
          <section class="modal-card-body">
            <!-- Content ... -->
           <div >
		<div class="colums">
			<div class="column">
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
			<div class="field">
			  <label class="label is-small">email</label>
			  <div class="control">
			    <input class="input" type="email" v-model="cliente.email">
			  </div>
			</div>
		
		</div>
		</div>
	</div>

          </section>
          <footer class="modal-card-foot">
            <a class="button is-success" @click="agregar(cliente);$emit('close')">Save changes</a>
            <a class="button" @click="$emit('close')" >Cancel</a>
          </footer>
        </div>
      </div>
<!-- TERMINA MODAL -->

</template>

<script>




export default {

  name: 'modalcliente2',

  data () {
    return {
    	cliente: {
    		dni_ruc: '',
    		nombre:'',
    		telefono:'',
    		email:''
    	},
    };
  }
  ,

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
