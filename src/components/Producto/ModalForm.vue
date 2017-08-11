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
       <label for="tipo" class="label">Tipo</label>
         <InputModelo :atrib="'Tipos'" @getId="producto.tiposId = $event" id="tipo"></InputModelo>
       </div>
       <div class="column is-3">
          <label class="label" for="color">Color</label>
         <InputModelo :atrib="'Colors'" @getId="producto.colorsId = $event" id="color"></InputModelo>
       </div>
       <div class="column is-3">
          <label for="marca" class="label">Marca</label>
      <InputModelo :atrib="'Marcas'" @getId="producto.marcasId = $event" id="marca"></InputModelo>
       </div>   
      </div> 

      <!-- <label for="marca" class="label">Marca</label>
      <InputModelo :atrib="'Marcas'" @getId="producto.marcasId = $event" id="marca"></InputModelo> -->
      
      <div class="columns">
        <div class="column is-4">
          <div class="field">
            <label class="label">Cantidad</label>
            <div class="control">
              <input class="input" type="number" placeholder="Cantidad" v-model="producto.cantidad">
            </div>
          </div>
          
        </div>
        <div class="column is-4">
          <div class="field">
            <label class="label">Precio Unitario</label>
            <div class="control">
              <input class="input" type="number" placeholder="Precio unitario" v-model="producto.precio_uni">
            </div>
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
        fecha_ingreso: ''
      }
    }
  },
  methods: {
    saveProducto(){
      if(this.sendProducto){
        let index = this.productos.indexOf(this.sendProducto)
        this.$http.put('/api/Productos/'+this.producto.id, this.producto).then(res => {
          this.productos[index] = res.body
          this.$emit('newList', this.productos)
          this.$parent.close()
          this.$toast.open({message:'Producto editado',type: 'is-success'})
        })
      } else {
        this.producto.cantidad_res = this.producto.cantidad;
        this.$http.post('/api/Productos', this.producto).then(res => {
          this.productos.unshift(res.body)
          this.$emit('newList', this.productos)
          this.$parent.close()
          this.$toast.open({message:'Producto guardado',type: 'is-success'})
        })
      }
    }
  },
    created: function(){
      if(this.sendProducto){
        this.producto = this.sendProducto

      }
    }
}
</script>


<style scoped>
    .modal-card {
        /*width: auto;
*/    }
</style>