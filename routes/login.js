const store = require('../public/store')
const User = require('../models/user');
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.render("questions/login");
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/', async (req, res) => {
  const currentUser = await User.find({ username: req.body.username});
  if(currentUser[0].password === req.body.password){
    store.username = currentUser[0].username;
    res.redirect('/questions/')
  }
  else{
    res.redirect('/login')
  }
})

module.exports = router;
