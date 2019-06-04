<template>
  <div class="personal">
    <div class="personal__head headbg">
      <router-link to="/complain.html" class="personal__tousu">
        <img src="../../assets/image/tousu.png" alt="">
      </router-link>
      <router-link to="/share.html" class="personal__share">
        <img src="../../assets/image/share.png" alt="">
      </router-link>
      <div class="personal__user">
        <div class="personal__user--img">
          <img :src="userInfo.Avatar" alt="">
          <img src="../../assets/image/levelbg1.png" alt="" class="bg" v-if="userInfo.Level==1"/>
          <img src="../../assets/image/levelbg2.png" alt="" class="bg" v-if="userInfo.Level==2"/>
          <img src="../../assets/image/levelbg3.png" alt="" class="bg" v-if="userInfo.Level==3"/>
        </div>
        <!-- <div class="personal__user--level">
          ({{userlevel[userInfo.Level]}})
        </div> -->
        <div class="personal__user--nick usernickbg">
           {{userInfo.UserNick}}
        </div>
      </div>
      <div class="personal__head--money">
        <div>
         余额：¥{{userInfo.MoneyBalance}}
        </div>
      </div>
    </div>
    <div class="personal__nav">
      <router-link class="personal__nav--list" id="gomyteamlog" to="/myteamlog.html">
         <img src="../../assets/image/personalnav1.png" alt="">
         <span>收入明细</span>
      </router-link> 
      <router-link class="personal__nav--list" id="gowithdrawlog" to="/withdrawlog.html">
         <img src="../../assets/image/personalnav2.png" alt="">
         <span>提现记录</span>
      </router-link>
      <router-link class="personal__nav--list" id="gomyteam" to="/myteam.html">
         <img src="../../assets/image/personalnav3.png" alt="">
         <span>我的团队</span>
      </router-link>
      <div class="personal__nav--list" @click="getShareImage">
         <img src="../../assets/image/personalnav4.png" alt="">
         <span>推广二维码</span>
      </div>
    </div>
    <div class="personal__spread">
      <div class="personal__spread--money">
        推广收益： <span>￥{{userInfo.TuiMoney}}</span>元
      </div>
      <div class="personal__spread--btn"  v-if="userInfo.Lock==0">
        <router-link class="personal__spread--withdraw" to="/withdraw.html">提现</router-link>
      </div>
    </div>
    <div class="personal__info">
      <router-link class="personal__list" id="gomyorder" to="/myorder.html">
        <div>我的奖品</div>
        <div>
           <img src="../../assets/image/left.png" alt="">
        </div>
      </router-link>
      <div class="personal__list" id="setAddress" @click="openaddress">
        <div>收货地址</div>
        <div>
           <img src="../../assets/image/left.png" alt="">
        </div>
      </div>
      <!-- <div class="personal__list" @click="openservice">
        <div>月入过万的方法</div>
        <div>
           <img src="../../assets/image/left.png" alt="">
        </div>
      </div> -->
      <router-link to="/spread.html" class="personal__list">
        <div>月入过万的方法</div>
        <div>
           <img src="../../assets/image/left.png" alt="">
        </div>
      </router-link>
    </div>
    <navitem :position="1"/>
    <!-- <service  :ewm="realTimeInfo.Kefu" @closeservice="closeservice" v-if="isservice"/> -->
  </div>
</template>
<script>
import { Api } from '@/api/api'
import navitem from '../index/navitem/navitem';
import service from '@/components/service/service';
export default {
  name:"personal",
  components: {
    navitem,
    service
  },
  data(){
    return {
      isservice:false,
      userlevel:['初级会员','高级代理','超级代理','联盟伙伴']
    }
  },
  mounted(){
  },
  methods:{
    // 获取分享图
    getShareImage(){
      Api.getInstance().getShareImage({})
        .then((res)=>{
          if(res.data.Status==200){
            if(typeof wx != 'undefined'){
              wx.previewImage({
                current: '', // 当前显示图片的http链接
                urls: [res.data.Result.Path] // 需要预览的图片http链接列表
              });
            }
          }else{
            this.$toast(res.data.Result.Message)
          }
        })
    },
    openservice(){
       this.isservice=true
    },
    closeservice(){
       this.isservice=false
    },
    // 打开收货地址
    openaddress(){
      if(typeof wx != 'undefined'){
        wx.openAddress({
         success:  (res)=> {
         },
         fail:(res)=>{
         }
        });
      }
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

