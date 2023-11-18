const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    NoteId: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
