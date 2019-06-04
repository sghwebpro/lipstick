<template>
<div class="result">
  <div class="result__address"  @click="opensetAddress">
    <img src="../../../assets/image/address.png" alt="">
    <div class="result__address--pro" v-if="!isshowAddress">
      请先输入您的收货地址
    </div>
    <div class="result__address--info" v-if="isshowAddress">
      <div class="result__address--userinfo">
        收货人：{{addressInfo.linkman}}，{{addressInfo.linkphone}}
      </div>
      <div class="result__address--con">
        {{addressInfo.address}}
      </div>
    </div>
    <div class="result__address--left">
      <img src="../../../assets/image/left.png" alt="">
    </div>
  </div>
  <div class="result__btn" @click="addPrize">
    立即领取
  </div>

</div>
</template>
<script>
export default {
  name:'result',
  data(){
    return {
      addressInfo:{
      },
      ceshi:{

      },
      isshowAddress:false
    }
  },
  methods:{
    opensetAddress(){
      if(typeof wx != 'undefined'){
        wx.openAddress({
         success: (res)=> {
           if (typeof res == "string") {
              res = JSON.parse(res.data)
            } 
           let addressInfo = {
             linkman: res.userName,
             linkphone: res.telNumber,
             address: res.provinceName + res.cityName + res.countryName + res.detailInfo
           }
           Object.assign(this.addressInfo,addressInfo)
           this.isshowAddress=true
         }
        });
      }
      // else{
      //   this.addressInfo={
      //     linkman:'23432',
      //     linkphone:'13752648957',
      //     address:'dsfsdf'
      //   }
      //      this.isshowAddress=true
      // }
    },
    addPrize(){
       this.$emit('addPrizeLog',this.addressInfo)
    }
  }
}
</script>


