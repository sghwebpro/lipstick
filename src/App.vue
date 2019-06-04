<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { wxconfig } from '@/js/wx/wxconfig'

export default {
  name: 'app',
  data(){
    return {
       isRefresh:false,
    }
  },
  components: {
  },
  mounted(){
  },
  updated(){
    if(!(window.location.pathname=='/'||window.location.pathname=='/index.html')){
      wxconfig.getInstance().configurl()
    }
    if(!this.isRefresh&&this.$store.state.isStatus==0){
     this.$commonapi.userinfo.getUserInfo()
     this.$commonapi.realtime.getRealTime()
    }
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
