<template>
  <div class="top headbg">
    <div class="top__img">
      <img src="../../../assets/image/indexhead.png" alt=""/>
    </div>
    <div class="top__nav">
      <div class="top__nav--all" @click="tabnav(0)">全部</div>
      <div class="top__navlist">
        <div class="top__scroll" :style="{width:navlist.length*25+'%'}">
          <div class="top__navlist--item" v-for="item in navlist" :key="item.Id" @click="tabnav(item.Id)">
            <img :src="item.Id==navindex?item.Logoon:item.Logo" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="top__cue">
      <span></span>
      <div>全场包邮  支持专柜验查</div>
      <span></span>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    navlist:{
     type:Array
    },
    navindex:{
      type:Number
    }
  },
  name:'top',
  data(){
    return{
    }
  },
  methods:{
    tabnav(index){
      this.$emit("tabnav",index)
    }
  }
}
</script>


