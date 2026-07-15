const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register User
exports.register = async (req, res) => {
  try {

    const exists = await User.findOne({
      mobile: req.body.mobile,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Mobile already exists",
      });
    }

    const user = await User.create(req.body);

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      success: true,
      message: "User Created",
      data: userData,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// Login
exports.login = async (req, res) => {

  try {

    const { mobile, password } = req.body;

    const user = await User.findOne({
      mobile,
      isActive: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found or Inactive",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const userData = user.toObject();
    delete userData.password;

    res.json({
      success: true,
      token,
      user: userData,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};