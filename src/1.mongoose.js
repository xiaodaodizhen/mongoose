// mongoose是一个对象模型工具，就是把 对数据的操作 映射为 对对象的操作
let mongoose = require("mongoose");
// 1. 链接数据库--固定格式
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
});//,{collection:"preson"} 可以通过这种方式定义集合名称，如果不定义会使用默认的,默认的在第三步model的传入字符串参数转换而来


// 3. 通过连接创建模型,模型会关联、操作某个数据库，
let Preson = connection.model("Preson", PersonSchmea); // 字符串Preson是模型名称，=>转为小写，=>转为复数，例如：Preson=>preson=>people     Child=>child=>children,形成了数据库中的集合名字


// 4.通过model创建实体，
// 1）如果创建的对象中的字段在Schmea中没有被定义，则会被忽略
// 2）如果创建的对象中的字段在Schmea中未定义，则不会被保存此字段，但是对象中已有字段会被保存
// 3）字段类型不匹配会报错

// Preson是模型，他操作针对的是整个集合
// preson 是实体（Entity），他是单个文档或者说是对象

//-------------第一种插入数据的方法
// let preson = new Preson({ name: "xgtext", age: 3 });
// preson.save((err, doc) => {
//   // doc 保存成功后的文档
//   console.log(err, '----', doc);
// });

// ----------第二种插入数据的方法
// let presons = [];
// for (var i = 0; i < 10; i++) {
//   presons.push({ name: `xg${i}`, age: i });

// }
// create 方法，用来插入文档，类似于原声方法insert
// Preson.create(presons, (err, docs) => {
//   console.log(docs);
// });

/**
 * 《查询》
 * 
 * 查询的 find 方法用来在集合中查询文档，返回值和原声find方法类似，都是返回一个数组
 * 参数： 1 {age:3} 查询条件
 *       2 {name:1}  选填，name 值为1，代表查询出的结果只包含name字段（_id字段什么时候都会存在），name:0 代表除了name字段其他字段都要
 *       3 callback  选填
 */
// Preson.find({ age: 3 }, (err, docs) => {
//   console.log(docs);
// });





// #####  更新
/**
 * 一：方法一
 * 1.{age:3}是检索条件
 * 2.{age:200}是更新的内容，只更新age字段（即便传入的是整个文档，也不会直接覆盖文档，而是按字段覆盖），不会像原生方法一样，将所有未更新的属性全部覆盖；
 * 3.如果匹配到多条的话，默认只是更新第一条,设置{multi:true} 属性，会更新多条
 */

// Preson.update({ age: 3 }, { age: 200 },{multi:true}, (err, result) => {
//    console.log(result);
// });

// 二：方法二 原生方法的操作符在这里也是可用的 比如 $set  $inc 
// Preson.update({ age: 200 }, { $set: { age: 1000 } }, { multi: true }, (err, result) => {
//   console.log(result);  // { n: 1, nModified: 1, ok: 1 }  n：表示匹配的条数， nModified:实际更新的条数 ， ok:操作成功
// });


/**
 * 《删除》
 * remove ：默认会删除所有匹配的文档
 * 
 * {justOne:true} ： 只是删除第一条匹配的文档
 */
// Preson.remove({ age: 1 },{justOne:true}, (err, result) => {
//    console.log(result); // { n: 1, ok: 1 }  n：匹配了几条， ok是操作成功
// });


//------------------------------高级查询-----------------------

/**
 * 《单条查询》：适合登录注册密码功能
 * {age:5} 为检索条件，如果检索条件为{} 空对象的话，就会返回数组中的第一条
 */
// Preson.findOne({age:5}, (err, doc) => {
//   console.log(doc);
// });

/**
 * 《按ID查询文档》  与原生方法，使用格式不一样，但是功能和原理一样
 */
// Preson.findById("5b30a3f258fe4c7a74835ece", (err, doc) => {
//     console.log(doc);
// });


/**
 * 《比较运算符》  ： 比较年龄，或其他
 * $gt:大于
 * $gte: 大于等于
 * $lt:小于
 * $lte:小于等于
 */
// “且”的关系
// Preson.find({ age: { $gt: 1, $lt: 5 } }, (err, docs) => {
//   console.log(docs);
// });
// "或"的关系  实现报错：Can't use $or with Number.
Preson.find({ age: { $or: [{ $lt: 3 }, { $gt: 5 }] } }, (err, docs) => {
  console.log(err);
});