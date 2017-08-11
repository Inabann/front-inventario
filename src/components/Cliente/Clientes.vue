<template>
  <div class="container">
    <button class="button is-info is-medium" @click="isComponentModalActive = true; sendCliente = null ">Nuevo Cliente</button><br><br>

    <b-modal :active.sync="isComponentModalActive" has-modal-card>
        <modal-form :clientes="clientes" :sendCliente="sendCliente" @newList="clientes = $event"></modal-form>
    </b-modal>
    
    <h1 class="title is-4"><b>DIRECTORIO DE CLIENTES</b></h1>
    <b-field grouped>
      <b-input placeholder="por DNI/RUC..." type="search" icon-pack="fa" icon="search" v-model="fDni"></b-input>
      <b-input placeholder="por Nombre..." type="search" icon-pack="fa" icon="search" v-model="fNombre"></b-input>
    </b-field>
    <b-table :data="searchUser" :mobile-cards="true" :paginated="true" :per-page="10" >
      <template scope="props">
        <b-table-column field="dni_ruc" label="DNI/RUC"  sortable>
          {{ props.row.dni_ruc }}
        </b-table-column>
        <b-table-column field="nombre" label="Nombres y Apellidos" sortable>
          {{ props.row.nombre }}
        </b-table-column>
        <b-table-column field="telefono" label="Numero Contacto" sortable>
          {{ props.row.telefono }}
        </b-table-column>
        <b-table-column  label="Opciones" >
          <a class="button is-warning is-small" @click="editCliente(props.row)">Editar</a>
          <a class="button is-danger is-small" @click="deleteCliente(props.row)" >Eliminar</a>
        </b-table-column>
      </template>
      <div slot="empty" class="has-text-centered">
        Cargando ...
      </div>
    </b-table>
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
      fDni: '',
      fNombre: '',
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
    searchUser: function(){
      return this.clientes.filter((cliente) => {
        return cliente.dni_ruc.match(this.fDni) && cliente.nombre.match(this.fNombre);
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
