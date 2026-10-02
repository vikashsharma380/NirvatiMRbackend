const Party = require("../models/Party");

// =========================
// Create Party
// =========================
exports.createParty = async (req, res) => {
  try {
    const { name, type } = req.body;

    const already = await Party.findOne({
      name: name.trim(),
      type,
      status: true,
    });

    if (already) {
      return res.status(400).json({
        success: false,
        message: `${type} already exists`,
      });
    }

    const party = await Party.create(req.body);

    res.status(201).json({
      success: true,
      message: "Party Added Successfully",
      data: party,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Get All Parties
// =========================
exports.getParties = async (req, res) => {
  try {
    const { type, search } = req.query;

    let filter = {};

    if (type) {
      filter.type = type;
    }

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const parties = await Party.find(filter).sort({
      name: 1,
    });

    res.json({
      success: true,
      count: parties.length,
      data: parties,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Get Single Party
// =========================
exports.getParty = async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);

    if (!party) {
      return res.status(404).json({
        success: false,
        message: "Party Not Found",
      });
    }

    res.json({
      success: true,
      data: party,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Update Party
// =========================
exports.updateParty = async (req, res) => {
  try {
    const party = await Party.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!party) {
      return res.status(404).json({
        success: false,
        message: "Party Not Found",
      });
    }

    res.json({
      success: true,
      message: "Updated Successfully",
      data: party,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Toggle Status
// =========================
exports.togglePartyStatus = async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);

    if (!party) {
      return res.status(404).json({
        success: false,
        message: "Party Not Found",
      });
    }

    party.status = !party.status;

    await party.save();

    res.json({
      success: true,
      message: "Status Updated Successfully",
      data: party,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Soft Delete
// =========================
exports.deleteParty = async (req, res) => {
  try {
    const party = await Party.findByIdAndUpdate(
      req.params.id,
      {
        status: false,
      },
      {
        new: true,
      }
    );

    if (!party) {
      return res.status(404).json({
        success: false,
        message: "Party Not Found",
      });
    }

    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};