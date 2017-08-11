<template>
<pre>
hola
	{{ ventas }}
</pre>
</template>

<script>
export default {

  name: 'Ventas',

  data () {
    return {
    	ventas: []
    };
  },
  methods: {
  	getVentas(){
  		this.$http.get('/api/DetalleVenta').then(res => this.ventas = res.body).catch(err => console.log(err))
  	}
  },
  created: function(){
  	this.getVentas()
  }
};
</script>

<style lang="css" scoped>
</style>