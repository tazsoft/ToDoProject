//Basic Lib Import
var express=require('express');
const router = require('./src/routes/api');
var app=new express();
var bodyParser=require('body-parser');

//sucrity middleware difie..
var ratelimit=require('express-rate-limit');
var sanitize=require('express-mongo-sanitize')  
var hpp=require('hpp')  
var cors=require('cors')  
var xss=require('xss-clean')  
var helmet=require('helmet');  

//Database lib Import
const mongooose =require('mongoose')

//sucrity middleware use...
app.use(hpp())
app.use(cors())
app.use(sanitize())
app.use(xss())
app.use(helmet())

//Body Parser Implement
app.use(bodyParser.json())

//Request Ratelimite
const limiter = ratelimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	
})
app.use(limiter)
//Mongo DB Database Connection
let URI="mongodb://127.0.0.1:27017/ToDo";
let OPTION={user:'',pass:'',autoIndex: true}
mongooose.connect(URI,OPTION,(error)=>{
console.log("Connection Success")
console.log(error)
})
//Routing Implement
app.use("/api/v1/",router);
//Undifine Route  
app.use("*",(req,res)=>{
    res.status(404).json({"status":"fail","data":"undifine"});
})
module.exports=app;
