const express = require("express");
const mongoose = require("mongoose");
const questionRouter = require("./routes/questions");
const loginRouter = require("./routes/login")
const registerRouter = require("./routes/register")
const app = express();

mongoose.connect("mongodb+srv://slavinav:9911129278@cluster0.zf1m8.mongodb.net/Diploma?retryWrites=true&w=majority");
app.set("view engine", "ejs");

app.get('/', function(req, res) {
    res.render('questions/index');
  });


app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use("/questions", questionRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);



app.listen(5000);
