<template>
	
		 <!-- MODAL -->
           <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Editar CLIENTE:  {{hola.nombre}}  </p>
            <button class="delete"  @click="$emit('close')"></button>
          </header>
          <section class="modal-card-body">
            <!-- Content ... -->
           <div >
		<div class="colums">
			<div class="column">
			<h2>EDITAR CLIENTE</h2>
			<div class="field" >
        <label class="label is-small">DNI / RUC</label>
        <div class="control">
          <input class="input" type="text" :value="hola.dni_ruc">
         
        </div>
      </div>
      <div class="field">
        <label class="label is-small">Nombre</label>
        <div class="control">
          <input class="input" type="text" :value="hola.nombre">
        </div>
      </div>
      <div class="field">
        <label class="label is-small">Teléfono</label>
        <div class="control">
          <input class="input" type="text" :value="hola.telefono">
        </div>
      </div>
        <div class="field">
        <label class="label is-small">email</label>
        <div class="control">
          <input class="input" type="text" :value="hola.email">
        </div>
      </div>
      <br>
      <button class="button is-primary" >EDITAR</button>
		
		</div>
		</div>
	</div>

          </section>
          <footer class="modal-card-foot">
            <a class="button is-success" @click="update(hola);$emit('close')">Save changes</a>
            <a class="button" @click="$emit('close')" >Cancel</a>
          </footer>
        </div>
      </div>
<!-- TERMINA MODAL -->

</template>
<script>
export default {

  name: 'editcliente',
  props:['hola'],
  data () {
    return {
     
    
    };
  },

  methods:{
    getClientes(){
      this.$http.get('/api/Clientes').then((res) => {
        let vm = this;
        vm.clientes = res.body;
      });
    },
    eliminar(cliente){
      let id = cliente.id
      this.$http.delete('/api/Clientes/'+id).then((res) => {
        let vm = this
        vm.clientes.splice(vm.clientes.indexOf(cliente), 1)
      });
    },
    editar(cliente){
     let id = cliente.id
      this.$http.get('/api/Clientes/'+id).then((res) => {
       this.editCliente = res.body;

      });
     },
     update(editCliente){
      this.$http.put('/api/Clientes/'+editCliente.id,this.editCliente).then((res) => {
        this.editCliente = {};
        this.getClientes();
      });
       
     },

   
  },
  created: function(){
    this.getClientes();
  }
};
</script>
<style type="text/css">

</style>