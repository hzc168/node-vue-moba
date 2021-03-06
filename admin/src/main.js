import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import http from './http.js'

import router from './router.js'

Vue.config.productionTip = false
Vue.prototype.$http = http

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + "/upload"
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ` + localStorage.token || ''
      }
    }
  }
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
