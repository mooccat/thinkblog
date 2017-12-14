module.exports = class extends think.Mongoose {
  get schema() {
    const schema = new think.Mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true
      },
      name: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      isAdmin: {type: Boolean, default: false},
      token: String
    });
    return schema;
  }
};
