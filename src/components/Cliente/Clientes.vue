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
                    <a class="button is-warning is-small">Editar</a>
                    <a class="button is-danger is-small" @click="eliminar(cliente)">Eliminar</a>
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

export default {

  name: 'cliente',

  data () {
    return {
    	clientes: []
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
    }
   
  },
  created: function(){
    this.getClientes();
  }
};
</script>
<style type="text/css">

</style>
