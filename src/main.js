import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
<<<<<<< HEAD
Vue.prototype.$bus = new Vue()
=======
>>>>>>> f142d536a34deb6a048aef49983de911444270a1

new Vue({
  render: function (h) { return h(App) },
  router
}).$mount('#app')
