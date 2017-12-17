const Base = require('./base.js');
module.exports = class extends Base {
  __before() {
    // 通过 Promise.resolve 将返回值包装为 Promise
    // 如果返回值确定为 Promise，那么就不需要再包装了
    return Promise.resolve(super.__before()).then(flag => {
      // 如果父级想阻止后续继承执行会返回 false，这里判断为 false 的话不再继续执行了。
      if (flag === false) return false;
      
      // 其他逻辑代码
    });
  }
  indexAction() {

  }
  postAction() {
    if (!this.ctx.state.user) {
      this.status = 401;
      this.fail('请登录');
      return false
    }
    const rules = {
      name: {
        string: true, // 字段类型为 String 类型
        required: true // 字段必填
      }
    };
    const flag = this.validate(rules);
    if (!flag) {
      this.ctx.status = 400;
      this.fail('validate error', this.validateErrors);
      return false;
    } else if (!this.ctx.state.user || !this.ctx.state.user.isAdmin) {
      this.ctx.status = 400;
      this.fail({
        errmsg: '没有权限'
      });
      return false;
    }
  }
};
