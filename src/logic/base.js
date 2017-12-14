module.exports = class extends think.Logic {
  async __before() {
    const userService = think.service('user');
    return userService.loadingUserInfo(this);
  }
};
