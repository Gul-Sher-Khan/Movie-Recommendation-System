const mongoose = require("mongoose");

const awardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide an award name"],
  },
  year: {
    type: Number,
    required: [true, "Please provide the year of the award"],
  },
  category: {
    type: String,
    required: [true, "Please provide the award category"],
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "recipientModel",
    required: [true, "Please provide a recipient"],
  },
  recipientModel: {
    type: String,
    required: [true, "Please provide the recipient model"],
    enum: ["Movie", "People"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Award = mongoose.model("Award", awardSchema);

module.exports = Award;
