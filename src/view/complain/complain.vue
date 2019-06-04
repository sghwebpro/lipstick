<template>
  <div class="complain">
    <div class="complain__tit">
      请选择投诉原因
    </div>
    <van-checkbox-group v-model="result">
      <van-cell-group>
        <van-cell
          v-for="(item,index) in list"
          clickable
          :key="item"
          :title="`${item}`"
          @click="toggle(index)"
        >
          <van-checkbox :name="item" ref="checkboxes" />
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
    <div class="complain__btn" @click="tousu">
      确定
    </div>
  </div>
</template>
<script>
import { Api } from '@/api/api'
export default {
  data(){
    return{
      list:[
        '虚假活动、活动不真实',
        '诱导分享、诱导关注',
        '欺诈、违法',
        '色情、暴力',
        '其他',
      ],
      result:[]
    }
  },
  methods:{
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
     
    },
    tousu(){
      if(this.result.length==0){
         this.$dialog.alert({
           message:'请选择投诉内容'
         })
         return
      }
      Api.getInstance().tousu({
        memo:this.result.join(',')
      })
      .then(res=>{
        
         this.$dialog.alert({
           message:'感谢您的支持，谢谢反馈'
         }).then(()=>{
          this.$router.push({ path: 'index.html' })
         })
      })
    }
  }
}
</script>

