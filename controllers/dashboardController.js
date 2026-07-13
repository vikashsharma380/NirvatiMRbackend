const Attendance = require("../models/Attendance");
const Visit = require("../models/Visit");

exports.getDashboard = async (req, res) => {
  try {

    const { user } = req.query;

    const today = new Date().toISOString().split("T")[0];

    // Attendance
    const attendance = await Attendance.findOne({
      user,
      date: today,
    });

    // Visits
    const visits = await Visit.find({
      mr: user,
      createdAt: {
        $gte: new Date(today),
      },
    });

    let todayOrder = 0;
    let todaySample = 0;

    visits.forEach((visit) => {

      todayOrder += visit.order.length;

      todaySample += visit.sample.length;

    });

    res.json({
      success: true,

      dashboard: {

        attendance: attendance ? true : false,

        todayVisit: visits.length,

        todayOrder,

        todaySample,

        pendingVisit: visits.filter(
          v => v.status === "Pending"
        ).length,

        completedVisit: visits.filter(
          v => v.status === "Completed"
        ).length

      }

    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};