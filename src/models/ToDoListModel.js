const mongoose=require('mongoose')

const DataSchema=mongoose.Schema({
UserName:{type:String},
ToDoSubject:{type:String},
ToDoDescription:{type:String},
ToDoStatus:{type:String},
ToDoCreatDate:{type:Date},
ToDoUpdateDate:{type:Date}
},{versionKey: false })

const ToDoListModel=mongoose.model('todolists',DataSchema)
module.exports=ToDoListModel