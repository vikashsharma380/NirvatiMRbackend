const Party = require("../models/Party");

// Create Party
exports.createParty = async (req, res) => {
  try {
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

// Get All by Type
exports.getParties = async (req, res) => {
  try {
    const { type } = req.params;

    const parties = await Party.find({
      type,
      status: true,
    }).sort({ name: 1 });

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

// Get Single
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

// Update
exports.updateParty = async (req, res) => {
  try {
    const party = await Party.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

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

// Delete (Soft Delete)
exports.deleteParty = async (req, res) => {
  try {
    await Party.findByIdAndUpdate(req.params.id, {
      status: false,
    });

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