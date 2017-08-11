<template>
<div>
	<button class="button is-success is-medium" @click="isCardModalActive = true"><span class="icon"><i class="fa fa-shopping-cart"></i></span><span>Listo?</span></button>
	<b-modal :active.sync="isCardModalActive" :width="640">
		<div class="modal-card">
			<header class="modal-card-head">
        <p class="modal-card-title">Vista Previa Nota de pedido</p>
        <button class="delete" @click="isCardModalActive = false"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
        	<h1>Nota Pedido: N° 029182</h1>
        	<p>hay q poner los demoas datos de la nota de pedido</p>
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
				        <td>{{ producto.modelo +' ' +producto.color }}</td>
				        <td>{{ producto.cantidad }}</td>
				        <td> 50 </td>
				      </tr>
				    </tbody>
				    <tfoot>
					    <tr>
					      <th></th>
					      <th><abbr title="Played">Total:</abbr></th>
					      <th>$100</th>
					      
					    </tr>
					  </tfoot>
				  </table>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="isCardModalActive = false">Cerrar</button>
        <button class="button is-primary" @click="guardar">Guardar e Imprimir</button>
      </footer>
		</div>
	</b-modal>
</div>
</template>

<script>
export default {
	props: ['detalleVenta', 'ventas'],
	name: 'PrintModal',

	data () {
		return {
			isCardModalActive: false,
			dvId: '',
		};
	},
	methods:{
		setDV(){
			this.detalleVenta.total = 50
			//falta calcular el total de la suma de los productos y el costo de envio
			
		},
		guardar(){
			this.setDV()
			this.$http.post('/api/DetalleVenta', this.detalleVenta).then(res => {
				this.dvId = res.body.id
				this.ventas.forEach(venta =>{
					this.saveVenta(venta)
					this.$http.post('/api/Productos/reducir', venta).catch(err => console.log(err))
				})
			})
		},
		saveVenta(venta){
			let newVenta = {
		  	modelosId : venta.modelo,
		  	colorsId : venta.color,
			  marcasId: venta.marca,
			  tiposId: venta.tipo,
			  subtotal: 10,
			  cantidad: venta.cantidad
		  }
			newVenta.detalleVentaId = this.dvId
		  this.$http.post('/api/Venta', newVenta).catch(err => console.log(err))
		}
	}
};
</script>

<style lang="css" scoped>
</style>