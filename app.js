var express = require("express");
var path = require("path");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cookies = require("cookies");

var app = express();
app.use("/public",express.static(path.resolve(__dirname+"/public")));
// 定义icon图标
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.set("views","/views");

if("production" === process.env.NODE_ENV){
    console.log("生产环境");
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
    connection.query("select * from users limit 2",(err,rows,fields)=>{
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

//app.listen(port, [hostname], [backlog], [callback])
app.listen(3000,function(){
    console.log("server start");
});
