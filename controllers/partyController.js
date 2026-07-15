const Party = require("../models/Party");

// =========================
// Create Party
// =========================
exports.createParty = async (req, res) => {
  try {

    const {
      name,
      mobile,
      type,
    } = req.body;

    const already = await Party.findOne({
      name,
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

    const { type } = req.params;
    const { search } = req.query;

    let filter = {
      type,
      status: true,
    };

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const parties = await Party.find(filter)
      .sort({ name: 1 });

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
// Delete Party
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