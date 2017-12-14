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
    return schema;
  }
};
