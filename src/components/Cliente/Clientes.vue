<template>
    <div class="container">
      <div class="columns">
        <div class="column">
          <div>
            <h1 class="title is-4"><b>DIRECTORIO DE CLIENTES</b></h1>

            <a class="button is-primary is-outlined">
            <span class="icon is-small">
              <i class="fa fa-user-plus"></i>
            </span>
            <span>Nuevo Cliente</span>
            </a>
            <br>
            <br>
            <div class="column is-4">
            <div class="field" >
              <label class="label is-small">DNI / RUC</label>
              <div class="control">
                <input class="input" type="text" v-model="nuevo.dni_ruc">
               
              </div>
            </div>
            <div class="field">
              <label class="label is-small">Nombre</label>
              <div class="control">
                <input class="input" type="text" v-model="nuevo.nombre">
              </div>
            </div>
            <div class="field">
              <label class="label is-small">Teléfono</label>
              <div class="control">
                <input class="input" type="text" v-model="nuevo.telefono">
              </div>
            </div>
              
            <button class="button is-primary" @click="agregar">Guardar</button>
            </div>

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
    eliminar(cliente){
      let id = cliente.id
      this.$http.delete('/api/Clientes/'+id).then((res) => {
        let vm = this
        vm.clientes.splice(vm.clientes.indexOf(cliente), 1)
      });
    }
   
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
<style type="text/css">

</style>
