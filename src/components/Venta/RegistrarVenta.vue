<template>
	<div class="container">
		<h2 class="has-text-centered title is-3"><span class="has-text-info">Registrar Nueva Venta</span></h2>
		<div class="card">
			<div class="card-content">
				<div class="columns">
					<div class="column is-2">
						<b-field label="Cliente">
			    		<b-select placeholder="Cliente" icon="user" v-model="dVenta.clienteId">
				      	<option v-for="cliente in clientes" :value="cliente.id" >{{ cliente.nombre }}</option>
				    	</b-select>
		    		</b-field>
					</div>
					<div class="column is-2">
						<b-field label="T. Pago">
						<b-select placeholder="Tipo de Pago" icon="credit-card" v-model="dVenta.tipo">
				      <option value="contado">Contado</option>
				      <option value="credito">Credito</option>
				    </b-select>
						</b-field>
					</div>
					<div class="column">
						<b-field label="Dirección">
						<b-input icon="globe" v-model="dVenta.direccion"></b-input>
					</b-field>
					</div>
					<div class="column is-2">
						<b-field label="Costo Envio">
						<div class="control has-icons-left has-icons-right">
					    <input class="input" type="number" min="0" step=".10" v-model.number="dVenta.costo_envio">
					    <span class="icon is-small is-left">
					      <i class="fa fa-money"></i>
					    </span>
					    <span class="icon is-small is-right">
					      <i class="fa fa-truck"></i>
					    </span>
					  </div>
					</b-field>
					</div>
					<div class="column is-3">
						<b-field label="Fecha">
						<div class="control has-icons-left">
					    <input class="input" type="date" v-model="dVenta.fecha_venta">
					    <span class="icon is-small is-left">
					      <i class="fa fa-calendar"></i>
					    </span>
					  </div>
					</b-field>
					</div>
				</div>
			</div>
		</div>
		<br>
		<MostrarStock @ventas="ventas = $event"></MostrarStock>
		<br>
		<PrintModal :ventas="ventas" :detalleVenta="dVenta"></PrintModal>
	</div>
</template>

<script>
import MostrarStock from '@/components/Venta/MostrarStock'
import PrintModal from '@/components/Venta/PrintModal'

export default {

  name: 'RegistrarVenta',
  components: { MostrarStock, PrintModal },

  data () {
    return {
    	clientes: [],
    	dVenta: {
    		clienteId: '',
    		tipo: '',
    		direccion: '',
    		costo_envio: 0,
    		fecha_venta: ''
    	},
    	ventas: [],
    	showProductos: false
    };
  },
  methods:{
  	getClientes(){
  		this.$http.get('/api/Clientes').then(res => {
  			this.clientes = res.body
  		})
  	},
  	createDVenta(){
  		this.$http.post('/api/DetalleVenta', this.dVenta).then(res => {
  			this.dVenta.id = res.body.id
  			console.log(this.dVenta.id)
  			this.showProductos = true //cambiar a falso cuando termine
  		})
  	}
  },
  created: function(){
  	this.getClientes()
  }
};
</script>

<style lang="css" scoped>
</style>