let express = require("express");
let path = require("path");
let crypto = require("crypto");

let { User } = require("./model");

let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "html");//设置模板引擎
app.set("views", path.join(__dirname, "views"));// 配置模板路径
app.engine("html", require("ejs").__express);// 模板引擎渲染方法
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/signup", (req, res) => {
  let user = req.body;
  // user.password = crypto.createHmac("SHA256", "test").update(user.password).digest("hex");
  // 第一种插入数据方法
  // User.create(user, (err, doc) => {
  //   if (err) {
  //     res.redirect("back");
  //   } else {
  //     res.redirect('/signin');
  //   }
  // });

  // 第二种插入数据方法
  user = new User(user);
  user.save(function (err, doc) {
    console.log(res.redirect);
    if (err) {
      res.redirect("back");
    } else {
      res.redirect('/signin');
    }
  });
});

app.get("/signin", (req, res) => {
  let user = req.body;
  // user.password = crypto.createHmac("sha256", "xgtest").update(user.password).digest("hex");
  User.findOne(user, (err) => {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/");
    }
  });
});

app.post("/signin", (req, res) => {
  res.send('signin');
});


app.get("/", (req, res) => {
  res.send("home");
});


app.listen(8080);