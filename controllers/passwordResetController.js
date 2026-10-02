const crypto = require("crypto");
const User = require("../models/User");
const { sendWhatsApp } = require("../utils/whatsapp");

const OTP_MINUTES = 10;
const VERIFIED_MINUTES = 10;

// ===============================
// FORGOT PASSWORD - SEND OTP
// ===============================
exports.forgotPassword = async (req, res) => {
  try {
    const mobile = String(req.body.mobile || "").replace(/\D/g, "");

    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit mobile number",
      });
    }

    const user = await User.findOne({
      mobile,
      isActive: true,
    });

    // Security: user exist kare ya nahi,
    // same response denge
    if (!user) {
      return res.json({
        success: true,
        message:
          "If this mobile is registered, an OTP has been sent on WhatsApp.",
      });
    }

    // Generate 6 digit OTP
    const otp = String(
      crypto.randomInt(100000, 1000000)
    );

    // OTP ko database me plain text me nahi rakhenge
    const otpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    user.resetOtpHash = otpHash;

    user.resetOtpExpires = new Date(
      Date.now() + OTP_MINUTES * 60 * 1000
    );

    user.resetOtpVerifiedUntil = null;

    await user.save();

    // WhatsApp message
    const message = `🔐 *NIRVATI HERBAL*

Your password reset OTP is: *${otp}*

This OTP is valid for ${OTP_MINUTES} minutes.

Do not share this OTP with anyone.

If you did not request a password reset, please ignore this message.`;

    await sendWhatsApp({
      mobile: user.mobile,
      message,
    });

    return res.json({
      success: true,
      message: "OTP sent to your registered WhatsApp number.",
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to send OTP. Please try again.",
    });
  }
};

// ===============================
// VERIFY OTP
// ===============================
exports.verifyResetOtp = async (req, res) => {
  try {
    const mobile = String(req.body.mobile || "").replace(/\D/g, "");
    const otp = String(req.body.otp || "").trim();

    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "Enter the 6-digit OTP",
      });
    }

    const user = await User.findOne({
      mobile,
      isActive: true,
    });

    if (
      !user ||
      !user.resetOtpHash ||
      !user.resetOtpExpires
    ) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid or expired",
      });
    }

    // Check OTP expiry
    if (user.resetOtpExpires.getTime() < Date.now()) {
      user.resetOtpHash = "";
      user.resetOtpExpires = null;
      user.resetOtpVerifiedUntil = null;

      await user.save();

      return res.status(400).json({
        success: false,
        message:
          "OTP has expired. Please request a new OTP.",
      });
    }

    // Hash entered OTP
    const otpHash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    // Compare
    if (otpHash !== user.resetOtpHash) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP verified
    user.resetOtpHash = "";
    user.resetOtpExpires = null;

    user.resetOtpVerifiedUntil = new Date(
      Date.now() + VERIFIED_MINUTES * 60 * 1000
    );

    await user.save();

    return res.json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify OTP.",
    });
  }
};

// ===============================
// RESET PASSWORD
// ===============================
exports.resetPassword = async (req, res) => {
  try {
    const mobile = String(req.body.mobile || "").replace(/\D/g, "");

    const password = String(req.body.password || "");
    const confirmPassword = String(
      req.body.confirmPassword || ""
    );

    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({
      mobile,
      isActive: true,
    });

    if (
      !user ||
      !user.resetOtpVerifiedUntil
    ) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP first",
      });
    }

    // Check reset session expiry
    if (
      user.resetOtpVerifiedUntil.getTime() <
      Date.now()
    ) {
      user.resetOtpVerifiedUntil = null;

      await user.save();

      return res.status(400).json({
        success: false,
        message:
          "Password reset session expired. Please start again.",
      });
    }

    // Set new password
    // User.js ka pre-save bcrypt hash karega
    user.password = password;

    // Clear reset data
    user.resetOtpVerifiedUntil = null;
    user.resetOtpHash = "";
    user.resetOtpExpires = null;

    await user.save();

    return res.json({
      success: true,
      message:
        "Password changed successfully. You can now login.",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password.",
    });
  }
};