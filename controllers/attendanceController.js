const Attendance = require("../models/Attendance");

exports.checkIn = async (req, res) => {
  try {

    const {
      user,
      latitude,
      longitude,
      address,
      selfie,
    } = req.body;

    const today = new Date().toISOString().split("T")[0];

    const already = await Attendance.findOne({
      user,
      date: today,
    });

    if (already) {
      return res.status(400).json({
        success: false,
        message: "Already Checked In",
      });
    }

    const attendance = await Attendance.create({
      user,
      date: today,
      checkIn: new Date(),
      selfie,
      checkInLocation: {
        latitude,
        longitude,
        address,
      },
    });

    res.json({
      success: true,
      message: "Check In Successful",
      data: attendance,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
exports.checkOut = async (req, res) => {

  try {

    const {
      user,
      latitude,
      longitude,
      address,
    } = req.body;

    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      user,
      date: today,
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Check In First",
      });
    }

    attendance.checkOut = new Date();

    attendance.checkOutLocation = {
      latitude,
      longitude,
      address,
    };

    attendance.workingHours =
      (
        attendance.checkOut -
        attendance.checkIn
      ) /
      (1000 * 60 * 60);

    await attendance.save();

    res.json({
      success: true,
      message: "Check Out Successful",
      data: attendance,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};