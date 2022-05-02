const express = require("express");
const mongoose = require("mongoose");
const Questions = require("./models/questions");
const questionRouter = require("./routes/questions");
const app = express();

mongoose.connect("mongodb://localhost/27017");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("questions/index");
});
app.use("/question", questionRouter);

app.listen(5000);
