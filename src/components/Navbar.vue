<template>
<nav class="nav has-shadow" id="cssNav">
  <div class="container">
    <div class="nav-left">
      <figure class="image is-48x48" style="margin-right: 8px;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png">
        </figure>
    </div>
    <span class="nav-toggle">
    <span></span>
    <span></span>
    <span></span>
  </span>
    <div class="nav-right nav-menu">
      <a class="nav-item is-tab is-hidden-tablet is-active">Home</a>
      
      <a class="nav-item is-tab is-hidden-tablet" @click="contar()">Features</a>
      <a class="nav-item is-tab is-hidden-tablet">Pricing</a>
      <a class="nav-item is-tab is-hidden-tablet">About</a>
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
  methods: {
    logout(){
      this.$http.post('/api/Users/logout?access_token='+ this.$auth.getToken().token).then((res) => {
        this.$auth.destroyToken();
        this.$router.push('/');
      });
    }
  }
};
</script>

<style lang="css" scoped>

#cssNav{
background-color: #3c8dbc;
}
</style>