import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'

Vue.config.productionTip = false

import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
import 'swiper/swiper.scss'

import Card from './components/Card.vue'
Vue.component('m-card', Card)

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
