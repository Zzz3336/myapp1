import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

require('./assets/css/style.css')

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
