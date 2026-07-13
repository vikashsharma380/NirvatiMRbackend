const mongoose = require("mongoose");

const tourPartySchema = new mongoose.Schema({
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party",
    required: true,
  },

  sequence: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Completed", "Skipped"],
    default: "Pending",
  },

  visitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visit",
    default: null,
  },
});

const tourPlanSchema = new mongoose.Schema(
  {
    mr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    area: String,

    beat: String,

    parties: [tourPartySchema],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TourPlan", tourPlanSchema);