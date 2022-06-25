const User = require("../../models/user.model");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");

const auth = async (req, res) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).send({ errors: [{ msg: "Auth failed" }] });
  }

  try {
    const data = await jwt.decode(token);

    const foundUser = await User.findById(data.user._id).select("-password");
    if (!foundUser) {
      return res.status(401).send({ errors: [{ msg: "Auth failed" }] });
    }

    const returnObj = { token, user: foundUser };

    res.send(returnObj);
  } catch (err) {
    return res.status(401).send({ errors: [{ msg: "Auth failed" }] });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).send({ errors: [{ msg: "Wrong details." }] });
    }

    // check if passwords are valid
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(400).send({ errors: [{ msg: "Wrong details." }] });
    }

    const userToken = await User.findById(foundUser._id).select("-password");
    const token = await generateToken(userToken);

    const resultObj = {
      token,
      user: userToken,
    };

    res.send(resultObj);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const match = await User.findOne({ email });
    if (match) {
      return res.status(400).send({ errors: [{ msg: "Email is taken." }] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const userToken = await User.findById(newUser._id).select("-password");
    const token = await generateToken(userToken);

    const resultObj = {
      token,
      user: userToken,
    };

    res.send(resultObj);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

module.exports = { login, register, auth };
