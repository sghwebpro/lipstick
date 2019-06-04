import 'amfe-flexible';
// import wx from  '@/js/wx/jweixin-1.4.0';
import Vue from 'vue';
import router from '@/js/router';
import store from '@/js/store';
import App from './App.vue';
import  commonApi  from './js/commonApi';
import "./style/main.less"
// console.log(process.env.NODE_ENV)
import { List,Dialog,Toast,Swipe, SwipeItem,Checkbox, CheckboxGroup,Cell,CellGroup  } from 'vant';
Vue.use(List).use(Toast).use(Dialog).use(Swipe).use(SwipeItem)
   .use(Checkbox).use(CheckboxGroup).use(Cell).use(CellGroup);
Vue.use(commonApi);

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
