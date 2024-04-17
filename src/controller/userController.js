const { User, sequelize } = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/auth");

const register = async (req, res) => {
  await sequelize.sync({ alter: true });
  const user = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  const savedUser = await User.create(user);
  res.send("user saved");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Password is incorrect" });
    }
    const token = await generateToken(user.email);
    res.json({
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = { register, login };
