<template>
  <div class="sendredpack">
    <div class="sendredpack__btn" @click="getredpack">
      <img src="../../assets/image/sendredpackbtn.png" alt="">
    </div>
  </div>
</template>
<script>
import { Api } from '@/api/api'
export default {
  name:'sendredpack',
  mounted(){
  },
  methods:{
    getredpack(){
      Api.getInstance().getredpack({
      })
      .then((res)=>{
         if(res.data.Status==200){
          this.$store.state.isStatus = 0
          this.$router.push({ path: 'personal.html' })
         }else{
            this.$toast(res.data.Result.Message)
            this.$router.push({ path: 'index.html' })
          }
      })
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    realTimeInfo(){
       return this.$store.state.realTimeInfo
    }
  }
}
</script>

