<template>
<div class="container">
<h1 class="title is-3">Productos Ingresados</h1>
  <div class="columns">
    <div class="column is-10">
      <table class="table">
    <thead>
      <tr>
        <th>Marca</th>
        <th>Modelo</th>
        <th>Color</th>
        <th>Tipo</th>
        <th>Cantidad</th>
        <th>P. Unidad</th>
        <th>Fecha Ingreso</th>
        <th>Opciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="producto in productos">
        <td>{{ producto.marcas.nombre }}</td>
        <td>{{ producto.modelos.nombre }}</td>
        <td>{{ producto.colors.nombre }}</td>
        <td>{{ producto.tipos.nombre }}</td>
        <td>{{ producto.cantidad }}</td>
        <td>{{ producto.precio_uni }}</td>
        <td>{{ producto.fecha_ingreso | moment("YYYY / MM / DD") }}</td>
        <td>
          <a class="button is-warning is-small">Editar</a>
          <a class="button is-danger is-small" @click="remove(producto)" >Eliminar</a>
        </td>
      </tr>
    </tbody>
  </table>
    </div>
  
  </div>


</div>
</template>

<script>

export default {

  name: 'Productos',
  data () {
    return {
      productos: []
    };
  },
  methods:{
    getProductos(){
      this.$http.get('/api/Productos?filter[include]=tipos&filter[include]=modelos&filter[include]=colors&filter[include]=modelos&filter[include]=marcas').then((res) => {
        let vm = this
        vm.productos = res.body
      })
    },
    remove(producto){
      this.$http.delete('/api/Productos/'+producto.id).then((res) => {
        let vm = this
        vm.productos.splice(vm.productos.indexOf(producto), 1)

      });
    }
  },
  created: function(){
    this.getProductos();
  }
};
</script>

<style lang="css" scoped>
</style>