<template>
		<div class="field has-addons">
		  <div class="field-body">
		  <p class="control" v-if="!actions">
		    <input class="input" type="text" v-model="editModelo.nombre">
		  </p>
		  <p class="control" v-show="actions">
        <b-tooltip label="Opciones" type="is-info" animated>
          <a class="button" @click="actions = !actions">
            <span class="icon is-small">
              <i class="fa fa-pencil-square-o"></i>
            </span>
          </a>
        </b-tooltip>
		  </p>
		  <p class="control" v-if="!actions">
		    <b-tooltip label="Agregar" type="is-success" animated>
          <a class="button" @click="addModelo">
            <span class="icon is-small">
              <i class="fa fa-plus"></i>
            </span>
          </a>
        </b-tooltip>     
		  </p>
		  <p class="control" v-if="!actions">
        <b-tooltip label="Eliminar" type="is-danger" animated>
          <a class="button" @click="removeModelo(editModelo)">
            <span class="icon is-small">
              <i class="fa fa-minus"></i>
            </span>
          </a>
        </b-tooltip>
		  </p>
		  <p class="control" v-if="!actions">
        <b-tooltip label="Atras" type="is-warning" animated>
          <a class="button" @click="actions = !actions">
            <span class="icon is-small">
              <i class="fa fa-reply"></i>
            </span>
          </a>
        </b-tooltip>
		    
		  </p>
		  <p class="control" v-if="actions">
		    <span class="select">
		      <select v-model="editModelo" @change="onChange">
		        <option v-for="modelo in modelos" :value="modelo">{{ modelo.nombre }}</option>
		      </select>
		    </span>
		  </p>
		</div>
	</div>
</template>

<script>
export default {

  name: 'InputModelo',
  props:['atrib'],

  data () {
    return {
    	actions: true,
    	modelos: [],
    	editModelo: {
    		nombre: ''
    	},
    	newModelo: {
    		nombre: ''
    	}
    };
  },
  methods:{
  	getModelos(){
      this.$http.get('/api/'+this.atrib).then((res) => {
        let vm = this;
        vm.modelos = res.body;
      });
    },
    addModelo(){
    	this.$http.post('/api/'+this.atrib, {nombre: this.editModelo.nombre}).then((res)=>{
    		let vm = this;
    		vm.editModelo = res.body;
    		vm.modelos.push(res.body);
    		vm.$emit('getId', vm.editModelo.nombre);
    		vm.actions = !vm.actions;
    	});
    },
    removeModelo(modelo){
    	this.$http.delete('/api/'+this.atrib+'/'+modelo.nombre).then((res) => {
        let vm = this
        vm.modelos.splice(vm.modelos.indexOf(modelo), 1)
        vm.actions = !vm.actions
        vm.editModelo = '';
      });
    },
    onChange(event){
    	this.$emit('getId', this.editModelo.nombre)
    }
  },
  created: function(){
  	this.getModelos();
  }
};
</script>

<style lang="css" scoped>
</style>