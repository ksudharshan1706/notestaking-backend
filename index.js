const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const noteRoute = require("./routes/note.js");

const app = express();
dotenv.config();
const Connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to DB"))
    .catch(() => console.log("connection error"));
};
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/auth", noteRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  Connect();
  console.log(`connected to Port NO. ${PORT}`);
});
