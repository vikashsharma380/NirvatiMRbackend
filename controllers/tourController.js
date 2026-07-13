const TourPlan = require("../models/TourPlan");

// Create Tour
exports.createTour = async (req, res) => {
  try {

    const tour = await TourPlan.create(req.body);

    res.status(201).json({
      success: true,
      message: "Tour Plan Created",
      data: tour,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// Today's Tour
exports.getTodayTour = async (req, res) => {
  try {

    const { mr } = req.params;

    const start = new Date();
    start.setHours(0,0,0,0);

    const end = new Date();
    end.setHours(23,59,59,999);

    const tour = await TourPlan.findOne({
      mr,
      date: {
        $gte: start,
        $lte: end,
      },
    })
      .populate("parties.party");

    res.json({
      success: true,
      data: tour,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// Complete Party Visit
exports.completeParty = async (req, res) => {

  try {

    const { tourId, partyId } = req.params;

    const tour = await TourPlan.findById(tourId);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour Not Found",
      });
    }

    const item = tour.parties.find(
      p => p.party.toString() === partyId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Party Not Found",
      });
    }

    item.status = "Completed";

    if (
      tour.parties.every(
        p => p.status === "Completed"
      )
    ) {
      tour.status = "Completed";
    }

    await tour.save();

    res.json({
      success: true,
      message: "Visit Updated",
      data: tour,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};