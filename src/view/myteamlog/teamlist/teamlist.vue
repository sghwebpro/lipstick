<template>
   <div class="teamloglist">
    <div class="teamloglist__head">
      <div class="teamloglist__head--info">
        <div class="teamloglist__head--img">
          <img :src="item.HeadImg" alt="">
        </div>
        <div class="teamloglist__head--nick">
          {{item.UserNick}}
        </div>
      </div>
      <div class="teamloglist__head--time">
        {{item.CreateTime}}
      </div>
    </div>
    <div class="teamloglist__money">
      <div class="teamloglist__money--tit">
        <div>付款金额</div>
        <span></span>
        <div>佣金比例</div>
        <span></span>
        <div>佣金金额</div>
      </div>
      <div class="teamloglist__money--con">
        <div class="teamloglist__money--pay">￥{{item.PayMoney}}</div>
        <span>X</span>
        <div class="teamloglist__money--rate">{{rate}}%</div>
        <span>=</span>
        <div class="teamloglist__money--get">￥{{item.ProfitMoney}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    item:{
      type:Object
    },
    rate:{
      type:Number
    }

  },
  name:"teamlist",

}
</script>


