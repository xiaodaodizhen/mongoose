// ------------------------增加虚拟属性
let mongoose = require("mongoose");
let conn = mongoose.createConnection("mongodb://127.0.0.1/bolg");// "协议:ip/数据库名字"
let PersonSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    phone: String
});

// 创建虚拟属性full_name,取实例上的full_name字段的值，则把get函数返回的返回值给他
PersonSchema.virtual("full_name").get(function () {// 此处不能使用箭头函数,this是PersonSchema
    return this.first_name + this.last_name;
});

let Person = conn.model("Person", PersonSchema);
let p = new Person({ phone: "010-54545", first_name: "张", last_name: "三" });
p.save();

console.log(p.full_name);