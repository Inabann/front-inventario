// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import Auth from './services/Auth.js'

Vue.config.productionTip = false

Vue.use(vueResource)

Vue.use(Auth)

router.beforeEach(
	(to, from, next) => {
		console.log(Vue.auth.getToken());
		console.log(Vue.auth.isAuthd());
		
		if(to.matched.some(record => record.meta.forVisitors)) {
			if(Vue.auth.isAuthd()){
				if(to.path !== '/home'){
					next('/home')
				}
				
			} else{
				next()
			}
		} else {
			next()
		}


		if(to.matched.some(record => record.meta.forAuth)) {
			if(!Vue.auth.isAuthd()){
				if(to.path !== '/'){
					next('/')
				}
				
			} else{
				next()
			}
		} else {
			next()
		}
	}
);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
