const User = require("../model/user.schema");
const Todo = require("../model/todo.schema");
const VerificationToken = require("../model/emailVerification.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEamil");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const user = await User.findOne({ _id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const deletedUser = await User.findOneAndDelete({ _id });
    res.status(202).json(deletedUser);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const newUserData = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { ...newUserData, _id },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
// encode => رمزگذاری => encrypt
// decode => رمزنگاری => decrypt

const RegisterNewUser = async (req, res) => {
  console.log(req.body);
  try {
    const { password, ...restOfUserData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      password: hashedPassword,
      ...restOfUserData,
    });

    console.log("before new verification token");
    const newVerificationToken = await VerificationToken.create({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    console.log("before sending email");

    const message = `${process.env.BASE_URL}/user/verify/${newUser._id}/${newVerificationToken.token}`;

    await sendEmail("email verification", message, {
      address: newUser.email,
      name: newUser.name,
    });

    console.log("before response");

    res.status(201).json({
      message: "user registered successfully, please verify your email",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const VerifyUserEmail = async (req, res) => {
  try {
    const { id, token } = req.params;
    const user = await User.findById(id);
    // object | null
    if (!user) {
      return res.status(400).json({ msg: "invalid link" });
    }

    const verificationToken = await VerificationToken.findOne({ userId: id });

    if (!verificationToken) {
      return res.status(400).json({ msg: "invalid link" });
    }

    if (token !== verificationToken.token) {
      return res.status(400).json({ msg: "invalid link" });
    }

    user.verified = true;
    await user.save();
    await verificationToken.deleteOne();

    res
      .status(200)
      .send(
        "<h1 style='text-align: center;color: rgb(4, 202, 53);'>Email verified successfully</h1>"
      );
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "Authentication failed. email or password is not correct",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Authentication failed. email or password is not correct",
      });
    }

    if (!user.verified) {
      return res.status(401).json({
        error: "Authentication failed. This email has not been verified",
      });
    }

    const SECRET_KEY = process.env.SECRET_KEY;

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "30m",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getAllTodosOfOneUser = async (req, res) => {
  console.log("in get all todos of one user controller");
  console.log(req.userId);
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  getAllTodosOfOneUser,
  VerifyUserEmail,
  RegisterNewUser,
  LoginUser,
  deleteUser,
  updateUser,
};
