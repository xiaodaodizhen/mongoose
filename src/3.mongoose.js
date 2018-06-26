

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

// 通过创建模型，关联、操作某个数据库
let Student = connection.model("Student", new mongoose.Schema({
  name: String
}));


let Score = connection.model("Score", new mongoose.Schema({
  stuid: {
    type: mongoose.Schema.Types.ObjectId,// 对象Idl类型
    ref: "Student"// 这是一个外键，引用的是哪个（Student）集合的主键
  },
  grade: Number
}));
//  给student、score数据库插入对象  create 方法返回的是一个promise 对象
// Student.create({ name: 'xgtest' }).then((student) => {
//   console.log(student);
//   Score.create({ stuid: student._id, grade: 100 }).then((score) => {
//     console.log(score);
//   });
// });


// 关联查询----方法一

// Score.findById("5b31b1d6ffd9dc58743cbd06", (err, score) => {
//   let { stuid, grade } = score;
//   Student.findById(stuid, (err, student) => {
//     let { name } = student;
//     console.log(`${name}：${grade}`);
//   });
// })


// 关联查询----方法二   populate()：填充，巴基和文档中的一个外键，转换为相对应的文档，如果有过个层级数据表，可以链式使用populate()方法
Score.findById("5b31b1d6ffd9dc58743cbd06").populate('stuid').exec((err, doc) => {
  console.log(`${doc.stuid.name}:${doc.grade}`);
});