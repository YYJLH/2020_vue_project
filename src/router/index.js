import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {path: '/login', component: Login},
    {
      path: '/home',
      component: Home,
      redirect: '/welcome', //只要进入了home页面in,立即重定向到welcome页面
      children:[
        {path:'/welcome',component:Welcome}
      ]
    }    
  ]
})
router.beforeEach((to,from,next) =>{
  if(to.path =='/login') return next()
  const tokenStr = sessionStorage.getItem('token')
  // console.log(tokenStr)
  // 如果token存在直接放行
  if(tokenStr) return next()
  // 否则强制跳转登陆页面
  next('/login')
})
export default router
