<template>
  <div class="index">
    <div v-if="resultInfo.iswin==1">
      <result  @addPrizeLog="addPrizeLog"/>
    </div>
    <div v-else>
      <top :navlist="navlist" :navindex="navindex" @tabnav="tabnav"/>
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="ab"
        @load="onLoad">
        <div class="index__shopitem">
          <shoplist :item = "item" v-for="item in list" :key="item.Id" @game="gamestart(item.Id,item.Cost)"/>
        </div>
      </van-list>
      <navitem :position="0"/>
      <a class="index__gametest" :href="'/gametest.html'">
        <img src="../../assets/image/navtry.png" alt=""/>
      </a>
    </div>
    <paymoney :userInfo="userInfo" :PayChance="realTimeInfo.PayChance" v-if="paymoneyopen" @closepay="closepay"/>
  </div>
</template>

<script>
import debug from '@/js/debug'
import Cookies from 'js-cookie';
import { Api } from '@/api/api'
import { checksign } from '@/js/checksign/checksign'
import shoplist from './shoplist/shoplist';
import top from './top/top';
import navitem from './navitem/navitem';
import result from  './result/result';
import rule from  './rule/rule';
import paymoney from  './paymoney/paymoney';

export default {
  name: 'index',
  components: {
    shoplist,
    top,
    navitem,
    result,
    paymoney,
    rule
  },
   data() {
    return {
      list: [],
      navindex:0,
      navlist:[],
      loading: false,
      finished: false,
      isstart:true,
      ab:"没有更多了",
      pageindex:1,
      resultInfo:{},
      activityInfo:{},
      paymoneyopen:false,
    };
  },
  mounted(){
    let activityInfo=typeof localStorage.getItem("activityInfo") == 'string'&&JSON.parse(localStorage.getItem("activityInfo"))
    if(activityInfo&&Object.keys(activityInfo).length>0){
      this.activityInfo = activityInfo
    }
    if(Cookies.get('PHPSESSID')){ 
      this.save()
      this.inviteSuccess()
    }
  },
  methods: {
    onLoad() {
      Api.getInstance().getPrizeList({
        category:this.navindex,
        pageindex:this.pageindex,
        pagesize:10
      })
      .then((res)=>{
        if(res.data.Status==200){
          this.navlist=res.data.Result.Categories
          this.loading = false;
          if(res.data.Result.List.length==0){
            this.finished = true;
          }else{
            this.pageindex ++
            this.list.push(...res.data.Result.List)
          }
        }else{
          this.$toast(res.data.Result.Message)
        }
      })
    },
    closepay(){
      this.paymoneyopen=false
    },
    gamestart(id,money){
      if(money>this.userInfo.MoneyBalance){
         this.paymoneyopen = true
         return
      }
      if(!this.isstart){
        return 
      }
      this.isstart=false
      Api.getInstance().addActivity({
        pid:id
      })
      .then((res)=>{
        if(res.data.Status==200){
          this.activityInfo = res.data.Result
          localStorage.setItem('activityInfo',JSON.stringify(this.activityInfo))
          window.open('/game.html','_self')
        }
      })
    },
    save(){
      let resultInfo = JSON.parse(localStorage.getItem("resultInfo"))
      if(resultInfo&&Object.keys(resultInfo).length>0){
        let saveData = checksign.getInstance().sign({
          activityInfo:this.activityInfo,
          resultInfo:resultInfo,
          chsign:this.userInfo.Sn
        })
        Api.getInstance().saveResult(saveData)
        .then((res)=>{
          if(res.data.Status==200){
           localStorage.removeItem('resultInfo')
           this.resultInfo = resultInfo
          }else{
            localStorage.removeItem('resultInfo')
            this.$toast(res.data.Result.Message)
          }
        })
      }
    },
    tabnav(data){
      this.navindex=data;
      this.pageindex = 1;
      this.list = [];
      this.finished = false;
      this.loading = true
      this.onLoad()
    },
    addPrizeLog(addressInfo){
      if(Object.keys(addressInfo).length==0){
        this.$toast('请输入收货地址')
        return
      }
      let data = Object.assign(addressInfo,{aid:this.activityInfo.ActivityId})
     
      Api.getInstance().addPrizeLog(data)
      .then((res)=>{
        if(res.data.Status==200){
           this.$dialog.alert({
             title: this.realTimeInfo.Pop.Wa.Title,
             message: this.realTimeInfo.Pop.Wa.Content[0],
           }).then(()=>{
               this.resultInfo = {}
           })
        } else {
          this.$toast(res.data.Result.Message)
        }
      })
    },
    inviteSuccess(){
      let uid = Cookies.get('uid')
      if(typeof uid == 'undefined'){
         return 
      }
      Cookies.remove('uid')
      Api.getInstance().inviteSuccess({
        uid:uid
      })
      .then((res)=>{
         if(res.data.Status==200){
           if(res.data.Result.IsNew==1){
             window.open('/gametest.html','_self')
           }
         }else{
           this.$toast(res.data.Result.Message)
         }
      })
    },
    parseQueryString(url){
       var reg_url = /^[^\?]+\?([\w\W]+)$/,
                reg_para = /([^&=]+)=([\w\W]*?)(&|$)/g, //g is very important
                arr_url = reg_url.exec(url),
                ret = {};
        if (arr_url && arr_url[1]) {
            var str_para = arr_url[1], result;
            while ((result = reg_para.exec(str_para)) != null) {
                ret[result[1]] = result[2];
            }
        }
        return ret;
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
};
</script>

