const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  role: {
    type: String,
    enum: ["Actor", "Director", "Crew"],
    required: [true, "Please provide a role"],
  },
  biography: {
    type: String,
    default: "",
  },
  awards: {
    type: [String],
    default: [],
  },
});

const People = mongoose.model("People", peopleSchema);

module.exports = People;
