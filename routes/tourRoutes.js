const express = require("express");

const router = express.Router();

const {
  createTour,
  getTodayTour,
  completeParty,
} = require("../controllers/tourController");

router.post("/", createTour);

router.get("/today/:mr", getTodayTour);

router.put("/:tourId/:partyId", completeParty);

module.exports = router;