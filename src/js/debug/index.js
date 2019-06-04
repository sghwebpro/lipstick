
const debug = function({
  data,//调试数据
  position='index', //组件位置
  line=0 //哪一行
}){
  if(process.env.NODE_ENV==='development'){
      console.log(position,line,data)
  }
}
export default debug