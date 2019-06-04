<template>
  <div class="service">
    <div class="service__mask"></div>
    <div class="service__con">
      <div class="service__close"  @click="closeservice">
         <img src="../../assets/image/ruleclose.png" alt="">
      </div>
      <div class="service__tit">
        添加专属客服
      </div>
      <div class="service__money">
        <span>领取</span><img src="../../assets/image/twomoney.png" alt=""><span>体验红包</span>
      </div>
      <div class="service__cue">
        还有月入过万的代理工作等你了解
      </div>
      <div class="service__ewm">
        <img :src="ewm" alt="">
      </div>
      <div class="service__longtap">
        微信扫描或长按二维码识别
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    ewm:{
      type:String
    }
  },
  name:'service',
  methods:{
    closeservice(){
      this.$emit('closeservice')
    }
  }
}
</script>
