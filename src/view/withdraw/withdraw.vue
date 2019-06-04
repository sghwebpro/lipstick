<template>
  <div class="layout">
    <div class="withdraw">
      <div  class="withdraw__log">
        <router-link to="/withdrawlog.html"  replace>余额明细</router-link>
      </div>
      <div class="withdraw__money">
        <span>￥</span><div>{{userInfo.TuiMoney}}</div>
      </div>
      <!-- 验证手机 -->
      <div class="withdraw__telphone" v-if="withdrawStatus==1">
       <div class="withdraw__telphone--number">
         <div class="withdraw__telphone--tit">
           手机号
         </div>
         <input type="number" maxlength="11" placeholder="输入手机号码" v-model="phone"/>
         <div class="withdraw__telphone--btn" @click="sendMobile" v-if="!isSend">
           获取验证码
         </div>
         <div class="withdraw__telphone--btn no" v-if="isSend">
           {{timereturn}}秒后重新获取
         </div>
       </div>
       <div class="withdraw__telphone--code">
         <div class="withdraw__telphone--tit">
           验证码
         </div>
         <input type="number"  placeholder="输入短信中的验证码" v-model="code"/>
       </div>
      </div>
      <!-- 实名认证 -->
      <div class="withdraw__realname" v-if="withdrawStatus==2">
        <div class="withdraw__realname--money">
         <div class="withdraw__realname--cue">
           <div>提现金额</div><span>（今日还可以提现{{userInfo.TakeLeftCount}}次，剩余额度¥{{userInfo.TakeLeftMoney}}）</span>
         </div>
         <div class="withdraw__realname--input">
           <div>￥</div><input type="digit" v-model="putmoney" placeholder="0.00"/>
         </div>
        </div>
        <div class="withdraw__realname--nick">
          <div>收款人</div><input type="text" v-model="realnick" placeholder="请填写微信实名认证的姓名" />
        </div>
      </div>
      <!-- 按钮 -->
      <div class="withdraw__btn">
        <div class="withdraw__btn--get" id="withdrawTap" @click="withdrawTap">提现</div>
        <!-- <router-link to="/paymoney.html" class="withdraw__btn--put" id="gopaymoney" v-if="withdrawStatus==0||withdrawStatus==3">充值</router-link>-->
        <div class="withdraw__btn--put" id="reset" @click="reset" v-if="withdrawStatus==1||withdrawStatus==2">取消</div> 
      </div>
      <!-- 提现规则 -->
      <div class="withdraw__rule">
        <div class="withdraw__rule--tit">温馨提示：</div>
        <div class="withdraw__rule--list" v-for="(item,index) in realTimeInfo.TakeMoneyTs" :key="index">{{index+1}}.{{item}}</div>
      </div>
      <!-- 个人客服 -->
      <div class="withdraw__personservice" v-if="personservice">
        <img :src="realTimeInfo.Kefu" alt="">
        <span>长按识别二维码添加微信客服提现</span>
        <div @click="closealertpersonservice">
          <img src="../../assets/image/ruleclose.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Api } from '@/api/api'
let Time = null
export default {
  name:'withdraw',
  data(){
    return {
      withdrawStatus:0, //0表示实名认证提现,3表示个人提现
      personservice:false,
      isrequest:true,
      phone:'',
      timereturn:60,
      realnick:'',
      phone:'',
      code:'',
      putmoney:'',
      isSend:false
    }
  },
  mounted(){
  },
  methods:{// 倒计时
    setTime(){
      if(Time){
        clearInterval(Time)
        Time=null
      }
      let times = this.timereturn
      Time = setInterval(()=>{
        times--
        if(times<=0){
          clearInterval(Time)
          this.isSend=false
          this.timereturn=60
        }else{
          this.timereturn=times
        }
      },1000)
    },
    withdrawTap(){
      if(this.realTimeInfo.Withdraw==0){
        this.withdrawStatus=3
      }
      let status = this.withdrawStatus
      switch(status){
        case 0:
         this.confirmwithdraw()
         break;
        case 1:// 验证手机
         this.confirmphone()
         break;
        case 2:
          this.realnamewithdraw()
          break;
        case 3:
          this.alertpersonservice()
          break;
      }
    },
    reset(){
      this.withdrawStatus=0
    },
    alertpersonservice(){
       this.personservice = true
    },
    closealertpersonservice(){
       this.personservice = false
    },
    // 判断是验证手机还是实名提现
    confirmwithdraw(){
      if(!!this.userInfo.Mobile){
        this.withdrawStatus=2
      }else{
        this.$dialog.alert({
          message:'为了保护账户安全，需要进行一次手机验证',
        })
        .then(res=>{
          this.withdrawStatus=1
        }).catch(() => {
            // on cancel
         })
      }
    },
    // 验证手机
    confirmphone(){
      if(this.code==''){
        this.$toast('验证码不能为空')
      }else{
       this.checkMobileCode(this.code)
      }
    },
    // 发送短信
    sendMobile(){
      let myreg=/^[1][3,4,5,7,8][0-9]{9}$/
      let phone = this.phone
      if(!myreg.test(phone)){
        this.$toast('请填写正确的手机号码')
      }else{
        this.sendMobileCode()
      }
    },
    // 校验手机验证码
    checkMobileCode(code){
      Api.getInstance().checkMobileCode({code:code})
      .then((res)=>{
          if(res.data.Status==200){
            if(res.data.Result.IsOk==1){
              clearInterval(Time)
              this.withdrawStatus=2
              this.$toast('验证成功')
            }else{
              this.$toast('验证码错误，请重新获取验证码')
            }
          }else{
            this.$toast(res.data.Result.Message)
          }
      })
    },
    // 发送手机验证码
    sendMobileCode(){
      Api.getInstance().sendMobileCode({mobile:this.phone})
      .then((res)=>{
        if(res.data.Status==200){
          this.setTime()
          this.isSend=true
        }else{
          this.$toast(res.data.Result.Message)
        }
      })
    },
    // 实名提现
    realnamewithdraw(){
      let reg=/(^[1-9]{1}\d*|^0{1})(\.\d{1,2})?$/
      if(!reg.test(this.putmoney)){
         this.$toast('请输入正确金额')
      }else if(Number(this.putmoney)<Number(this.userInfo.UserTakeMoney)){
         this.$toast('提现金额不能小于'+this.userInfo.UserTakeMoney)
      }else if(Number(this.putmoney)>Number(this.userInfo.TuiMoney)){
         this.$toast('你的余额不足')
      }else if(this.realnick==''){
         this.$toast('姓名不能为空')
      }else{
         this.Putforward()
      }
    },
    // 提现
    Putforward:function(){
      if(!this.isrequest){
        return
      }
      this.isrequest = false
      Api.getInstance().Putforward({
          realname:this.realnick,
          money:this.putmoney
        })
        .then((res)=>{
          this.isrequest = true
          if(res.data.Status==200){
            this.withdrawStatus=0
            this.putmoney=''
            this.realnick=''
            this.$dialog.alert({
              message:'提现成功',
            }).then(res=>{
              this.$commonapi.userinfo.getUserInfo()
            }).catch(() => {
            // on cancel
           })
          }else{
            this.$dialog.alert({
              message: res.data.Result.Message,
            })
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
  

