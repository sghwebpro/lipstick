
import Vue from 'vue';
import { Api } from '@/api/api'
import router from '@/js/router';
import store from '@/js/store';
import { Toast } from 'vant';
Vue.use(Toast);
export class userInfo{
  constructor(){
    this.info = {}
  }

  getUserInfo(){
   Api.getInstance().getUserInfo({
    })
    .then((res)=>{
       this.info = res.data
       if(res.data.Status==200){
        store.state.isStatus = 1
        store.dispatch('updateUserInfo',res.data.Result)
       }else if(res.data.Status==403){
         router.push({path:'/login.html'})
       }else{
          Toast(res.data.Result.Message)
        }
    })
  }
}