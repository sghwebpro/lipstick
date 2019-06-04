import request from '@/utils/request.js';
import Cookies from 'js-cookie';
import Qs from 'qs'
export class Api{
  static getInstance() {
    if(!Api.instance){
      Api.instance = new Api();
    }
    return Api.instance;
  }
  constructor(){
  }
  post({data = {},
        method ='post',
        isphpsessid = true,
        isconfig = true,
        url}){
          if(isphpsessid && method=='post'){
            // if(process.env.NODE_ENV==='development'){
            //   Cookies.set('PHPSESSID','n7u8vkd9b2gsn1oplcbogi18c0')
            // }
            Object.assign(data,{phpsessid:Cookies.get('PHPSESSID')})
          }
          if(isconfig){
            url = '/v1.0/api/'+url
          }
    return request({
      transformRequest: [function(data) {      //在请求之前对data传参进行格式转换
        data = Qs.stringify(data)
        return data
      }],
      method,
      url,
      data
    })
  }
  /**
   * 获取奖品列表
   * @param {*} params
   */
  getPrizeList(data){
    return this.post({
      url:'Activity/getPrizeList.html',
      isphpsessid:false,
      data
    })
  }
   /**
   * 订单记录
   * @param {*} params
   * POST
   * phpsessid
   * pageindex  //默认 1
   * pagesize   //默认 6
   */
  getPrizeLog(data){
    return this.post({
      url:'Activity/getPrizeLog.html',
      data
    })
 }

 /**
   * 获取用户信息
   * @param {*} params
   */
  getUserInfo(data){
    return this.post({
      url:'User/getUserInfo.html',
      data
    })
  }
  /**
   * 添加活动
   * @param {*} params
   */
  addActivity(data){
    return this.post({
      url:'Activity/addActivity.html',
      data
    })
  }
  /**
   * 保存结果
   * @param {*} params
   * phpsessid    //session id
   * aid  //活动id
   * iswin //是否通关 1 是 0 否
   * level //用户等级
   * sign  //可选
   */
  saveResult(data){
    return this.post({
      url:'Activity/saveResult.html',
      data
    })
 }
 /**
   * 获取分销明细
   * @param {*} params
   * POST
   * phpsessid
   * level //级别 1 第一级 2 第二级
   * pageindex  //默认 1
   * pagesize   //默认 6
   */
  getTeamUsersIncome(data){
    return this.post({
      url:'Activity/getTeamUsersIncome.html',
      data
    })
 }
 /**
   * 获取团队成员
   * @param {*} params
   * POST
   * phpsessid
   * level //级别 1 第一级 2 第二级
   * pageindex  //默认 1
   * pagesize   //默认 6
   */
  getTeamUsers(data){
    return this.post({
      url:'Activity/getTeamUsers.html',
      data
    })
 }
 /**
   * 获取提现记录
   * @param {*} params
   * POST
   * phpsessid
   * pageindex  //默认 1
   * pagesize   //默认 6
   */
  getPutForward(data){
    return this.post({
      url:'Activity/getPutForward.html',
      data
    })
  } 
   /**
   * 提现
   * @param {*} params
   * POST
   * phpsessid
   * money // 金钱
   * realname //真实姓名
   */
  Putforward(data){
    return this.post({
      url:'Activity/PutForward.html',
      data
    })
  }  

   /**
   * 获取规则
   * @param {*} params
   */
  getQuestions(){
    return this.post({
      method: 'get',
      url:'Utils/getQuestions.html',
    })
  }
  /**
   * 会员升级
   * @param {*} params
   * POST
   * phpsessid
   * level        //目标等级
   */
  upgradeUser(data){
    return this.post({
      url:'Activity/upgradeUser.html',
      data
    })
  }

 
  /**
   * 实时更新参数
   * @param {*} params
   */
  getRealTime() {
    return this.post({
      method: 'get',
      url:'Utils/getRealTime.html',
    })
  }
  /**
   * 跑马灯
   * @param {*} params
   */
  getReceiveAllList() {
    return this.post({
      method: 'get',
      url:'Activity/getReceiveAllList.html',
    })
  }
  /**
   * 校验手机验证码
   * @param {*} params
   * POST
   * phpsessid
   * code  
   */
  checkMobileCode(data){
    return this.post({
      url:'User/checkMobileCode.html',
      data
    })
 }
 /**
  * 发送手机验证码
  * @param {*} params
  * POST
  * phpsessid
  * mobile  
  */
 sendMobileCode(data){
  return this.post({
    url:'User/sendMobileCode.html',
    data
  })
 }

 /**
  * 金额充值
  * @param {*} params
  * POST
  * phpsessid
  * money // 待充值金额
  */
 payMoney(data){
  return this.post({
    url:'Activity/payMoney.html',
    data
  })
 }
  /**
   * 将推广金额转入余额
   * @param {*} params
   * POST
   * phpsessid
   */
  rollin(data){
    return this.post({
      url:'User/rollin.html',
      data
    })
  }

   /**
   * 提醒发货
   * @param {*} params
   * POST
   * phpsessid
   * id
   */
  tipOrder(data){
    return this.post({
      url:'User/tipOrder.html',
      data
    })
  }
  
  /**
   * 确认订单收货
   * @param {*} params
   * POST
   * phpsessid
   * id     // 订单ID，不是订单编号
   */
  confirmOrder(data){
    return this.post({
      url:'User/confirmOrder.html',
      data
    })
  }
    /**
   * 获取分享图
   * @param {*} params
   * POST
   * phpsessid
   */
  getShareImage(data){
    return this.post({
      url:'Activity/getShareImage.html',
      data
    })
  }
  /**
   * 领奖申请
   * @param {*} params
   * phpsessid    //session id
   * linkman  //联系人
   * linkphone //联系电话
   * address     //送货地址
   * aid         //活动id
   */
  addPrizeLog(data){
    return this.post({
      url:'Activity/addPrizeLog.html',
      data
    })
  }
  
  /**
   * 邀请成功
   * @param {*} params
   * POST
   * phpsessid
   * uid       //邀请者用户id
   */
  inviteSuccess(data){
    return this.post({
      url:'Activity/inviteSuccess.html',
      data
    })
 }
 
  /**
   * 发送配置地址
   * @param {*} params
   * POST
   * phpsessid
   * uid       //邀请者用户id
   */
  wxconfig(data){
    return this.post({
      isconfig:false,
      isphpsessid:false,
      url:'/wxconfig.html',
      data
    })
 }

 /**
   * 投诉
   * @param {*} params
   * POST
   * aid      //活动id    选填 如果没有填0
   * memo     //投诉内容  必填
   * mobile   //投诉手机号码  选填
   */
  tousu(data){
    return this.post({
      url:'Utils/tousu.html',
      isphpsessid:false,
      data
    })
 }

 
  /**
   * 领取红包
   * @param {*} params
   * POST
   * phpsessid
   */
  getredpack(data){
    return this.post({
      url:'Activity/getredpack.html',
      data
    })
 }
}