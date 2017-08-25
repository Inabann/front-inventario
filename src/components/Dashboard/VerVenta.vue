<template>
<div>
	<button class="button is-primary is-small" @click="isCardModalActive = true"><span class="icon is-small"><i class="fa fa-search"></i></span></button>
	<b-modal :active.sync="isCardModalActive" :width="640">
		<div class="modal-card">
      <section class="modal-card-body">
        <div class="content">
        	<p class="has-text-right">Fecha: {{ detalleVenta.fecha_venta | moment("add","1 days","YYYY / MM / DD") }}</p>
        	<table>
				    <thead>
				      <tr>
				        <th>Producto</th>
				        <th>Cantidad</th>
				        <th>Sub Total</th>
				      </tr>
				    </thead>
				    <tbody>
				      <tr v-for="producto in ventas">
				        <td>{{ producto.modelosId +' ' +producto.colorsId +' '+ producto.tiposId +' '+ producto.marcasId  | capitalize }}</td>
				        <td>{{ producto.cantidad }}</td>
				        <td>{{ producto.subtotal }}</td>
				      </tr>
				    </tbody>
				    <tfoot>
				    	<tr>
				    		<th></th>
				    		<th>Costo Envio</th>
				    		<th>{{ detalleVenta.costo_envio }}</th>
				    	</tr>
					    <tr>
					      <th></th>
					      <th><abbr title="Played">Total:</abbr></th>
					      <th>{{ detalleVenta.total }}</th>	      
					    </tr>
					  </tfoot>
				  </table>
        </div>
      </section>
		</div>
	</b-modal>
</div>
</template>

<script>
export default {
	props: ['detalleVenta'],
  name: 'VerVenta',

  data () {
    return {
    	isCardModalActive: false,
			dvId: '',
			ventas: []
    };
  },
	methods:{
		getVentas(){
			this.$http.get('/api/DetalleVenta/'+this.detalleVenta.id+'/venta').then(res => this.ventas = res.body)
		}
	},
	mounted(){
		this.getVentas()
	}
};
</script>

<style lang="css" scoped>
</style>