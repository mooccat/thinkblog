var hljs = require('highlight.js');
var md = require('markdown-it')({
  html: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
      } catch (__) {
      }
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

module.exports = class extends think.Mongoose {
  get schema() {
    const schema = new think.Mongoose.Schema({
      title: String,
      sort: {
        type: think.Mongoose.Schema.Types.ObjectId,
        ref: 'sort'
      },
      tags: [{
        type: think.Mongoose.Schema.Types.ObjectId,
        ref: 'tag'
      }],
      comment: [{
        type: think.Mongoose.Schema.Types.ObjectId,
        ref: 'comment'
      }],
      isMd: {
        type: Boolean,
        default: false
      },
      author: {
        type: think.Mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      img: String,
      creat_at: {
        type: Date,
        default: Date.now
      },
      update_at: {
        type: Date,
        default: Date.now
      },
      content: String
    });
    schema.virtual('html').get(function() {
      if (this.md) {
        return md.render(this.content);
      } else {
        return this.content;
      }
    });
    schema.set('toJSON', { virtuals: true });
    return schema;
  }
};
