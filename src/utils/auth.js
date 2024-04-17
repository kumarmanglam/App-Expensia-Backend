const jwt = require("jsonwebtoken");

const generateToken = (email) => {
  return jwt.sign({ email }, "hello_kumar", { expiresIn: "30d" });
};

module.exports = { generateToken };
