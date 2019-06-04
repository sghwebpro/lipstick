<template>
  <div class="withdrawlog">
    <div class="withdrawlog__tit">
      <div>
        时间
      </div>
      <div>
        说明
      </div>
      <div>
        余额
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="ab"
      @load="onLoad">
      <div class="withdrawlog__list"  v-for="(item, i) in withdrawList" :key="i">
        <div class="withdrawlog__list--time">
          {{item.CreateTime}}
        </div>
        <div class="withdrawlog__list--status">
          {{item.Title}}
        </div>
        <div class="withdrawlog__list--money" v-if="item.PayType==1">
           +{{item.Money}}
        </div>
        <div class="withdrawlog__list--money del" v-else>
           -{{item.Money}}
        </div>
       </div>
    </van-list>
  </div>
</template>
<script>
import { Api } from '@/api/api'
export default {
  name:"withdrawlog",
  data(){
    return {
      withdrawList:[],
      pageindex:1,
      loading: false,
      finished:false,
      ab:'没有更多了'
    }
  },
  
  methods: {
    onLoad() {
      Api.getInstance().getPutForward({
        pageindex:this.pageindex,
        pagesize:12
      })
      .then((res)=>{
        if(res.data.Status==200){
          this.loading = false;
          if(res.data.Result.List.length==0){
            this.finished = true;
          }else{
            
            this.pageindex ++
            this.withdrawList.push(...res.data.Result.List)
            
          }
        }else{
          this.$toast(res.data.Result.Message)
        }
      })
    }
  }
}
</script>


