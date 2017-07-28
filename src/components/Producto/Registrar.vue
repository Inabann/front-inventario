<template>
  <div class="container">
    <h1 class="title is-4"><span>Registrar Ingreso de Productos</span></h1>
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
   
    </div> 
    <label for="marca" class="label">Marca</label>
    <InputModelo :atrib="'Marcas'" @getId="producto.marcasId = $event" id="marca"></InputModelo>
    
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
    <button class="button is-primary" @click="addProducto">Agregar</button>

    
  </div>
</template>

<script>
import InputModelo from '@/components/Producto/InputModelo'


export default {

  name: 'RegistrarProducto',
  components: {
    InputModelo
  },
  data () {
    return {
      producto: {
        modelosId: '',
        tiposId: '',
        marcasId: '',
        colorsId: '',
        cantidad: '',
        precio_uni: '',
        fecha_ingreso: ''
      }
    };
  },
  methods: {
    addProducto(){
      this.$http.post('/api/Productos', this.producto).then((res) => {
        if(res.ok){
          //agregar notificacion de ingreso correcto y de errores
          console.log('producto ingresado');
        } 
      });
    }
  }
};
</script>

<style lang="css">
</style>
