<template>
  <div class="myteamlog">
    <div class="myteamlog__tabnav">
      <div  :class="[isTeam1?activeClass:'',declass]" @click="team1">
        第一伙伴
      </div>
      <div  :class="[isTeam1?'':activeClass,declass]" @click="team2">
        第二伙伴
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="ab"
      @load="onLoad1" v-show="isTeam1">
      <div class="myteamlog__con">
        <teamlist :rate="team1rate"  :item = "item" v-for="item in teamList1" :key="item.UserNick"/>
      </div>
    </van-list>
    <van-list
      v-model="loading1"
      :finished="finished1"
      :finished-text="ab"
      @load="onLoad2" v-show="!isTeam1">
      <div class="myteamlog__con">
        <teamlist v-for="item in teamList2" :rate="team2rate" :item="item" :key="item.UserNick"/>
      </div>
    </van-list>
  </div>
</template>
<script>
import { Api } from '@/api/api';
import teamlist from './teamlist/teamlist';
export default {
  name:"myteamlog",
  components: {
    teamlist
  },
   data() {
    return {
      declass:'myteamlog__tabnav--list',
      activeClass:'active',
      teamList1: [],
      teamList2:[],
      loading: false,
      finished: false,
      loading1: false,
      finished1: false,
      ab:"没有更多了",
      pageindex1: 1,
      pageindex2: 1,
      team2count:0,
      team1count:0,
      team2rate:0,
      team1rate:0,
      isTeam1: true
    };
  },
  mounted(){
   this.onLoad2()
  },
  methods:{
    onLoad1() {
     
      Api.getInstance().getTeamUsersIncome({
        pageindex:this.pageindex1,
        level:1,
        pagesize:10
      })
      .then((res)=>{
        if(res.data.Status==200){
          this.loading = false;
          if(res.data.Result.List.length==0){
            this.finished = true;
          }else{
            this.pageindex1 ++
            this.teamList1.push(...res.data.Result.List)
            this.team1count = res.data.Result.Count
            this.team1rate = res.data.Result.Rate
          }
        }else{
          this.$toast(res.data.Result.Message)
        }
      })
    },
    onLoad2() {
      Api.getInstance().getTeamUsersIncome({
        pageindex:this.pageindex2,
        level:2,
        pagesize:10
      })
      .then((res)=>{
        if(res.data.Status==200){
          this.loading1 = false;
          if(res.data.Result.List.length==0){
            this.finished1 = true;
          }else{
            this.pageindex2 ++
            this.teamList2.push(...res.data.Result.List)
            this.team2count = res.data.Result.Count
            this.team2rate = res.data.Result.Rate
          }
        }else{
          this.$toast(res.data.Result.Message)
        }
      })
    },
    team1(){
      this.isTeam1=true
      this.pageindex1 = 1
      this.teamList1 = []
      this.onLoad1()
    },
    team2(){
      this.isTeam1=false
      this.pageindex2 = 1
      this.teamList2 = []
      this.onLoad2()
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


