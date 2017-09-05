<template>
<div class="container">
  <div class="columns">
    <div class="column">
      
      <h1 class="has-text-centered title"><span class="has-text-info">Directorio de Usuarios</span></h1>
    </div>
    <div class="column is-offset-4">
      <button class="button is-info is-medium" @click="isComponentModalActive = true; sendUsuario = null "><span class="icon">
      <i class="fa fa-user-plus"></i></span><span>Nuevo Usuario </span></button>
    </div>
  </div>
    
  <b-modal :active.sync="isComponentModalActive" has-modal-card>
      <modal-form :usuarios="usuarios" :sendUsuario="sendUsuario" @newList="usuarios = $event"></modal-form>
  </b-modal>
    
  <b-table :data="usuarios" :mobile-cards="true" :paginated="true" :per-page="10" >
    <template scope="props">
      <b-table-column field="username" label="Usuario"  sortable>
        {{ props.row.username }}
      </b-table-column>
      <b-table-column  label="Opciones" >
        <a class="button is-warning is-small" @click="editUsuario(props.row)">Cambiar Contraseña</a>
        <a class="button is-danger is-small" @click="deleteUsuario(props.row)" >Eliminar</a>
      </b-table-column>
    </template>
    <div slot="empty" class="has-text-centered">
      Cargando ...
    </div>
  </b-table>
</div>
</template>

<script>
import ModalForm from '@/components/Usuario/ModalForm'

export default {

  name: 'Usuarios',
  components: {
    ModalForm
  },
  data () {
    return {
    	usuarios: [],
    	at: '',
    	sendUsuario: {},
			isComponentModalActive: false
    };
  },
  methods:{
  	getAccessToken(){
  		this.at = this.$auth.getToken();
  	},
  	getUsers(){
  		this.$http.get('/api/usuarios?access_token='+this.at.token).then( res => this.usuarios = res.body)
  	},
  	editUsuario(usuario){
      this.sendUsuario = usuario
      this.isComponentModalActive = true
    },
    deleteUsuario(usuario){
        this.$dialog.confirm({
            title: 'Eliminar usuario',
            message: '¿Esta seguro de <strong>eliminar</strong> este usuario? Esta accion no se puede deshacer.',
            confirmText: 'Eliminar',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: () => {
                this.$toast.open({message:'Cliente eliminado',position: 'is-bottom',type: 'is-danger'})
                let id = usuario.id
                this.$http.delete('/api/usuarios/'+id+'?access_token='+this.at.token).then((res) => {
                let vm = this
                vm.usuarios.splice(vm.usuarios.indexOf(usuario), 1)
                });  
            }
          })
    },
  },
  mounted(){
  	this.getAccessToken()
  	this.getUsers()
  }
};
</script>

<style lang="css" scoped>
</style>