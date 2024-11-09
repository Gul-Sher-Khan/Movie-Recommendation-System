const mongoose = require("mongoose");

const boxOfficeSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: [true, "Please provide a movie"],
  },
  openingWeekendEarnings: {
    type: Number,
    required: [true, "Please provide opening weekend earnings"],
  },
  totalEarnings: {
    type: Number,
    required: [true, "Please provide total earnings"],
  },
  internationalRevenue: {
    type: Number,
    required: [true, "Please provide international revenue"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BoxOffice = mongoose.model("BoxOffice", boxOfficeSchema);

module.exports = BoxOffice;
