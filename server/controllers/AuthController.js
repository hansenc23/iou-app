const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../middlewares/validator');

register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  //Validate data before creating a new user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Check if user already exist in database
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).send('Email already exist!');
  }

  //Hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create a new user
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  //Save user to database
  try {
    const newUser = await user.save();
    res.send({ user: user._id });
    // res.send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

login = async (req, res, next) => {
  const { email, password } = req.body;

  //Validate login data
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Check if email exist in database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Email or password is invalid');
  }

  //Check if password is valid
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send('Email or password is invalid');
  }

  //Create an assign a jwt
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header('auth-token', token).send(token);

  // res.send('Logged in!');
};

module.exports = {
  register,
  login,
};
