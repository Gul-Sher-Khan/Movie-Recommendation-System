const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomListSchema = new Schema({
  listName: {
    type: String,
    required: true,
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("CustomList", CustomListSchema);
