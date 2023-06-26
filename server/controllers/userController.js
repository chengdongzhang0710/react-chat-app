const bcrypt = require("bcrypt");
const User = require("../models/userModel");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ status: false, msg: "Username already existed." });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ status: false, msg: "Email already existed." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.create({ username, email, password: hashedPassword });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};
