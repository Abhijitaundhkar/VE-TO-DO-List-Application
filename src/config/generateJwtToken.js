require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, //prevent XSS attack cross site scripting attacks,
    sameSite: "strict", //CSRF attacks cross-site request forgery attacks,
    secure: false, //currently only for development not production
  });
};

module.exports = generateToken;
