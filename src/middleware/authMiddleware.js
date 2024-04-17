const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decodeToken = jwt.verify(token, "hello_kumar");
      // get user from token
      const user = await User.findOne({ where: { email: decodeToken.email } });
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
    }
  } else {
  }
};

module.exports = protect;
