const Base = require('./base.js');
module.exports = class extends Base {
  __before() {
    return Promise.resolve(super.__before()).then(flag => {
      if (flag === false) return false;
      // 其他逻辑代码
    });
  }
};
