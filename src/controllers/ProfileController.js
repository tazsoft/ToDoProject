// Jessone web token
var jwt = require('jsonwebtoken');
// registation_system
const ProfileModel = require("../models/ProfileModel");
exports.CreateProfile = (req, res) => {
  let reqBody = req.body;
  ProfileModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
    } else {
      res.status(200).json({ status: "Insert Success", data: data });
    }
  });
};
// UserLogin_system
exports.UserLogin = (req, res) => {
  var UserName = req.body["UserName"];
  var Password = req.body["Password"];

  ProfileModel.find({ UserName: UserName, Password: Password }, (err, data) => {
   if (err) {
    res.status(400).json({ status: "Fail", data: err });
    
   }else{
    if (data.length > 0) {
      let payload={ exp: Math.floor(Date.now() / 1000) + (60 * 60*24),data:data[0]}
      var token = jwt.sign(payload,'Secretkey123456789' );
        res.status(200).json({ status: "login sucdcess",token:token});
      } else {
        res.status(401).json({ status: "unothoriza" });
      }
   }
  });
};


// SelectProfile
exports.SelectProfile = (req, res) => {
  var UserName = req.headers['Username'];
  ProfileModel.find({ UserName: UserName}, (err, data) => {
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }
  });
};

// UpdateProfile
exports.UpdateProfile = (req, res) => {
  var UserName = req.headers['Username'];
  var reqBody = req.body;
  
  ProfileModel.updateOne({UserName: UserName},{$set:reqBody},{upsert:true},(err,data)=>{
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
      
    }else{
    res.status(200).json({ status: "Success", data: data });
    }
  })

  // res.status(200).json({status:"success",reqBody});

 
 
};
