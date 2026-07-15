const Visit = require("../models/Visit");

exports.createVisit = async (req, res) => {
  try {
    const {

mr,

party,

visitType,

purpose,

order=[],

sample=[],

detailing=[],

payment,

followUp,
complaint,
remarks,

deliveryDate,

latitude,

longitude,

address,

visitPhoto,

selfie

}=req.body;

    // Calculate Total Amount
    let totalAmount = 0;

    order.forEach((item) => {
      item.amount = item.qty * item.rate;
      totalAmount += item.amount;
    });

    const visit = await Visit.create({
      mr,
      party,
      visitType,

      activities: purpose,

      order,
      sample,
      detailing,
payment,
complaint,

      followUp,
      remarks,
      deliveryDate,

      location: {
        latitude,
        longitude,
        address,
      },

      visitPhoto,
      selfie,

      checkIn: new Date(),
      checkOut: new Date(),

      duration: 0,

      totalAmount,

      status: "Completed",
    });

    res.status(201).json({
      success: true,
      message: "Visit Saved Successfully",
      data: visit,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

exports.getVisits = async (req, res) => {
  try {

    const visits = await Visit.find()
      .populate("mr", "name employeeId")
      .populate("party")
      .populate("order.product")
      .populate("sample.product")
      .populate("detailing")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: visits.length,
      data: visits,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};