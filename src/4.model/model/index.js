let mongoose = require("mongoose");
let conn = mongoose.createConnection("mongodb://127.0.0.1/bolg");// "协议:ip/数据库名字"
let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now // 赋的默认值
  }
})
let User = conn.model("User", UserSchema);

exports.User = User;
