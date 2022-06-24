const User = require('../models/user');
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.render("questions/register");
  } catch (error) {

    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  try{
    user = await user.save();
    res.redirect('./login')
  } catch(e) {
    res.render('questions/register')
    alert('Incorrect credentials')
  }

  
  }
);

module.exports = router;
