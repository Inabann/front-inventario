<template>
<nav class="nav has-shadow hero" id="cssNav">
  <!-- LA PTMR LANCHIPA DEJA DE MODIFICAR EL NAVBAR; SI VAS A HACERLO SUBE UNO FUNCIONAL >:V -->
  <div class="container is-fluid">
    <div class="nav-left">
      <a class="nav-item" @click="changeNav">
        <span class="icon is-white">
          <i class="fa fa-bars"></i>
        </span>
      </a>
        <img src="../assets/logo.png">
    </div>
    
    
    <div class="nav-right nav-menu" style="margin-right: 40px;">
      <a class="nav-item is-tab"><span class="has-text-white">{{ username }}</span></a>
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
      hideNav : false,
      at: '',
      username: ''
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
  },
  created(){
    this.at = this.$auth.getToken()
    this.$http.get('/api/usuarios/'+this.at.userId+'?access_token='+this.at.token).then( res => this.username = res.body.username)
  }
};
</script>

<style lang="css" scoped>
#cssNav{
background-color: #0374BA;
}

</style>