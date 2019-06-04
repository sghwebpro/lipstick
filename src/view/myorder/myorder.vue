<template>
  <div class="myorder">
    <div class="myorder__tit">
    <div>
      时间
    </div>
    <div>
      奖品
    </div>
    <div>
      状态
    </div>
  </div>
  <van-list
    v-model="loading"
    :finished="finished"
    :finished-text="ab"
    @load="onLoad">
    <div class="myorder__list" v-for="item in orderList" :key="item.Id">
      <div class="myorder__list--time">
        {{item.CreateTime}}
      </div>
      <div class="myorder__list--name">
        {{item.PrizeName}}
      </div>
      <div class="myorder__list--status" id="tip"
       @click="tipOrder(item.Id)" v-if="item.Status==0&&item.Alerted==0">
        <div>提醒发货</div>
      </div>
      <div class="myorder__list--status no"
        v-if="item.Status==0&&item.Alerted==1">
        <div>{{item.StatusName}}</div>
      </div>
      <div class="myorder__list--status" id="confirm"
       @click="confirmOrder(item.Id)" v-if="item.Status==1">
        <div>{{item.StatusName}}</div>
      </div>
      <div class="myorder__list--status no" v-if="item.Status==2">
        <div>{{item.StatusName}}</div>
      </div>
    </div>
  </van-list>
  </div>
</template>
<script>
import { Api } from '@/api/api'
export default {
  name:'myorder',
  data(){
    return {
      orderList:[],
      pageindex:1,
      loading: false,
      finished:false,
      ab:'没有更多了'
    }
  },
  
  methods: {
    onLoad() {
      Api.getInstance().getPrizeLog({
        pageindex:this.pageindex,
        pagesize:15
      })
      .then((res)=>{
        if(res.data.Status==200){
          this.loading = false;
          if(res.data.Result.List.length==0){
            this.finished = true;
          }else{
            this.pageindex ++
            this.orderList.push(...res.data.Result.List) 
          }
        }else{
          this.$toast(res.data.Result.Message)
        }
      })
    },
    tipOrder(id){
      Api.getInstance().tipOrder({id:id})
      .then((res)=>{
        if (res.data.Status == 200) {
          this.pageindex=1
          this.orderList=[]
          this.onLoad()
        } else {
          this.$toast(res.data.Result.Message)
        }
      })
    },
    confirmOrder(id){
      Api.getInstance().confirmOrder({id:id})
      .then((res)=>{
        if (res.data.Status == 200) {
          this.pageindex=1
          this.orderList=[]
          this.onLoad()
        } else {
          this.$toast(res.data.Result.Message)
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


