const User = require("../models/User");

// =======================
// GET ALL MR
// =======================

exports.getMRs = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const users = await User.find({
      role: "mr",
      name: {
        $regex: search,
        $options: "i",
      },
    })
      .select("-password")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// CREATE MR
// =======================

exports.createMR = async (req, res) => {
  try {
    const {
      employeeId,
      name,
      mobile,
      email,
      password,
      headquarters,
    } = req.body;

    if (
      !employeeId ||
      !name ||
      !mobile ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const exists = await User.findOne({
      $or: [
        { employeeId },
        { mobile },
      ],
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message:
          "Employee ID or Mobile already exists",
      });
    }

    const mr = await User.create({
      employeeId,
      name,
      mobile,
      email,
      password,
      headquarters,
      role: "mr",
    });

    const data = mr.toObject();
    delete data.password;

    res.status(201).json({
      success: true,
      message: "MR Created Successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// UPDATE MR
// =======================

exports.updateMR = async (req, res) => {
  try {
    const mr = await User.findById(req.params.id);

    if (!mr) {
      return res.status(404).json({
        success: false,
        message: "MR Not Found",
      });
    }

    const duplicate = await User.findOne({
      _id: {
        $ne: req.params.id,
      },
      $or: [
        {
          employeeId:
            req.body.employeeId,
        },
        {
          mobile: req.body.mobile,
        },
      ],
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message:
          "Employee ID or Mobile already exists",
      });
    }

    mr.employeeId =
      req.body.employeeId;

    mr.name = req.body.name;

    mr.mobile = req.body.mobile;

    mr.email = req.body.email;

    mr.headquarters =
      req.body.headquarters;

    if (
      req.body.password &&
      req.body.password.trim() !== ""
    ) {
      mr.password = req.body.password;
    }

    await mr.save();

    const data = mr.toObject();
    delete data.password;

    res.json({
      success: true,
      message: "MR Updated Successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// ACTIVATE / DEACTIVATE
// =======================

exports.toggleMR = async (req, res) => {
  try {
    const mr = await User.findById(
      req.params.id
    );

    if (!mr) {
      return res.status(404).json({
        success: false,
        message: "MR Not Found",
      });
    }

    mr.isActive = !mr.isActive;

    await mr.save();

    const data = mr.toObject();
    delete data.password;

    res.json({
      success: true,
      message: mr.isActive
        ? "MR Activated"
        : "MR Deactivated",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// DELETE MR
// =======================

exports.deleteMR = async (req, res) => {
  try {
    const mr = await User.findById(
      req.params.id
    );

    if (!mr) {
      return res.status(404).json({
        success: false,
        message: "MR Not Found",
      });
    }

    await mr.deleteOne();

    res.json({
      success: true,
      message: "MR Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};