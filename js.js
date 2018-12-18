const express=require("express");
const http=express();
const dbb=require("./js/db.js");
const db = new dbb("angular1");
 
//跨域
http.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*");
	next();
})

//添加
http.get("/add",(req,res)=>{
	let data=req.query;
	console.log(typeof data)
	db.insertOne("list",data,function(err){
		if(err) throw err
		res.send("添加成功")
	})
})


//渲染
http.get("/msg",(req,res)=>{
	db.find("list",{},function(err,data1){
		if(err)throw err;
		res.send(data1)
	})
})

//删除
http.get("/del",(req,res)=>{
	let id=req.query.id;
	db.deleteById("list",id,function(err){
		if(err)throw err
		res.send("删除成功")
	})
})


//服务器开启
http.listen(8080,()=>{
	console.log("run")
})