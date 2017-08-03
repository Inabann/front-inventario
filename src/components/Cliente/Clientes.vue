<template>
    <div class="container">
      <div class="columns">
        <div class="column">
        <button class="button is-primary is-medium" @click="isComponentModalActive = true; sendCliente = null ">Nuevo Cliente</button><br><br>

        <b-modal :active.sync="isComponentModalActive" has-modal-card>
            <modal-form :clientes="clientes" :sendCliente="sendCliente" @newList="clientes = $event"></modal-form>
        </b-modal>

            <h1 class="title is-4"><b>DIRECTORIO DE CLIENTES</b></h1>
             <div class="columns">
               <div class="column">
                 <label for="dni" class="label">Buscar</label>
            <input type="text" class="label" name="dni" v-model="buscardni" placeholder="DNI/RUC">
               </div>
               <!-- <div class="column">
                 <label for="nombre" class="label">Buscar</label>
            <input type="text" class="label" name="nombre" v-model="buscar" placeholder="Nombre">
               </div> -->

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
                <tr v-for="cliente in serchuser">

                  <td>{{ cliente.dni_ruc}}</td>
                  <td>{{ cliente.nombre }}</td>
                  <td>{{ cliente.telefono }}</td>
                  <td>
                    <a class="button is-warning is-small" @click="editCliente(cliente)"> Editar</a>
                    <a class="button is-danger is-small" @click="deleteCliente(cliente)" > Eliminar</a>
                  </td>
                </tr>
              </tbody>
            </table>

            
        </div>
      </div>
    </div>
	
</template>

<script>
import ModalForm from '@/components/Cliente/ModalForm'

export default {
  components: {
    ModalForm
  },
  name: 'cliente',

  data () {
    return {
      clientes: [],
      sendCliente: {},
      buscar:'',
      buscardni:'',

      isComponentModalActive: false
    };
  },

  methods:{
    getClientes(){
      this.$http.get('/api/Clientes').then((res) => {
        let vm = this;
        vm.clientes = res.body;
      });
    },
    deleteCliente(cliente){
        this.$dialog.confirm({
            title: 'Eliminar usuario',
            message: '¿Esta seguro de <strong>eliminar</strong> este cliente? Esta accion no se puede deshacer.',
            confirmText: 'Eliminar',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: () => {
                this.$toast.open({message:'Cliente eliminado',position: 'is-bottom',type: 'is-danger'})
                let id = cliente.id
                this.$http.delete('/api/Clientes/'+id).then((res) => {
                let vm = this
                vm.clientes.splice(vm.clientes.indexOf(cliente), 1)
                });  
            }
          })
    },
    editCliente(cliente){
      this.sendCliente = cliente
      this.isComponentModalActive = true
    }
  },

  computed:{
    serchuser: function(){
      return this.clientes.filter((cliente) => cliente.dni_ruc.includes(this.buscardni));
    }
  },
  created: function(){
    this.getClientes();
  }
};
</script>
<style type="text/css">

</style>
