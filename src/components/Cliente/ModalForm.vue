<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title" v-if="sendCliente">Editar Cliente</p>
      <p class="modal-card-title" v-else="sendCliente">Nuevo Cliente</p>
        
    </header>
    <section class="modal-card-body">
      <b-field label="DNI/RUC">
        <b-input type="text" v-model="cliente.dni_ruc" placeholder="DNI o RUC" minlength="8" required >
        </b-input>
      </b-field>
      <b-field label="Nombres">
        <b-input type="text" v-model="cliente.nombre" placeholder="Nombres y Apellidos" minlength="5"    required>
        </b-input>
      </b-field>
      <b-field label="Numero de Contacto">
        <b-input type="text" v-model="cliente.telefono" placeholder="Celular/Telefono" minlength="6"  required></b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot ">
      <button class="button" type="button" @click="$parent.close()">Cerrar</button>
     <!--  <button  v-show="cliente.dni_ruc && cliente.nombre && cliente.telefono" class="button is-primary" @click="saveCliente">Guardar</button> -->
       <button  v-show="cliente.dni_ruc && cliente.nombre && cliente.telefono" class="button is-primary disabled" @click="saveCliente">Guardar</button>
    </footer>
  </div>
</template>

<script>
  export default {
    props: ['clientes','sendCliente'],
    data () {
      return {
        cliente: {
          dni_ruc: '',
          nombre: '',
          telefono: ''
        }
      }
    },
    methods:{
      saveCliente(){
        if(this.sendCliente){
          let index = this.clientes.indexOf(this.sendCliente)
          this.$http.put('/api/Clientes/'+this.cliente.id, this.cliente).then(res => {
            this.clientes[index] = res.body
            this.$emit('newList', this.clientes)
            this.$parent.close()
            this.$toast.open({message:'Cliente editado',type: 'is-success'})
          })
        } else {
          this.$http.post('/api/Clientes', this.cliente).then(res => {
            this.clientes.unshift(res.body)
            this.$emit('newList', this.clientes)
            this.$parent.close()
            this.$toast.open({message:'Cliente guardado',type: 'is-success'})
          })
        }
      }
    },
    created: function(){
      if(this.sendCliente){
        this.cliente = this.sendCliente
      }
    }
  }
</script>

<style scoped>
    .modal-card {
        /*width: auto;
*/    }
</style>