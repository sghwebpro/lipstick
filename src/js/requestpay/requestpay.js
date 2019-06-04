import Vue from 'vue';
import { Api } from '@/api/api'
import { Toast } from 'vant';
Vue.use(Toast)

export class requestpay{
  static getInstance() {
    if(!requestpay.instance){
      requestpay.instance = new requestpay();
    }
    return requestpay.instance;
  }
  constructor(){
  }
  pay(money){
    Api.getInstance().payMoney({money:money})
    .then((res)=>{
      if(res.data.Status==200){
        window.open('/paycenter.html?orderid='+res.data.Result.OrderId+'&returnurl=/index.html','_self')     
      }else{
        Toast(res.data.Result.Message)
      }
    })
  }
}