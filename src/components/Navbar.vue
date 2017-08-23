<template>
<nav class="nav has-shadow hero is-dark">
  <!-- LA PTMR LANCHIPA DEJA DE MODIFICAR EL NAVBAR; SI VAS A HACERLO SUBE UNO FUNCIONAL >:V -->
  <div class="container is-fluid">
    <div class="nav-left">
      <a class="nav-item" @click="changeNav">
        <span class="icon">
          <i class="fa fa-bars"></i>
        </span>
      </a>
        <img src="../assets/logo.png">
    </div>
    
    
    <div class="nav-right nav-menu" style="margin-right: 40px;">
      <a class="nav-item is-tab">
        <figure class="image is-24x24" style="margin-right: 8px;">
          <img src="https://image.freepik.com/iconos-gratis/perfil-silueta-usuario_318-40557.jpg">
        </figure><span class="has-text-white">Perfil</span> 
      </a>
      <a class="nav-item is-tab" @click="logout()"><span class="has-text-white">Cerrar Sesión</span></a>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  data (){
    return {
      hideNav : false
    }
  },
  methods: {
    logout(){
      this.$http.post('/api/Users/logout?access_token='+ this.$auth.getToken().token).then((res) => {
        this.$auth.destroyToken();
        this.$router.push('/');
      });
    },
    changeNav(){
      this.hideNav = !this.hideNav
      this.$emit('statusNav', this.hideNav)
    }
  }
};
</script>

<style lang="css" scoped>
#cssNav{
background-color: #3c8dbc;
}

</style>