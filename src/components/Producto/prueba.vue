<template>
    <div>
    	<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
<input v-model="selected" type="text" name="" >
   </div>
</template>

<script>

export default {

  name: 'cliente',

  data () {
    return {
    	selected: [],
		options:[
		      { text: 'One', value: 'A' },
		      { text: 'Two', value: 'B' },
		      { text: 'Three', value: 'C' }
    	]
    };
  },

  created: function(){
    let arr = [];
    this.$http.get('/api/Clientes').then((res) => {
      arr = res.body;
      this.clientes = arr;
    });
  }
};
</script>
<style type="text/css">

</style>
