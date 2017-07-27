<template>
<nav class="nav has-shadow">
  <div class="container">
    <div class="nav-left">
      <a class="nav-item is-tab is-hidden-mobile is-active">Home</a>
      <a class="nav-item is-tab is-hidden-mobile">Features</a>
      <a class="nav-item is-tab is-hidden-mobile">Pricing</a>
      <a class="nav-item is-tab is-hidden-mobile">About</a>
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
        <figure class="image is-16x16" style="margin-right: 8px;">
          <img src="http://bulma.io/images/jgthms.png">
        </figure>
        Profile
      </a>
      <a class="nav-item is-tab" @click="logout()">Log out</a>
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
</style>