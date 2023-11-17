const express = require("express");
const router = express.Router();
const {
  addNote,
  getNotes,
  deleteNote,
  updateNote,
  searchNote,
} = require("../controller/note.js");

router.post("/addnote", addNote);
router.get("/getNotes/:id", getNotes);
router.get("/deleteNote/:id", deleteNote);
router.post("/updateNote", updateNote);
router.post("/searchNote/:desc", searchNote);
module.exports = router;
