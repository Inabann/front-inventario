<template>

        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title" v-if="sendCliente">Editar Cliente</p>
                <p class="modal-card-title" v-else="sendCliente">Nuevo Cliente</p>
                
            </header>
            <section class="modal-card-body">
                <b-field label="DNI/RUC">
                    <b-input
                        type="text"
                        v-model="cliente.dni_ruc"
                        placeholder="DNI o RUC"
                        required>
                    </b-input>
                </b-field>
                <b-field label="Nombres">
                    <b-input
                        type="text"
                        v-model="cliente.nombre"
                        placeholder="Nombres y Apellidos"
                        required>
                    </b-input>
                </b-field>
                <b-field label="Numero de Contacto">
                    <b-input
                        type="text"
                        v-model="cliente.telefono"
                        placeholder="Celular/Telefono"
                        required>
                    </b-input>
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Cerrar</button>
                <button class="button is-primary" @click="saveCliente">Guardar</button>
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
          })
        } else {
          this.$http.post('/api/Clientes', this.cliente).then(res => {
            this.clientes.push(res.body)
            this.$emit('newList', this.clientes)
            this.$parent.close()
          })
        }
      }
    },
    created: function(){
      console.log(this.sendCliente)
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