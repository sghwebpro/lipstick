<template>
  <div class="shoplist"  @click="select">
    <div class="shoplist__con">
      <div class="shoplist__list--img">
        <img :src="item.Thumb" alt=""/>
      </div>
      <div class="shoplist__list--money">
        <span>专柜价 ￥{{item.Money}}</span>
      </div>
    </div>
    <div class="shoplist__list--info">
      <div class="shoplist__list--mode">
        <span>{{item.Name}}</span>
        <span>{{item.Color}}</span>
      </div>
      <div class="shoplist__list--btn">
        ￥{{item.Cost}}<span>/次</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    item:{
      type:Object
    }
  },
  name:"shoplist",
  data(){
    return{
    }
  },
  methods:{
    select(id){
       this.$emit('game')
    }
  }
}
</script>
<style lang="less" scoped>
  
</style>

