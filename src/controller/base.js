module.exports = class extends think.Controller {
  async __before() {
    // // 登录、注册不验证token
    // console.log(this.ctx.action);
    // if (this.ctx.action === 'loginAdmin' || this.ctx.action === 'loginup') {
    //   return;
    // }
    // // 获取http-header token
    // const userToken = this.ctx.header.token;
    // // 调用tokenservice中间件
    // const tokenService = think.service('token');
    // // 验证token
    // const verifyTokenResult = tokenService.verifyToken(userToken);
    // console.log(verifyTokenResult);
    // if (verifyTokenResult !== 'fail') {
    //   // 获取用户信息
    //   const user = verifyTokenResult;
    //   const userModel = this.mongoose('user', 'mongoose'); // use `mongoose` adapter type
    //   const data = await userModel.find({'email': user.email, 'token': userToken});
    //   if (data) {
    //     this.ctx.user = data;
    //   } else {
    //     this.status = 401;
    //     return this.fail('请登录');
    //   }
    //   // 写入新token
    //   // const newToken = tokenService.createToken({
    //   //   userInfo: verifyTokenResult
    //   // });
    //   // this.ctx.response.append('token', newToken);
    // } else {
    //   this.status = 401;
    //   return this.fail('请登录');
    // }
  }
};
