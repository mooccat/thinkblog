module.exports = class extends think.Mongoose {
  get schema() {
    const schema = new think.Mongoose.Schema({
      content: {
        type: String
      },
      article: {
        type: think.Mongoose.Schema.Types.ObjectId,
        ref: 'article'
      },
      author: {
        type: think.Mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      reply: {
        type: think.Mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      creat_at: {
        type: Date,
        default: Date.now
      },
      update_at: {
        type: Date,
        default: Date.now
      }
    });
    return schema;
  }
};
