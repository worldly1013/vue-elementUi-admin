export default new class Validate {
  constructor(){

  }
  // 手机号验证
  mobile(rule, value, callback){
    let regFormat = /^[1][3578][0-9]{9}$/;     //正确手机号
    if (!value) {
      callback();
    }
    if (!(regFormat.test(value) && value)) {
      callback(new Error('请输入正确手机号'));
    }else{
      callback();
    }
  }
  // 邮箱
  email(rule, value, callback){
    let mal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!value) {
      return callback(new Error('邮箱不能为空'));
    }
    if(!(mal.test(value))) {
      callback(new Error('请输入正确邮箱'));
    }else{
      callback();
    }
  }
  //

}
