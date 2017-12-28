const Base = require('./base.js');
module.exports = class extends Base {
  __before() {
    return Promise.resolve(super.__before()).then(flag => {
      if (flag === false) return false;
      // 其他逻辑代码
      if (this.ctx.action != 'get') {
        if (!this.ctx.state.user) {
          this.status = 401;
          this.fail('请登录');
          return false;
        }
      }
    });
  }
};
