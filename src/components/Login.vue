<template>
  <section class="hero is-fullheight is-dark is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-4">
            <h1 class="title">
              Login
            </h1>
            <div class="box">
              <label class="label">Username</label>
              <p class="control has-icons-left">
                <input class="input" type="text" placeholder="usuario" v-model="cred.username">
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
              <label class="label">Password</label>
              <p class="control has-icons-left">
                <input class="input" type="password" placeholder="●●●●●●●" v-model="cred.password">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </p>
              
              <hr>
              <p class="control">
                <button class="button is-primary" @click="login()">Login</button>
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
 </template>

<script>


export default {

  name: 'Login',

  data () {
    return {
    	cred: {
        username: '',
        password: ''
      }
    };
  },
  methods:{
    login(){
      this.$http.post('/api/usuarios/login', this.cred).then((res) => {
        console.log(res);
        this.$auth.setToken(res.body.id, res.body.userId, res.body.created, res.body.ttl);
        this.$router.push('/home');
      });
    }
  }
};
</script>

<style lang="css" scoped>
</style>