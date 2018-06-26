//########################################################<分页查询>##############################

let mongoose = require("mongoose");
let connection = mongoose.createConnection("mongodb://127.0.0.1/xgtest");
// 如果打开数据库链接失败，会触发error事件
connection.on("error", (err) => {
  console.log('err:', err);
});
// 如果数据库链接成功打开了数据库，那么会触发open事件
connection.on("open", (msg) => {
  console.log("msg:", msg);
});

// 2. 创建Schmea（skeimer发音） 创建数据库骨架模型，用来定义 集合 、字段的名称和类型

let PersonSchmea = new mongoose.Schema({
  name: String,
  age: Number
});

let Preson = connection.model("Preson", PersonSchmea);



let pageNum = 2;
let pageSize = 3;
// 分页查询  skip() 跳过     limit() 数据条数  sort() 排序  exec()执行
Preson.find().skip((pageNum - 1) * pageSize).limit(pageSize).sort({ age: 1 }).exec((err, docs) => {
   console.log(docs);
});


// noSql  解释为  not only sql

