<template>
  <div class="navitem">
    <router-link class="navitem__list" to="/index.html">
      <img src="../../../assets/image/navgame1.png" alt="" v-if="position=='0'"/>
      <img src="../../../assets/image/navgame0.png" alt="" v-else/>
      <span :class="{'on':(position=='0')}">游戏</span>
    </router-link>
    <router-link class="navitem__list" to="/personal.html">
      <img src="../../../assets/image/navpersonal0.png" alt="" v-if="position=='0'"/>
      <img src="../../../assets/image/navpersonal1.png" alt="" v-else/>
      <span :class="{'on':(position=='1')}">我的</span>
    </router-link>
  </div>
</template>
<script>
export default {
  props:{
    position:{
      type:Number
    }
  },
  data(){
     return {
     }
  },
  name:"navitem",
}
</script>


