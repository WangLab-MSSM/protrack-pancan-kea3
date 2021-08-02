import Vue from 'vue'

import App from './App.vue'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import AsyncComputed from 'vue-async-computed'


Vue.config.productionTip = false

Vue.use(AsyncComputed)
Vue.use(Buefy)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
