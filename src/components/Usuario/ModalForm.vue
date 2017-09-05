<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title" v-if="sendUsuario">Editar usuario</p>
      <p class="modal-card-title" v-else="sendUsuario">Nuevo usuario</p>
        
    </header>
    <section class="modal-card-body" v-if="!sendUsuario">
      <b-field label="Nombre">
        <b-input type="text" v-model="usuario.username" placeholder="Nombre" required>
        </b-input>
      </b-field>
      <b-field label="Contraseña">
        <b-input type="text" v-model="usuario.password" placeholder="contraseña" required>
        </b-input>
      </b-field>
    </section>
    
    <section class="modal-card-body" v-if="sendUsuario">
      <b-field label="Nueva Contraseña">
        <b-input type="password" v-model="usuario.password" placeholder="contraseña" required>
        </b-input>
      </b-field>

    </section>

    <footer class="modal-card-foot ">
      <button class="button" type="button" @click="$parent.close()">Cerrar</button>
       <button class="button is-primary" @click="saveusuario">Guardar</button>
    </footer>
  </div>
</template>

<script>
  export default {
    props: ['usuarios','sendUsuario'],
    data () {
      return {
        usuario: {
          username: '',
          password: ''
        },
        at: '',
      }
    },
    methods:{
      saveusuario(){
        this.usuario.password = this.usuario.password.toLowerCase()
        if(this.sendUsuario){
          let index = this.usuarios.indexOf(this.sendUsuario)
          this.$http.put('/api/usuarios/'+this.usuario.id+'?access_token='+this.at.token, this.usuario).then(res => {
            this.usuarios[index] = res.body
            this.$emit('newList', this.usuarios)
            this.$parent.close()
            this.$toast.open({message:'usuario editado',type: 'is-success'})
          })
        } else {
          this.$http.post('/api/usuarios', this.usuario).then(res => {
            this.usuarios.unshift(res.body)
            this.$emit('newList', this.usuarios)
            this.$parent.close()
            this.$toast.open({message:'usuario guardado',type: 'is-success'})
          })
        }
      }
    },
    created: function(){
      this.at = this.$auth.getToken();
      if(this.sendUsuario){
        this.usuario = this.sendUsuario
      }
    }
  }
</script>

<style scoped>
    .modal-card {
        /*width: auto;
*/    }
</style>