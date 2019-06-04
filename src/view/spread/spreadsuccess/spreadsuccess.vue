<template>
  <div class="spreadsuccess">
    <div class="spreadsuccess__mask"></div>
    <div class="spreadsuccess__con">
      <div class="spreadsuccess__img">
        <img src="../../../assets/image/spreadsuccess.png" alt="">
      </div>
      <div class="spreadsuccess__info">
        恭喜您成为【{{level==1?'白银会员':'黄金会员'}}】
      </div>
      <router-link to="/index.html" class="spreadsuccess__btn">
        立即推广
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    level:{
     type:Number 
    }
  },
  name:'spreadsuccess'
}
</script>

