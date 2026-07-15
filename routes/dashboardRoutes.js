const express = require("express");

const router = express.Router();

const {
  getDashboard,
  adminDashboard,
} = require("../controllers/dashboardController");

router.get("/", getDashboard);

// Admin Dashboard
router.get("/admin", adminDashboard);

module.exports = router;