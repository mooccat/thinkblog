module.exports = class extends think.Mongoose {
  get schema() {
    const schema = new think.Mongoose.Schema({
      name: {
        type: String,
        unique: true
      }
    });
    return schema;
  }
};
