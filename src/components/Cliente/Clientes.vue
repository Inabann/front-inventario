<template>
    <div class="container">
      <div class="columns">
        <div class="column">
          <div>
            <h1 class="title is-4"><b>DIRECTORIO DE CLIENTES</b></h1>
            <table class="table">
              <thead>
                <tr>
                  <th>DNI/RUC</th>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cliente in clientes">
                  <td>{{ cliente.dni_ruc}}</td>
                  <td>{{ cliente.nombre }}</td>
                  <td>{{ cliente.telefono }}</td>
                  <td>
                    <a class="button is-warning is-small" @click="editar(cliente)" > Editar</a>
                    <a class="button is-danger is-small" @click="eliminar(cliente)" > Eliminar</a>
                  </td>
                </tr>
              </tbody>
            </table>
    <div ><h3>FALTA ACTUALIZA LA TABLA <small> funciona el boton editar :)</small></h3></div>
            <h3 class="title is-1">EDITAR DEBE IR EN UN MODAL</h3>

            <div>
              <h1 class="title is-4"><b>NUEVO CLIENTE</b></h1>
    <div class="column is-6">
      <div class="field" >
        <label class="label is-small">DNI / RUC</label>
        <div class="control">
          <input class="input" type="text" v-model="editCliente.dni_ruc">
         
        </div>
      </div>
      <div class="field">
        <label class="label is-small">Nombre</label>
        <div class="control">
          <input class="input" type="text" v-model="editCliente.nombre">
        </div>
      </div>
      <div class="field">
        <label class="label is-small">Teléfono</label>
        <div class="control">
          <input class="input" type="text" v-model="editCliente.telefono">
        </div>
      </div>
        <div class="field">
        <label class="label is-small">email</label>
        <div class="control">
          <input class="input" type="text" v-model="editCliente.email">
        </div>
      </div>
      <br>
      <button class="button is-primary" @click="update(editCliente)">EDITAR</button>
    </div>
            </div>

          </div>
        </div>
      </div>
    </div>
	
</template>

<script>

export default {

  name: 'cliente',
 
  data () {
    return {
      clientes: [],
    	clientes2: [],
      editCliente:{
        dni_ruc:'dni_ruc',
        nombre:'nombre',
        telefono:'telefono',
        email:''
      },
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
        let vm = this;
       vm.clientes2 =res.body;
       this.editCliente = vm.clientes2;
       console.log(vm.editCliente.id);
      });
     },
     update(editCliente){
      this.$http.put('/api/Clientes/'+editCliente.id,this.editCliente).then((res) => {

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
