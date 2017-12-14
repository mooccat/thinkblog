const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
  async getAction() {
    const article = this.mongoose('article', 'mongoose'); // use `mongoose` adapter type
    const data = await article.find(this.ctx.param()).populate({
      path: 'sort',
      model: this.mongoose('sort', 'mongoose')
    }).populate({
      path: 'tags',
      model: this.mongoose('tag', 'mongoose')
    }).populate({
      path: 'author',
      model: this.mongoose('user', 'mongoose'),
      select: 'name _id'
    });
    this.success(data);
  }
  async postAction() {
    try {
      const Article = this.mongoose('article', 'mongoose'); // use `mongoose` adapter type
      const newArticle = new Article(this.post());
      const data = await newArticle.save();
      this.success(data);
    } catch (e) {
      if (e.code == 11000) {
        this.status = 400;
        return this.fail({
          errmsg: "已经存在同名文章"
        });
      } else {
        this.status = 500;
        return this.fail(e);
      }
    }
  };
};
