<template>
  <div class="paymoney">
    <div class="paymoney__mask"></div>
    <div class="paymoney__con">
       <div class="paymoney__close" @click="closepaymoney">
         <img src="../../../assets/image/ruleclose.png" alt="">
       </div>
       <div class="paymoney__title">
         收银台
       </div>
       <div class="paymoney__tit">
         <div>
           我的余额：<span>￥{{userInfo.MoneyBalance}}</span>
         </div>
       </div>
       <div class="paymoney__info">
          <div class="paymoney__list" v-for="(item,index) in PayChance" :key="index" @click="moneytap(item)">
             <div>{{item}}</div><div>元</div>
          </div>
       </div>
    </div>
  </div>
</template>
<script>
 import { requestpay } from '@/js/requestpay/requestpay'
  export default {
    props:{
      userInfo:{
        type:Object
      },
      PayChance:{
        type:Array
      }
    },
    name:'paymoney',
    methods:{
      closepaymoney(){
        this.$emit('closepay')
      },
      moneytap(money){
        requestpay.getInstance().pay(money)
      }
    }
  }
</script>


