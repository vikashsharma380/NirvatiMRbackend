const Attendance = require("../models/Attendance");
const Visit = require("../models/Visit");

exports.getDashboard = async (req, res) => {
  try {

    const { user } = req.query;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Today Start
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Today End
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Attendance
    const attendance = await Attendance.findOne({
      user,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    // Today's Visits
    const visits = await Visit.find({
      mr: user,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    let todayOrder = 0;
    let todaySample = 0;
    let todayCollection = 0;

    visits.forEach((visit) => {
      todayOrder += visit.order?.length || 0;
      todaySample += visit.sample?.length || 0;

      if (visit.order?.length) {
        visit.order.forEach((item) => {
          todayCollection += Number(item.amount || 0);
        });
      }
    });

    const pendingVisit = visits.filter(
      (v) => v.status === "Pending"
    ).length;

    const completedVisit = visits.filter(
      (v) => v.status === "Completed"
    ).length;

    res.status(200).json({
      success: true,
      dashboard: {
        attendance: !!attendance,

        checkIn: attendance?.checkIn || "--:--",

        checkOut: attendance?.checkOut || "--:--",

        workingHours: attendance?.workingHours || "00:00",

        todayVisit: visits.length,

        todayOrder,

        todaySample,

        pendingVisit,

        completedVisit,

        todayExpense: attendance?.expense || 0,

        todayCollection,
      },
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};