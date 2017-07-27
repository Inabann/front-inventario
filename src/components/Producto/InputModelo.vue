<template>


		<div class="field has-addons">
		  <div class="field-body">
		  <p class="control" v-if="!actions">
		    <input class="input" type="text" :placeholder="'Nuevo ' + atrib" v-model="editModelo.nombre">
		  </p>
		  <p class="control" v-if="actions">
		    <a class="button" @click="actions = !actions">
					<span class="icon is-small">
			      <i class="fa fa-pencil-square-o"></i>
			    </span>
		    </a>
		  </p>
		  <p class="control" v-if="!actions">
		    <a class="button" @click="addModelo">
		      <span class="icon is-small">
			      <i class="fa fa-plus"></i>
			    </span>
		    </a>
		  </p>
		  <p class="control" v-if="!actions">
		    <a class="button" @click="removeModelo(editModelo)">
		      <span class="icon is-small">
			      <i class="fa fa-minus"></i>
			    </span>
		    </a>
		  </p>
		  <p class="control" v-if="!actions">
		    <a class="button" @click="actions = !actions">
		      <span class="icon is-small">
			      <i class="fa fa-reply"></i>
			    </span>
		    </a>
		  </p>
		  <p class="control" v-if="actions">
		    <span class="select">
		      <select v-model="editModelo" @change="onChange">
		        <option selected>{{ atrib }}</option>
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
    	editModelo: {}
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
    		vm.modelos.push(res.body);
    		vm.editModelo = res.body;
    		vm.actions = !vm.actions;
    	});
    },
    removeModelo(modelo){
    	this.$http.delete('/api/'+this.atrib+'/'+modelo.id).then((res) => {
        let vm = this
        vm.modelos.splice(vm.modelos.indexOf(modelo), 1)
        vm.actions = !vm.actions
        vm.editModelo = '';
      });
    },
    onChange(event){
    	this.$emit('getId', this.editModelo.id)
    }
  },
  created: function(){
  	this.getModelos();
  }
};
</script>

<style lang="css" scoped>
</style>