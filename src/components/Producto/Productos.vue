<template>
  <div class="container">
    <button class="button is-info is-medium" @click="isComponentModalActive = true; sendProducto = null ">Nuevo Producto</button><br><br>
    <b-modal :active.sync="isComponentModalActive" has-modal-card>
        <modal-form :prodcutos="productos" :sendProducto="sendProducto" @newList="productos = $event"></modal-form>
    </b-modal>

    <h1 class="has-text-centered title"><span class="has-text-info">Productos Ingresados</span></h1>
    <b-field grouped>
      <b-input placeholder="Buscar modelos..." type="search" icon-pack="fa" icon="search" v-model="filter"></b-input>
      <b-input placeholder="Buscar marca... aun no funciona" type="search" icon-pack="fa" icon="search"></b-input>
      <b-input placeholder="Buscar color... aun no funciona" type="search" icon-pack="fa" icon="search"></b-input>
      <b-input placeholder="Buscar tipo... aun no funciona" type="search" icon-pack="fa" icon="search"></b-input>
    </b-field>
    <b-table :data="filteredProductos" :mobile-cards="true" :paginated="true" :per-page="10" >

    <template scope="props">
      <b-table-column field="modelosId" label="Modelo"  sortable>
        {{ props.row.modelosId }}
      </b-table-column>

      <b-table-column field="marcasId" label="Marca" sortable>
        {{ props.row.marcasId }}
      </b-table-column>

      <b-table-column field="colorsId" label="Color" sortable>
        {{ props.row.colorsId }}
      </b-table-column>

      <b-table-column field="tiposId" label="Tipo" sortable>
        {{ props.row.tiposId }}
      </b-table-column>
      <b-table-column field="cantidad" label="Cantidad" numeric sortable>
        {{ props.row.cantidad }}
      </b-table-column>
      <b-table-column field="precio_uni" label="P. Uni" numeric>
        {{ props.row.precio_uni }}
      </b-table-column>
      <b-table-column field="fecha_ingreso" label="F. Ingreso" sortable>
        <span class="tag is-success">
          <!-- {{ new Date(props.row.fecha_ingreso).toLocaleDateString() }} -->
          {{ props.row.fecha_ingreso | moment("add","1 days","YYYY / MM / DD") }}
        </span>
      </b-table-column>
      <b-table-column label="Opciones" >
        <a class="button is-warning is-small">Editar???</a>
        <a class="button is-danger is-small" @click="remove(props.row)" >Eliminar</a>
      </b-table-column>
    </template>
    <div slot="empty" class="has-text-centered">
      This table is empty!
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
        console.log(res.body)
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
        return producto.modelosId.match(this.filter);
        //para usar mas de un filtro usar ejemplo ;v
        //blog.title.match(search1) || blog.content.match(search2)
      });
    }
  },
  created: function(){
    this.getProductos();
  }
};
</script>

<style lang="css" scoped>
</style>-->



