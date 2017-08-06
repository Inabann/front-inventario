<template>
<nav class="navbar" id="cssNav">
  <div class="navbar-brand">
    <a class="navbar-item" href="http://bulma.io">
      <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </a>
    <div class="navbar-burger burger" v-bind:class ="{'is-active': isActive}" @click="isActive=!isActive" data-target="navMenuExample">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navMenuExample" class="navbar-menu" v-bind:class ="{'is-active': isActive}">
  <div class="navbar-item has-dropdown is-hoverable">
       <!--  <a class="navbar-link  is-active" href="/documentation/overview/start/">
          Docs
        </a>
        <div class="navbar-dropdown ">
          <a class="navbar-item " href="/documentation/overview/start/">
            Overview
          </a>
          <a class="navbar-item " href="http://bulma.io/documentation/modifiers/syntax/">
            Modifiers
          </a>
          <a class="navbar-item " href="http://bulma.io/documentation/grid/columns/">
            Grid
          </a>
        
        </div>-->
      </div>

    <div class="navbar-end">
    <!--  <a class="navbar-item is-hidden-desktop-only" href="https://github.com/jgthms/bulma" target="_blank">
        Github
      </a>
      <a class="navbar-item is-hidden-desktop-only" href="https://twitter.com/jgthms" target="_blank">
        Twitter
      </a> -->
      
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <a class="tw-button button is-dark"  href="">
  <span class="icon">
    <i class="fa fa-twitter"></i>
  </span>
  <span>
    Perfil
  </span>
</a>
          </p>
          <p class="control">
            <a class="button is-dark" href="https://github.com/jgthms/bulma/archive/0.5.0.zip">
              <span class="icon">
                <i class="fa fa-facebook"></i>
              </span>
              <span>Salir</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {

  name: 'Navbar',
 data(){
  return {
    isActive:false,
  }
 },
  methods: {
    logout(){
      this.$http.post('/api/Users/logout?access_token='+ this.$auth.getToken().token).then((res) => {
        this.$auth.destroyToken();
        this.$router.push('/');
      });
    }
  },
 
};
</script>

<style lang="css" scoped>

#cssNav{
background-color: #3c8dbc;
}
</style>