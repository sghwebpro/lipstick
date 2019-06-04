<template>
  <div class="teamlist">
    <div class="teamlist__list--info">
      <div class="teamlist__list--img">
        <img :src="item.HeadImg" alt="">
      </div>
      <div class="teamlist__list--nick">
        {{item.UserNick}}
      </div>
    </div>
    <div class="teamlist__list--time">
      {{item.CreateTime}}
    </div>
  </div>
</template>
<script>
export default {
  props:{
    item:{
      type:Object
    }
  },
  name:"teamlist",

}
</script>
  

