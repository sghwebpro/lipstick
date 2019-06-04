<template>
  <div class="rule">
    <div class="rule__mask"></div>
    <div class="rule__con">
       <div class="rule__close" @click="closerule">
         <img src="../../../assets/image/ruleclose.png" alt="">
       </div>
       <div class="rule__tit">活动规则</div>
       <div scroll-y="true">
          <div class="rule__list" v-for="(item,index) in Question" :key="index">
             <span>{{index+1}}.</span><div>{{item.Title}}</div>
          </div>
       </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    Question:{
      type:Array
    }
  },
  name:'rule',
  methods:{
    closerule(){
      this.$emit('closeRule')
    }
  }
}
</script>


