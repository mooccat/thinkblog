const Base = require('./base.js');
module.exports = class extends Base {
  __before() {
    return Promise.resolve(super.__before()).then(flag => {
      if (flag === false) return false;
      if (flag === 'not login') {
        this.status = 401;
        this.fail('请登录');
      }
      // 其他逻辑代码
    });
  }
};
