import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
// 导入elementUI
import ElementUI from 'element-ui'
import axios from 'axios'
Vue.config.productionTip = false
// 安装elementUI
Vue.use(ElementUI)
// 为axios挂载token请求头,需要使用request拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // console.log(config)
  return config;
});



// 全局挂在的baseURL
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 挂载axios
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
