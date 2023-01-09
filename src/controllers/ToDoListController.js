// ToDoListCreat
const ToDoListModel = require("../models/ToDoListModel");

exports.CreateTodo = (req, res) => {
  let reqBody = req.body;

  let ToDoSubject = reqBody["ToDoSubject"];
  let ToDoDescription = reqBody["ToDoDescription"];
  var UserName = req.headers["Username"];
  let ToDoStatus = "New";
  let ToDoCreatDate = Date.now();
  let ToDoUpdateDate = Date.now();

  let postBody = {
    ToDoSubject: ToDoSubject,
    ToDoDescription: ToDoDescription,
    UserName: UserName,
    ToDoStatus: ToDoStatus,
    ToDoCreatDate: ToDoCreatDate,
    ToDoUpdateDate: ToDoUpdateDate,
  };
  ToDoListModel.create(postBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
    } else {
      res.status(200).json({ status: "Insert Success", data: data });
    }
  });
};

// SelectToDo
exports.SelectToDo = (req, res) => {
  var UserName = req.headers['Username'];
  ToDoListModel.find({ UserName: UserName}, (err, data) => {
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }
  });
};

//update ToDolist
exports.UpdateToDo = (req, res) => {
  var reqbody=req.body;
  var ToDoSubject= reqbody['ToDoSubject'];
  var ToDoDescription=reqbody['ToDoDescription'];
  var _id=reqbody['_id'];
  var ToDoUpdateDate= Date.now();

let postBody={
  ToDoSubject:ToDoSubject,
  ToDoDescription:ToDoDescription,
  ToDoUpdateDate:ToDoUpdateDate
}
  ToDoListModel.updateOne({_id:_id},{$set:postBody},{upsert:true},(err,data)=>{
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
      
    }else{
    res.status(200).json({ status: "Success", data: data });
    }
  })
}

//update status ToDolist
exports.UpdateStatusToDo = (req, res) => {
  var reqbody=req.body;
  
  var ToDoStatus=reqbody['ToDoStatus'];
  var _id=reqbody['_id'];
  var ToDoUpdateDate= Date.now();

let postBody={
  ToDoStatus:ToDoStatus,
  ToDoUpdateDate:ToDoUpdateDate
}
  ToDoListModel.updateOne({_id:_id},{$set:postBody},{upsert:true},(err,data)=>{
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
      
    }else{
    res.status(200).json({ status: "Success", data: data });
    }
  })
}

//remove ToDolist
exports.RemoveToDo = (req, res) => {
  var _id=req.body['_id'];

  ToDoListModel.remove({_id:_id},(err,data)=>{
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
      
    }else{
    res.status(200).json({ status: "Success", data: data });
    }
  })
}

// SelectToDoByStatus
exports.SelectToDoByStatus = (req, res) => {
  var UserName = req.headers['Username'];
  var ToDoStatus = req.body['ToDoStatus'];
  ToDoListModel.find({ UserName: UserName,ToDoStatus:ToDoStatus}, (err, data) => {
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }
  });
};

// SelectToDoByDate
exports.SelectToDoByDate = (req, res) => {
  var UserName = req.headers['Username'];
  var FromDate = req.body['FromDate'];
  var ToDate = req.body['ToDate'];

  ToDoListModel.find({ UserName: UserName,ToDoCreatDate:{$gte:new Date(FromDate),$lte:new Date(ToDate)}}, (err, data) => {
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }
  });
};
