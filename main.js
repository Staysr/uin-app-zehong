import Vue from 'vue'
import App from './App'
import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import adddevice from './pages/adddevice/home.vue'
Vue.component('adddevice',adddevice)

import userme from './pages/userme/userme.vue'
Vue.component('userme',userme)

import search from './pages/search/home.vue'
Vue.component('search',search)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



