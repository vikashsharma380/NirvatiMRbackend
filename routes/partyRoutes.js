const express = require("express");

const router = express.Router();

const {
  createParty,
  getParties,
  getParty,
  updateParty,
  deleteParty,
} = require("../controllers/partyController");

router.post("/", createParty);

router.get("/:type", getParties);

router.get("/single/:id", getParty);

router.put("/:id", updateParty);

router.delete("/:id", deleteParty);

module.exports = router;