const BaseRest = require('./rest.js');
var hljs = require('highlight.js');
var md = require('markdown-it')({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) {
            }
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    },
});

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
      let newArticle = this.post()
      if(newArticle.isMd){
        newArticle.html = md.render(newArticle.content);
      }
      const article = new Article(newArticle)
      const data = await article.save();
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
