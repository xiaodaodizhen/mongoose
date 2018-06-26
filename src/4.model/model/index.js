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
});

// -------对模型上的方法进行拓展
UserSchema.statics.findOldest = function (callback) {
  return this.find().sort({ age: -1 }).limit(1).exec(callback);
}
UserSchema.statics.findByUserInfo = function (username, password, callback) {
  // this 指的是此Schema 对应的model
  return this.findOne({ username, password }, callback);
}

// --------对实例上的方法进行扩展
UserSchema.methods.exist = function (callback) {
  // this 指向的是某个实体
  let username = this.username;
  let password = this.password;
  return this.model("User").findOne({ username, password, callback });
}

/**
 * 区分什么时候使用statics 定义在model上，什么时候用mothods定义在实例上：
 * 1.对于整个集合的，比如按Id查询，查询年龄最大的学生，定义在模型上；
 * 2.对于某个人体对象的，比如查询某个用户的密码位数，定义在实例上；
*/


// 编写一个钩子函数，在某个动作（保存）之前执行一些逻辑,,在app.js 文件中使用save 会产生效果
UserSchema.pre("save",function(next){
  console.log("保存前",this);
  next();
  console.log("保存后",this);
});

let User = conn.model("User", UserSchema);


exports.User = User;
