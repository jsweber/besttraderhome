var express = require("express");
var path = require("path");
var swig = require("swig");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cookies = require("cookies");

var app = express();
app.use("/public",express.static(path.resolve(__dirname+"/public")));
// 定义icon图标
// app.use(favicon(__dirname + '/public/favicon.ico'));
//第一个参数表示模板名称，同时也是模板文件的后缀，第二个参数表示用于处理模板内容的方法
app.engine("html",swig.renderFile);
//设置模板存放的目录，param1 必须是views，param2是目录
app.set("views","./view");
//注册模板文件存放的目录，param1必须是view engine param2是和app.engine定义的模板引擎的名称一致的
app.set("view engine","html");

if("production" === process.env.NODE_ENV){
    console.log("生产环境");
}else{
    console.log("开发环境");
    swig.setDefaults({cache:false});
}
//会在req上保存一个body属性
app.use(bodyParser.urlencoded({extended:true}));

//创建数据库链接
var connection = mysql.createConnection(require("./db/mysql.config"));
connection.connect((err)=>{
    if(!err){
        console.log("database is connect");
    }else{
        console.log("Error connect database");
    }
});

app.get("/test",function(req,res){
    connection.query("select * from users limit 3",(err,rows,fields)=>{
        connection.end();
        if(!err){
            rows.forEach((row)=>{
                console.log(`${row.userid}|${row.username}|${row.passwd}`);
            });
            res.json({code:200,data:rows});
            return;
        }else{
            console.log("database query error");
            res.json({code:201});
        }
    });
});

app.get("/index",(req,res)=>{
    res.render("index",{
        param:"hello world!"
    });
});

app.use("/api",require("./router/api"));

//app.listen(port, [hostname], [backlog], [callback])
app.listen(3000,function(){
    console.log("server start");
});
