const express = require("express");

const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

const {
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} = require("../controllers/passwordResetController");

// Existing Auth
router.post("/register", register);
router.post("/login", login);

// Forgot Password
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

module.exports = router;