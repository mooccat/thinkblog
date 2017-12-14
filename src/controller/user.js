const Base = require('./base.js');

module.exports = class extends Base {
  __before() {
    // // 通过 Promise.resolve 将返回值包装为 Promise
    // // 如果返回值确定为 Promise，那么就不需要再包装了
    // return Promise.resolve(super.__before()).then(flag => {
    //   // 如果父级想阻止后续继承执行会返回 false，这里判断为 false 的话不再继续执行了。
    //   if (flag === false) return false;

    //   // 其他逻辑代码
    // });
  }
  indexAction() {
    this.success('123');
  }
  async getAction() {
    const user = this.mongoose('user', 'mongoose'); // use `mongoose` adapter type
    const data = await user.find({}, {
      password: 0,
      token: 0
    });
    this.success(data);
  }
  async deleteAction() {
    const user = this.mongoose('user', 'mongoose'); // use `mongoose` adapter type
    const data = await user.remove({'_id': this.get('_id')});
    this.success(data);
  }
  async updateAction() {
    const user = this.mongoose('user', 'mongoose'); // use `mongoose` adapter type
    const newUser = this.post();
    const tokenService = think.service('token');
    const token = tokenService.createToken({
      'email': newUser.email
    });
    newUser.token = token;
    const id = newUser._id;
    delete newUser._id;
    const data = await user.update({'_id': id}, newUser);
    this.success(data);
  }
  async loginAdminAction() {
    const user = this.mongoose('user', 'mongoose'); // use `mongoose` adapter type
    const tokenService = think.service('token');
    const token = tokenService.createToken({
      'email': this.post().email
    });
    const data = await user.findOne({
      email: this.post().email
    });
    if (data) {
      const bcryptService = think.service('bcrypt');
      console.log(bcryptService.compare(this.post().password, data.password));
      if (bcryptService.compare(this.post().password, data.password)) {
        await user.update({
          email: this.post().email
        }, {token: token});
        data.token = token;
        this.success(data);
      } else {
        this.ctx.status = 400;
        this.fail({
          errmsg: '密码错误'
        });
      }
    } else {
      this.ctx.status = 400;
      this.fail({
        errmsg: '该邮箱没有注册'
      });
    }
  }
  async loginupAction() {
    try {
      const user = this.mongoose('user', 'mongoose'); // use `mongoose` adapter type
      const tokenService = think.service('token');
      const userInfo = {
        email: this.post().email
      };
      const token = tokenService.createToken(userInfo);

      const bcryptService = think.service('bcrypt');
      const password = bcryptService.hashPassword(this.post().password);

      const data = await new user({
        email: this.post().email,
        name: this.post().name,
        password: password,
        token: token
      }).save();
      this.success(data.token);
    } catch (e) {
      if (e.code === 11000) {
        this.status = 400;
        return this.fail({
          errmsg: '邮箱已经注册'
        });
      } else {
        this.status = 500;
        return this.fail(e);
      }
    }
  }
};
