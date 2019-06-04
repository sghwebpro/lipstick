
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
const Routers = [
  {
    path:'/index.html',
    component: (resolve)=>require(['@/view/index/index.vue'],resolve),
  },
  {
    path:'/',
    component: (resolve)=>require(['@/view/index/index.vue'],resolve),
  },
  {
    path:'/login.html',
    component: (resolve)=>require(['@/view/login/login.vue'],resolve),
  },
  {
    path:'/personal.html',
    component: (resolve)=>require(['@/view/personal/personal.vue'],resolve),
  },
  {
    path:'/myteam.html',
    component: (resolve)=>require(['@/view/myteam/myteam.vue'],resolve),
  },
  {
    path:'/withdraw.html',
    component: (resolve)=>require(['@/view/withdraw/withdraw.vue'],resolve),
  },
  {
    path:'/paymoney.html',
    component: (resolve)=>require(['@/view/paymoney/paymoney.vue'],resolve),
  },
  {
    path:'/withdrawlog.html',
    component: (resolve)=>require(['@/view/withdrawlog/withdrawlog.vue'],resolve),
  },
  {
    path:'/myteamlog.html',
    component: (resolve)=>require(['@/view/myteamlog/myteamlog.vue'],resolve),
  },
  {
    path:'/myorder.html',
    component: (resolve)=>require(['@/view/myorder/myorder.vue'],resolve),
  },
  {
    path:'/sendredpack.html',
    component: (resolve)=>require(['@/view/sendredpack/sendredpack.vue'],resolve),
  },
  {
    path:'/share.html',
    component: (resolve)=>require(['@/view/share/share.vue'],resolve),
  },
  {
    path:'/complain.html',
    component: (resolve)=>require(['@/view/complain/complain.vue'],resolve),
  },
  {
    path:'/spread.html',
    component: (resolve)=>require(['@/view/spread/spread.vue'],resolve),
  },
  {
    path:'/',
    redirect:'/index.html',
  }
]
const RouterConfig = {
  mode: 'history',
  routes:Routers
}
const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
   let str = to.fullPath
   if(str.indexOf('spread=1')>0){
     next({path:'/spread.html'})
   }else if(str.indexOf('redpack=1')>0){
    next({path:'/sendredpack.html'})
   }else{
     next()
   }
})
export default router;