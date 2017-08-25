<template>
<div>
	<button class="button is-success is-medium" @click="isCardModalActive = true"><span class="icon"><i class="fa fa-shopping-cart"></i></span><span>Listo</span></button>
	<b-modal :active.sync="isCardModalActive" :width="640">
		<div class="modal-card">
			<header class="modal-card-head" v-show="!vistaPrevia">
        <p class="modal-card-title">Vista Previa Nota de pedido</p>
        <button class="delete" @click="isCardModalActive = false"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
        	<p>Fecha: {{ detalleVenta.fecha_venta }}</p>
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
				        <td>{{ producto.modelo +' ' +producto.color +' '+ producto.tipo +' '+ producto.marca  | capitalize }}</td>
				        <td>{{ producto.cantidad }}</td>
				        <td>{{ producto.sub_total }}</td>
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
					      <th>{{ total }}</th>
					      
					    </tr>
					  </tfoot>
				  </table>
        </div>
      </section>
      <footer class="modal-card-foot" v-show="!vistaPrevia">
        <button class="button" type="button" @click="isCardModalActive = false">Cerrar</button>
        <button class="button is-primary" @click="guardar">Guardar</button>
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
			total : 0,
			vistaPrevia: false
		};
	},
	methods:{
		setDV(){
			this.detalleVenta.total = this.total		
		},
		setTotal(){
			this.ventas.forEach(producto => {
				this.total += producto.sub_total
			})
			this.total += this.detalleVenta.costo_envio
		},
		guardar(){
			this.setDV()
			this.$http.post('/api/DetalleVenta', this.detalleVenta).then(res => {
				this.dvId = res.body.id
				this.ventas.forEach(venta =>{
					this.saveVenta(venta)
					this.$http.post('/api/Productos/reducir', venta).catch(err => console.log(err))
				})
				this.vistaPrevia = true
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
			newVenta.fecha_venta = this.detalleVenta.fecha_venta
		  this.$http.post('/api/Venta', newVenta).catch(err => console.log(err))
		}
	},
	watch:{
		isCardModalActive(){
			this.total = 0
			this.setTotal()
		}
	}
};
</script>

<style lang="css" scoped>
</style>