<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <h1 class="has-text-centered title"><span class="has-text-info">Productos Ingresados</span></h1>
      </div>
      <div class="column is-offset-4">
        <button class="button is-info is-medium" @click="isComponentModalActive = true; sendProducto = null ">Nuevo Producto</button><br><br>
      </div>
    </div>
    
    <!-- MODAL -->
    <b-modal :active.sync="isComponentModalActive" has-modal-card>
        <modal-form :productos="productos" :sendProducto="sendProducto" @newList="productos = $event"></modal-form>
    </b-modal>

    
    <b-field>
    <a class="button is-info" @click="buscar = !buscar"><span class="icon is-small"><i class="fa fa-search"></i></span></a>
    <b-field grouped v-if="buscar">
      <b-input placeholder="por modelos..." type="search" icon-pack="fa" icon="search" v-model="filter" class="inputBusqueda"></b-input>
      <b-input placeholder="por color..." type="search" icon-pack="fa" icon="search" v-model="fColor" class="inputBusqueda"></b-input>
      <b-input placeholder="por marca..." type="search" icon-pack="fa" icon="search" v-model="fMarca" class="inputBusqueda"></b-input>
      <b-input placeholder="por tipo..." type="search" icon-pack="fa" icon="search" v-model="fTipo" class="inputBusqueda"></b-input>
    </b-field>
    
    </b-field>
    <b-table :data="filteredProductos" :mobile-cards="true" :paginated="true" :per-page="10" >
    <template scope="props">
      <b-table-column field="modelosId" label="Modelo"  sortable>
        {{ props.row.modelosId | capitalize }}
      </b-table-column>
      <b-table-column field="colorsId" label="Color" sortable>
        {{ props.row.colorsId | capitalize }}
      </b-table-column>
      <b-table-column field="marcasId" label="Marca" sortable>
        {{ props.row.marcasId | capitalize }}
      </b-table-column>
      <b-table-column field="tiposId" label="Tipo" sortable>
        {{ props.row.tiposId | capitalize }}
      </b-table-column>
      <b-table-column field="cantidad" label="Cantidad" numeric sortable>
        {{ props.row.cantidad | capitalize }}
      </b-table-column>
      <b-table-column field="precio_uni" label="Precio" numeric>
        {{ props.row.precio_uni }}
      </b-table-column>
      <b-table-column field="fecha_ingreso" label="F. Ingreso" sortable>
        <span class="tag is-success">
          <!-- {{ new Date(props.row.fecha_ingreso).toLocaleDateString() }} -->
          {{ props.row.fecha_ingreso | moment("add","1 days","YYYY / MM / DD") }}
        </span>
      </b-table-column>
      <b-table-column label="Opciones" >
        <a class="button is-danger is-small" @click="remove(props.row)" >Eliminar</a>
      </b-table-column>
    </template>
    <div slot="empty" class="has-text-centered">
      Cargando ...
    </div>
    </b-table>
  </div>
</template>

<script>
import ModalForm from '@/components/Producto/ModalForm'

export default {
  components: {
    ModalForm
  },

  name: 'Productos',
  data () {
    return {
      productos: [],
      filter: '',
      fMarca: '',
      fColor: '',
      fTipo: '',
      buscar: false,
      sendProducto: {},

      isComponentModalActive: false
    };
  },
  methods:{
     getProductos(){
      //url con include ?filter[include]=tipos&filter[include]=modelos&filter[include]=colors&filter[include]=modelos&filter[include]=marcas
      this.$http.get('/api/Productos?filter[order]=fecha_ingreso%20DESC&').then((res) => { //productos ordenados de forma descendente
        let vm = this
        vm.productos = res.body
      })
    },

    remove(producto){
        this.$dialog.confirm({
            title: 'Eliminar producto',
            message: '¿Esta seguro de <strong>eliminar</strong> este producto? Esta accion no se puede deshacer.',
            confirmText: 'Eliminar',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: () => {
                this.$toast.open({message:'Producto eliminado',position: 'is-bottom',type: 'is-danger'})
                this.$http.delete('/api/Productos/'+producto.id).then((res) => {
                let vm = this
                vm.productos.splice(vm.productos.indexOf(producto), 1)
                });
            }
          })
    },
  },

  computed: {
    filteredProductos: function(){
      return this.productos.filter((producto) => {
        return producto.modelosId.match(this.filter.toLowerCase()) && producto.marcasId.match(this.fMarca.toLowerCase()) && producto.colorsId.match(this.fColor.toLowerCase()) && producto.tiposId.match(this.fTipo.toLowerCase());
      });
    }
  },
  created: function(){
    this.getProductos();
  }
};
</script>

<style lang="css" scoped>
  .inputBusqueda {
    width: 150px;
  }
</style>



