const express = require("express");

const router = express.Router();

const {
  createParty,
  getParties,
  getParty,
  updateParty,
  deleteParty,
  togglePartyStatus,
} = require("../controllers/partyController");
router.post("/", createParty);

router.get("/", getParties);

router.get("/:id", getParty);

router.put("/:id", updateParty);

router.patch("/:id/status", togglePartyStatus);

router.delete("/:id", deleteParty);

module.exports = router;