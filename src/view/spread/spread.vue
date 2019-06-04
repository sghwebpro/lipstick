<template>
<div class="spread">
  <div class="spread__headimg">
    <img src="../../assets/image/spreadheadimg.png" alt="">
  </div>
  <div class="spread__con">
    <div class="spread__info">
      <div class="spread__info--tit">
        您已<span>免费</span>获得 <span>高级代理</span> 授权，将享有以下福利：
      </div>
      <div class="spread__info--list">
        <i></i>享有第一伙伴消费金额的<span>【{{realTimeInfo.RateZhong1}}%】</span>提成比例; 
      </div>
      <div class="spread__info--list">
        <i></i>享有第二伙伴消费金额的<span>【{{realTimeInfo.RateZhong2}}%】</span>提成比例; 
      </div>
      <div class="spread__info--exp">
        例: A邀请了B，B邀请了C，B和C都消费了100元，那么B就是A的第一伙伴，C就是A的第二伙伴，A的收益公式为：100元*20%+100元*5%=25元
      </div>
    </div>
    <div class="spread__info no">
      <div class="spread__info--tit">
        升级为 <span>超级代理</span>，将享有以下福利：
      </div>
      <div class="spread__info--list">
        <i></i>享有第一伙伴消费金额的<span>【{{realTimeInfo.RateGao1}}%】</span>提成比例; 
      </div>
      <div class="spread__info--list">
        <i></i>享有第二伙伴消费金额的<span>【{{realTimeInfo.RateGao2}}%】</span>提成比例; 
      </div>
    </div>
    <div class="spread__money">
      <div class="spread__money--tit">
        <img src="../../assets/image/spreadicon1.png" alt="">
        <div>升级费用</div>
      </div>
      <div class="spread__money--img">
        <img :src="realTimeInfo.ImageGao" alt="">
      </div>
    </div>
  </div>
  <div class="spread__btn no"
  v-if="userInfo.Level>=2">
    已升级成功
  </div>
  <div class="spread__btn" @click="upgradeUser" v-else>
    确认支付
  </div>
</div>
</template>
<script>
import Cookies from 'js-cookie';
import { Api } from '@/api/api'
export default {
  name:'spread',
  components: {
  },
  data(){
    return {
      declass:'spread__tabnav--list',
      activeClass:'active',
    }
  },
  mounted(){
  },
  methods:{
    tabtap1(){
      this.iszhong=true
    },
    tabtap2(){
      this.iszhong=false
    },
    upgradeUser(){
      Api.getInstance().upgradeUser({level:2})
      .then((res)=>{
        if(res.data.Status==200){
            this.$store.state.isStatus = 0
            if(res.data.Result.NeedPay==0){
             Cookies.set('upgrade',1)
             this.$commonapi.userinfo.getUserInfo() 
            }else{
              window.open('/paycenter.html?orderid='+res.data.Result.OrderId+'&returnurl=/spread.html','_self')   
            }
        }else{
          this.$toast(res.data.Result.Message)
        }
      })
    },
    successalert(){
      let upgrade = Cookies.get('upgrade')
      if(upgrade && upgrade==1){
        Cookies.remove('upgrade')
        this.$dialog.alert({
              message: '恭喜您成为超级代理'
            }).then(() => {
              this.$router.push({path:'/index.html'})
            });
      }
    }
  },
  computed: {
    userInfo () {
      this.successalert()
      return this.$store.state.userInfo
    },
    realTimeInfo(){
       return this.$store.state.realTimeInfo
    }
  }
}
</script>
  
  
  