import  { hexMD5 } from '@/js/checksign/md5.js'
export class checksign{
  static getInstance() {
    if(!checksign.instance){
      checksign.instance = new checksign();
    }
    return checksign.instance;
  }
  constructor(){
     this.saveData=null
  }
  sign({
    activityInfo={},
    resultInfo={},
    chsign='piziax'
  }){
    
    this.saveData = {
      aid: activityInfo.ActivityId,
      iswin:resultInfo.iswin,
      level:resultInfo.level,
      time:resultInfo.time,
    }
    if(activityInfo.CheckSign==1){
      Object.assign(this.saveData,{sign:hexMD5('aid='+activityInfo.ActivityId +'&iswin='+ resultInfo.iswin+'&level=' + resultInfo.level+'&time=' + resultInfo.time+chsign)})
    }
    return this.saveData
  }
}