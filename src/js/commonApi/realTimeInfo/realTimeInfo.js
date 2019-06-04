import Vue from 'vue';
import { Api } from '@/api/api'
import store from '@/js/store';
import { Toast } from 'vant';
Vue.use(Toast);
export class realTimeInfo{
  constructor(){
  }
  getRealTime(){
    Api.getInstance().getRealTime()
    .then((res)=>{
      if(res.data.Status==200){
        store.dispatch('updaterealTime',res.data.Result)
      }else{
          Toast(res.data.Result.Message)
        }
    })
  }
}