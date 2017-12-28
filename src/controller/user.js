const Base = require('./base.js');

module.exports = class extends Base {
  __before() {

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
      email: this.post().email,
      isAdmin: true
    });
    if (data) {
      const bcryptService = think.service('bcrypt');
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
  async loginAction() {
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
  async registerAdminAction() {
    try {
      const user = this.mongoose('user', 'mongoose'); // use `mongoose` adapter type
      const admin = await user.find({isAdmin: true});
      if (admin.length > 0) {
        this.status = 400;
        return this.fail({errmsg: '已经存在管理员角色，请使用管理员账户增加角色'});
      }
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
        isAdmin: true,
        token: token
      }).save();
      this.success(data);
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
  async registerAction() {
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
