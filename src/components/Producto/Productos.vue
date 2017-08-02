<template>
<div class="container">
<h1 class="has-text-centered title"><span class="has-text-info">Productos Ingresados</span></h1>
  <div class="columns">
    <div class="column">
    <label for="modelo" class="label">Buscar</label>
            <input type="text" class="label" name="modelo" v-model="buscarmodelo" placeholder="MODELO">
             
          <table class="table">
    <thead>
      <tr>
         <th>Modelo</th>
        <th>Marca</th>
        <th>Color</th>
        <th>Tipo</th>
        <th>Cantidad</th>
        <th>P. Unidad</th>
        <th>Fecha Ingreso</th>
        <th>Opciones</th>
      </tr>
    </thead>
    <tbody>
       <tr v-for="producto in serchmodelo">
        <td >{{ producto.modelosId }}</td>
        <td >{{ producto.marcasId }}</td>
        <td >{{ producto.colorsId }}</td>
        <td >{{ producto.tiposId }}</td>
        <td>{{ producto.cantidad }}</td>
        <td>{{ producto.precio_uni }}</td>
        <td>{{ producto.fecha_ingreso | moment("add","1 days","YYYY / MM / DD") }}</td>
        <td>
          <a class="button is-warning is-small">Editar</a>
          <a class="button is-danger is-small" @click="remove(producto)" >Eliminar</a>
        </td>
      </tr>
    </tbody>
  </table>
  <pre>{{$data}}</pre>
    </div>
  
  </div>


</div>
</template>

<script>

export default {

  name: 'Productos',
  data () {
    return {
      productos: [],
      buscarmodelo:''
    };
  },
  methods:{
     getProductos(){
      //url con include ?filter[include]=tipos&filter[include]=modelos&filter[include]=colors&filter[include]=modelos&filter[include]=marcas
      this.$http.get('/api/Productos').then((res) => {
        let vm = this
        vm.productos = res.body
        console.log(res.body)
      })
    },
    remove(producto){
      this.$http.delete('/api/Productos/'+producto.id).then((res) => {
        let vm = this
        vm.productos.splice(vm.productos.indexOf(producto), 1)

      });
    }
  },
  computed:{
    serchmodelo: function(){
      return this.productos.filter((producto) => producto.modelosId.includes(this.buscarmodelo));
    }
  },
  created: function(){
    this.getProductos();
  }
};
</script>

<style lang="css" scoped>
</style>