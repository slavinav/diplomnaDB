const express = require("express");
const Questions = require("../models/questions");
const router = express.Router();

// router.get("/new", (req, res) => {
//   res.render("articles/new", { article: new Article() });
// });

router.get("/:id", async (req, res) => {
  const question = await Questions.findById({ id: req.params.id });
  // if (article == null) res.redirect("/");
  res.render("questions/index", { question: question });
});

// router.post("/", async (req, res) => {
//   let article = new Article({
//     title: req.body.title,
//     description: req.body.description,
//     markdown: req.body.markdown,
//   });

//   try {
//     article = await article.save();
//     res.redirect(`/articles/${article.id}`);
//   } catch (e) {
//     res.render("articles/new", { article: article });
//   }
// });

module.exports = router;
