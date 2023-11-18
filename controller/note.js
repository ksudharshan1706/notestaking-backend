const mongoose = require("mongoose");
const Note = require("../models/note");

exports.addNote = async (req, res, next) => {
  try {
    // console.log("first", {
    //   ...req.body,
    // });
    const newNote = new Note({
      ...req.body,
    });
    // console.log("newNote", newNote);
    const savedNote = await newNote.save();
    res.status(200).json(savedNote._doc);
  } catch (err) {
    next(err);
  }
};

exports.getNotes = async (req, res, next) => {
  const _id = req.params.id;
  // console.log(_id);
  try {
    const notesdata = await Note.find({ userId: _id });
    // console.log("contoller notes line 29", notesdata);
    if (notesdata.length == 0) {
      res.status(200).json({ notesdata });
    }
    res.status(200).json(notesdata);
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  // console.log("req.params", typeof req.params.id);
  const id = req.params.id;
  // console.log("req.params", id);
  try {
    console.log(id);
    const notesdata = await Note.findOneAndDelete({ NoteId: id });
    res.status(200);
  } catch (err) {
    next(err);
  }
};

exports.updateNote = async (req, res, next) => {
  const { id, desc, NoteId } = req.body;
  // const _id = id;
  // console.log("updatenote ",req.params);
  try {
    const notesdata = await Note.findOneAndUpdate({ NoteId }, { desc });
    // const notesdata = await Note.findByIdAndUpdate({ _id }, { desc });
    // console.log(notesdata);
  } catch (err) {
    next(err);
  }
};

exports.searchNote = async (req, res, next) => {
  const { id, desc } = req.body;
  // console.log(id, desc);
  const _id = id;
  try {
    const notesdata = await Note.findByIdAndUpdate({ _id }, { desc });
    // const notesdata = await Note.findById({ _id });
    // console.log("contoller notes line 29", notesdata);
    // if (notesdata.length == 0) {
    //   res.status(200).json({ notesdata });
    // }
    // console.log("contoller notes line 29", notesdata);
    // res.status(200).json(notesdata);
  } catch (err) {
    next(err);
  }
};
