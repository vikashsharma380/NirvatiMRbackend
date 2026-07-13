const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    checkIn: {
      type: Date,
    },

    checkOut: {
      type: Date,
    },

    checkInLocation: {
      latitude: Number,
      longitude: Number,
      address: String,
    },

    checkOutLocation: {
      latitude: Number,
      longitude: Number,
      address: String,
    },

    selfie: {
      type: String,
      default: "",
    },

    workingHours: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);