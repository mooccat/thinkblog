var hljs = require('highlight.js');
var md = require('markdown-it')({
  html: true,
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {
      }
    }
    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {
    }
    return '';
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
      if (this.isMd) {
        return md.render(this.content);
      } else {
        return this.content;
      }
    });
    schema.virtual('summary').get(function() {
      if (this.html.split('<!--More-->')[1]) {
        return this.html.split('<!--More-->')[0];
      } else {
        return '';
      }
    });
    schema.set('toJSON', { virtuals: true });
    return schema;
  }
};
