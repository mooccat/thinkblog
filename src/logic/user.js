const Base = require('./base.js');
module.exports = class extends Base {
  __before() {
    return Promise.resolve(super.__before()).then(flag => {
      if (flag === false) return false;
      // 其他逻辑代码
      if (this.ctx.action === 'loginAdmin' || this.ctx.action === 'registerAdmin') {

      } else {
        if (!this.ctx.state.user) {
          this.status = 401;
          this.fail('请登录');
          return false;
        }
      }
    });
  }
  loginupAction() {
    const rules = {
      email: {
        string: true, // 字段类型为 String 类型
        required: true, // 字段必填
        trim: true // 字段需要trim处理
      },
      password: {
        string: true, // 字段类型为 String 类型
        required: true // 字段必填
      },
      name: {
        required: true,
        string: true // 字段类型为 String 类型
      }
    };
    const flag = this.validate(rules);
    if (!flag) {
      this.ctx.status = 400;
      this.fail('validate error', this.validateErrors);
      return false;
    }
  }
};
