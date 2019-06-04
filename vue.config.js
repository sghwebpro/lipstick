const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  productionSourceMap:false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  }, 
  devServer: {
    open:true,
    // 设置代理
    proxy: {
      "/v1.0/api": {
        target:'http://kh.klbgs.com/',
        // target: "https://kh.iwillgo.cn/", // 访问数据的计算机域名http://kh.klbgs.com/index.html
        changOrigin: true //开启代理
      }
    }
  }
};
