import { userInfo } from '@/js/commonApi/userInfo/userInfo';
import { realTimeInfo } from '@/js/commonApi/realTimeInfo/realTimeInfo';
import Vue from 'vue';
const commonApi = {
  install:function(){
    this.userinfo  = new userInfo()
    this.realtime = new realTimeInfo()
  }
}
Vue.prototype.$commonapi = commonApi
export default commonApi