<template>
<div>
	<button class="button is-primary is-small" @click="isCardModalActive = true"><span class="icon is-small"><i class="fa fa-search"></i></span></button>
	<b-modal :active.sync="isCardModalActive" :width="640">
		<div class="modal-card">
      <section class="modal-card-body">
        <div class="content is-small">
        	<div class="columns is-centered">
        		<div class="column is-4 is-offset-2" >
        			<img src="../../assets/logo.png">
        		</div>
        		<div class="column">
        			<h3 ><strong>Nota de Pedido</strong></h3>
        		</div>
        	</div>
        	<p class="has-text-centered">Av. Argentina 458 - Int. <strong>B-70-71 G-84</strong> Mesa Redonda - Lima <span class="icon is-small is-success"><i class="fa fa-whatsapp"></i></span> <strong>927791715</strong></p>
        	<p class="has-text-centered">Horario de Atencion: (Lunes a Sábado 10 am. a 8 pm. Domingos de 10 am. a 5 pm.)</p>
        	<div class="columns">
        		<div class="column">
        			<p class="has-text-right">Dirección: {{detalleVenta.direccion | capitalize}} </p>
        		</div>
        		<div class="column">
        			<p > Fecha: {{ detalleVenta.fecha_venta | moment("add","1 days","YYYY / MM / DD") }}</p>
        		</div>
        	</div>
        	<table>
				    <thead>
				      <tr>
				      	<th>Cant</th>
				        <th>Producto</th>
				        <th>P Unit</th>
				        <th>Sub Total</th>
				      </tr>
				    </thead>
				    <tbody>
				      <tr v-for="producto in ventas">
				      	<td>{{ producto.cantidad }}</td>
				        <td>{{ producto.modelosId +' ' +producto.colorsId +' '+ producto.tiposId +' '+ producto.marcasId  | capitalize }}</td>
				        <td>{{ producto.precio_uni }}</td>
				        <td>{{ producto.subtotal }}</td>
				      </tr>
				    </tbody>
				    <tfoot>
				    	<tr>
				    		<th></th>
				    		<th>Costo Envio</th>
				    		<th></th>
				    		<th>{{ detalleVenta.costo_envio }}</th>
				    	</tr>
					    <tr>
					      <th></th>
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
  name: 'VerVentaSinCliente',

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