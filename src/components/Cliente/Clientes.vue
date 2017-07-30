<template>
    <div class="container">
      <div class="columns">
      
        <div class="column">
             <button class="button is-primary is-large" @click="EstadoModal=true"> Nuevo Cliente</button>
     <modalCliente v-show="EstadoModal" @close="EstadoModal=false"></modalCliente>
     <editCliente :hola="editCliente" v-show="EstadoModalEdit" @close="EstadoModalEdit=false"></editCliente>
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
                    <a class="button is-warning is-small" @click="editar(cliente);EstadoModalEdit=true" > Editar</a>
                    <a class="button is-danger is-small" @click="eliminar(cliente)" > Eliminar</a>
                  </td>
                </tr>
              </tbody>
            </table>


         
          </div>
        </div>
      </div>
    </div>
	
</template>

<script>
import modalCliente from '@/components/Cliente/modalCliente'
import editCliente from '@/components/Cliente/editCliente'
export default {

  name: 'cliente',
 components: {
   modalCliente,
   editCliente,
  },
  data () {
    return {
      clientes: [],
    	clientes2: [],
      editCliente:{
        dni_ruc:'',
        nombre:'',
        telefono:'',
        email:''
      },
      saludo:'saludo2',
      EstadoModal: false,
      EstadoModalEdit: false
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
