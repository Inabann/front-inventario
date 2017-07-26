<template>
    <div class="container">
      <div class="columns">
        <div class="column"> 
        <h1 class="title is-1"><b>SEPARA POR COMPONENTES!!! >:v</b></h1>          
         <h1 class="title is-4"><b>Registrar Producto</b></h1>
         <div class="column is-4">
              <div class="field is-horizontal">
 
             		 <label class="label">Color ID</label>
		              <div class="control">
		                <input class="input" type="text" >
		              </div>

             		 <label class="label">Selecciona</label>
             		 <div class="control">
						  <div class="select">
						    <select>
						      <option v-for="color in colores" v-bind:value="color.nombre">{{color.nombre}}</option>
						    </select>
						  </div>
						</div>
            </div>
            <div class="field is-horizontal">
 
             		 <label class="label">Marca ID</label>
		              <div class="control">
		                <input v-model="marcas2" class="input" value="" type="text" >
		               
		              </div>

             		 <label class="label">Selecciona</label>
             		 <div class="control">
						<div class="select">
						 <select v-model="marcas2">
						 <option v-for="marca in marcas" v-bind:value="marca.nombre">{{marca.nombre}}</option>
						  </select>
						   <!--  <span>Selected: {{ marcas2 }}</span> -->
						 </div>

					</div>
					
            </div>
              <div class="field is-horizontal">
 
             		 <label class="label">Tipo ID</label>
		              <div class="control">
		                <input class="input" type="text" >
		              </div>

             		 <label class="label">Selecciona</label>
             		 <div class="control">
						  <div  class="select">
						    <select>
						      <option ></option>
						    </select>
						  </div>
						</div>
            </div>
             <div class="field is-horizontal">
 
             		 <label class="label">Modelo ID</label>
		              <div class="control">
		                <input class="input" type="text" >
		              </div>

             		 <label class="label">Selecciona</label>
             		 <div class="control">
						  <div class="select">
						    <select>
						      <option ></option>
						    </select>
						  </div>
						</div>
            </div>
             <div class="field">
              <label class="label is-small">Cantidad</label>
              <div class="control">
                <input class="input" type="text" >
              </div>
            </div>
             <div class="field">
              <label class="label is-small">Precio Unitario</label>
              <div class="control">
                <input class="input" type="text" >
              </div>
            </div>
             <div class="field">
              <label class="label is-small">Fecha de Ingreso</label>
              <div class="control">
                <input class="input" type="date" >
              </div>
            </div>
              
            <button class="button is-primary" @click="agregar">Guardar</button>
           </div>
            <h1 class="title is-4"><b>Lista de Productos</b></h1>
        	<table class="table">
              <thead>
                <tr>
                  <th>Color</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Fecha</th>
                  <th>Acciones</th>

                </tr>
              </thead>
              <tbody>
                <tr >
                  <td>rojo</td>
                  <td>samsung</td>
                  <td>modelo 1</td>
                  <td>tipo 1</td>
                  <td>23</td>
                  <td>16</td>
                  <td>25-07-2017</td>
                  <td>
                    <a class="button is-warning is-small">Editar</a>
                    <a class="button is-danger is-small" @click="eliminar(cliente)">Eliminar</a>
                  </td>
                </tr>
                  <tr >
                  <td>azul</td>
                  <td>samsung</td>
                  <td>modelo 2</td>
                  <td>tipo 1</td>
                  <td>15</td>
                  <td>16</td>
                  <td>22-07-2017</td>
                  <td>
                    <a class="button is-warning is-small">Editar</a>
                    <a class="button is-danger is-small" @click="eliminar(cliente)">Eliminar</a>
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

  name: 'producto',

  data () {
    return {
    	marcas2: [],
    	marcas: [],
      colores: [],
      color: '',
    	nuevo: {
    		dni_ruc: '',
    		nombre:'',
    		telefono:''
    	}
    };
  },

  methods:{
    agregar(){
      this.$http.post('/api/Clientes', this.nuevo).then((res) => {
        console.log(res.body);
        this.clientes.push(res.body);
      });
    },
    getClientes(){
      this.$http.get('/api/Clientes').then((res) => {
        this.clientes = res.body;
      });
    },
    eliminar(cliente){
      let id = cliente.id
      this.$http.delete('/api/Clientes/'+id).then((res) => {
        let vm = this
        vm.clientes.splice(vm.clientes.indexOf(cliente), 1)
      });
    }
   
  },
  created: function(){
    let arraymarca = [];
    
    this.$http.get('/api/Marcas').then((res) => {
      arraymarca = res.body;
      this.marcas = arraymarca;
    });
    this.$http.get('/api/Colors').then((res) => {
      let vm = this
      console.log(res)
      vm.colores = res.body
    });
  }

};
</script>
<style type="text/css">

</style>
