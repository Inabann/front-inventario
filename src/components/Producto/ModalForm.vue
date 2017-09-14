  <template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title" v-if="sendProducto">Editar Prodcuto</p>
      <p class="modal-card-title" v-else="sendProducto">Registrar Ingreso de Productos</p>
        
    </header>

    <section class="modal-card-body">
      <div class="columns">
       <div class="column is-3">
       <label for="modelo" class="label">Modelo</label>
         <InputModelo :atrib="'Modelos'" @getId="producto.modelosId = $event" id="modelo"></InputModelo>
       </div>
       <div class="column is-3">
          <label class="label" for="color">Color</label>
         <InputModelo :atrib="'Colors'" @getId="producto.colorsId = $event" id="color"></InputModelo>
       </div>
       <div class="column is-3">
       <label for="tipo" class="label">Tipo</label>
         <InputModelo :atrib="'Tipos'" @getId="producto.tiposId = $event" id="tipo"></InputModelo>
       </div>
       <div class="column is-3">
          <label for="marca" class="label">Marca</label>
          <InputModelo :atrib="'Marcas'" @getId="producto.marcasId = $event" id="marca"></InputModelo>
       </div>   
      </div> 
     
      <div class="columns">
        <div class="column is-2">
          <div class="field">
            <label class="label">Cantidad</label>
            <div class="control">
              <input class="input" type="number" placeholder="Cantidad" v-model="producto.cantidad">
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="field">
            <label class="label">Precio Unitario</label>
            <div class="control">
              <input class="input" type="number" placeholder="Precio Unitario" v-model="producto.sub_total">
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="field">
            <label class="label">Total</label>
            <!-- <div class="control">
              <input class="input" type="number" placeholder="Precio Total" v-model="producto.precio_uni" disabled>
            </div> -->
            <p>s/. {{ total }}</p>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="label">Filial</label>
            <b-select placeholder="Seleccione filial" v-model="producto.usuarioId">
              <option
                  v-for="option in usuarios"
                  :value="option.id"
                  :key="option.id">
                  {{ option.username }}
              </option>
            </b-select>
          </div>
        </div>
      </div>
      <div class="columns"> 
        <div class="column is-4">
        <label class="label" for="fecha">Fecha</label>
          <input type="date"  class="input" id="fecha" v-model="producto.fecha_ingreso">
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Cerrar</button>
      <button class="button is-primary" @click="saveProducto">Guardar</button>
    </footer>
  </div>
</template>

<script>
import InputModelo from '@/components/Producto/InputModelo'


export default {

  name: 'RegistrarProducto',
  components: {
    InputModelo
  },
  props: ['productos','sendProducto'],
  data () {
    return {
      producto: {
        modelosId: '',
        tiposId: '',
        marcasId: '',
        colorsId: '',
        cantidad: '',
        cantidad_res: '',
        precio_uni: '',
        fecha_ingreso: '',
        usuarioId: '',
        sub_total: ''
      },
      usuarios: []
    }
  },
  methods: {
    saveProducto(){
      if(this.sendProducto){
        let index = this.productos.indexOf(this.sendProducto)
        this.producto.precio_uni = this.total
        this.$http.put('/api/Productos/'+this.producto.id, this.producto).then(res => {
          this.productos[index] = res.body
          this.$emit('newList', this.productos)
          this.$parent.close()
          this.$toast.open({message:'Producto editado',type: 'is-success'})
        })
      } else {
        this.producto.cantidad_res = this.producto.cantidad;
        this.producto.precio_uni = this.total
        this.$http.post('/api/Productos', this.producto).then(res => {
          this.$http.get('/api/usuarios/'+this.producto.usuarioId+'?access_token='+this.$auth.getToken().token).then( response => {
            res.body.usuario = response.body
            this.productos.unshift(res.body)
            this.$emit('newList', this.productos)
            this.$parent.close()
            this.$toast.open({message:'Producto guardado',type: 'is-success'})
          })
          
        })
      }
    },
    getFilial(){
      this.$http.get('/api/usuarios?access_token='+this.$auth.getToken().token).then(res => this.usuarios = res.body)
    }
  },
  created: function(){
    if(this.sendProducto){
      this.producto = this.sendProducto
    }
    this.getFilial()
  },
  computed: {
    total: function(){
      return Number(this.producto.cantidad) * Number(this.producto.sub_total)
    }
  }
}
</script>


<style scoped>
.modal-card {
  width: 1000px;
}
</style>