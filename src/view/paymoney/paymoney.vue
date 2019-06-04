<template>
  <div class="paymoney">
    <div class="paymoney__tit">
      <div>充值金额</div>
    </div>
    <div class="paymoney__money">
      <div>￥</div><input type="Number" v-model="putmoney" placeholder="0"/>
    </div>
    <div class="paymoney__btn" id="paymoneytap" @click="paymoneytap">
      确认
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { requestpay } from '@/js/requestpay/requestpay'
import { Toast } from 'vant';
Vue.use(Toast)
export default {
  name:'paymoney',
  data(){
    return {
      putmoney:''
    }
  },
  methods:{
    paymoneytap(){
      if(this.putmoney>0){
        requestpay.getInstance().pay(this.putmoney)
      }else{
        Toast('请输入金额')
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .paymoney{
    display:flex;
    flex-direction: column;
    align-items: center;
    width:355px;
    border-radius:6px;
    padding-bottom: 15px;
    margin:10px auto;
    background: #fff;
    &__tit{
      display:flex;
      align-items: center;
      width:355px;
      height: 45px;
      div{
        display:flex;
        justify-content: center;
        width:80px;
        font-size:16px;
        color:#333;
      }
    }
    &__money{
      display:flex;
      align-items: flex-end;
      width:337px;
      margin-top: 50px;
      border-bottom: 1px solid #f5f5f5;
      div{
        font-size:40px;
        transform: translate(0,-12px);
      }
      input{
        font-size:65px;
        color:#666;
        font-weight:700;
        width:200px;
        height: 80px;
        border:0;
      }
    }
    &__btn{
      display:flex;
      justify-content: center;
      align-items: center;
      width:337px;
      height: 45px;
      font-size:17px;
      border-radius:6px;
      color:#fff;
      margin-top: 15px;
      background: #46cc68;
    }
  
  }
</style>


