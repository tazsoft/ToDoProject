const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.headers["token-key"];

  jwt.verify(token,"Secretkey123456789",(err, decode) => {
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
    } else {
      //get username from decode token & add header
      let Username=decode['data']['UserName']
      req.headers.Username=Username
      next();
    }
  });
};
