import { Api } from '@/api/api'
export class wxconfig{
  static getInstance() {
    if(!wxconfig.instance){
      wxconfig.instance = new wxconfig();
    }
    return wxconfig.instance;
  }
  constructor(){

  }
  configurl(){
    Api.getInstance().wxconfig({url:window.location.href})
        .then((res)=>{
          if(res.data.Status==200){
            if(typeof wx != 'undefined'){
              let configmessage = res.data.Message
              if(typeof res.data.Message == "string"){
                configmessage = JSON.parse(res.data.Message)
              }
              wx.config(configmessage)
              wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                if(wx.updateAppMessageShareData){
                  wx.updateAppMessageShareData({
                      title: title, // 分享标题
                      desc: desc, // 分享描述
                      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: imgUrl, // 分享图标
                      success: function () {
                      }
                  });
      
                }else {
                  wx.onMenuShareAppMessage({
                      title: title, // 分享标题
                      desc: desc, // 分享描述
                      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: imgUrl, // 分享图标
                      success: function () {
                      }
                  });
                }
                if(wx.updateTimelineShareData){
                  wx.updateTimelineShareData({
                      title: title, // 分享标题
                      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: imgUrl, // 分享图标
                      success: function () {
                      }
                  });
      
                }else{
                  wx.onMenuShareTimeline({
                      title: title, // 分享标题
                      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: imgUrl, // 分享图标
                      success: function () {
                      }
                  });
      
                }
            });
            }
          }
      })
  }
}