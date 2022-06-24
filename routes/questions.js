const express = require("express");
const Question = require("../models/question");
const router = express.Router();
const store = require('../public/store')
store.questionID = 0;
store.allQuestionsIDs = [];
store.pickedQuestion = new Map();
store.answeredQuestions = new Map();
store.answered = 0;
store.answeredQuestionsStyle = {};
store.remainingTime = 60;
store.resultPopupVisible = 'hidden';
store.noPic = 'hidden';
store.finished = false;
store.reviewButtonStyle = {};

router.get("/", async (req, res) => {
  try {
    if(!store.allQuestions)
    {
      allQuestions = await Question.find();
      store.allQuestions = allQuestions;
      for(let i = 0; i < allQuestions.length; i++){
        store.allQuestionsIDs.push(i);
      }
      let interval = setInterval(
        () => {
          if (store.remainingTime>0) {
          store.remainingTime--;
        }else {
          console.log('No more time')
          clearInterval(interval);
         }
        }, 60000
      )
    }

    store.questionID = req.query.questionID;

    let visualizedQuestionID;
    if(store.pickedQuestion.get(store.questionID)){
      visualizedQuestionID = store.pickedQuestion.get(store.questionID);
    } else {
      visualizedQuestionID = store.allQuestionsIDs[Math.floor(Math.random() * store.allQuestionsIDs.length)];
      store.allQuestionsIDs.splice(visualizedQuestionID, 1);
      store.pickedQuestion.set(store.questionID, visualizedQuestionID);
    }
    
    let checked = {};
    if(store.answeredQuestions.get(store.questionID))
    {
      const answer = store.answeredQuestions.get(store.questionID);
      switch(answer)
      {
        case 'A': 
        checked.checkedA = 'checked';
        break;
        case 'B': 
        checked.checkedB = 'checked';
        break;
        case 'C': 
        checked.checkedC = 'checked';
        break;
        case 'D': 
        checked.checkedD = 'checked';
        break;
      }
    }
    if(store.allQuestions[visualizedQuestionID].descPic) {
      store.noPic = ' ';
    } else {
      store.noPic = 'hidden';
    }

    const question = store.allQuestions[visualizedQuestionID];
    console.log(question);
    return res.render("questions/questions", {question: question, 
      questionID: store.questionID, 
      checked: checked, 
      answered: store.answered, 
      answeredQuestionsStyle: 
      store.answeredQuestionsStyle, 
      remainingTime: store.remainingTime, 
      resultPopupVisible: store.resultPopupVisible, 
      noPic: store.noPic, 
      correctAnswers: store.correctAnswers, 
      reviewButtonStyle: store.reviewButtonStyle});
    
  } catch (error) {
    res.json({ message: error });
  }
}),


router.post('/submit', function (req, res) {
  if(store.finished) {
    return;
  }
  if(req.body.response && store.questionID <= 60){
    store.answeredQuestions.set(store.questionID, req.body.response)

    store.answeredQuestionsStyle['answeredStyle'+store.questionID] = 'answeredStyle'
    if(store.questionID < 60){
      store.questionID++;
      
    }
    store.answered++;
    res.redirect('/questions/?questionID='+store.questionID);
  }
});

router.post('/next', function (req, res) {
  if(store.questionID < 60)
  {
    store.questionID++;
    res.redirect('/questions/?questionID='+store.questionID);
  }
});

router.post('/prev', function (req, res) {
  if(store.questionID > 1)
  store.questionID--;
  res.redirect('/questions/?questionID='+store.questionID);
});

router.post('/results', function (req, res) {
  
  let correct = 0;
  for(let i = 0; i < 60; i++){
    if(store.answeredQuestions.get(i.toString())) {
      if(store.answeredQuestions.get(i.toString()) ==store.allQuestions[store.pickedQuestion.get(i.toString())].correct){
        correct++;
      }
    }
  }
  store.resultPopupVisible = '';
  store.correctAnswers = correct;
  store.finished = true;
  res.redirect('/questions/?questionID='+store.questionID)
  
});

router.post('/review', function (req, res) {
  
  store.resultPopupVisible = 'hidden';
  
  for(let i = 0; i < 60; i++){
    if(store.answeredQuestions.get(i.toString())) {
      if(store.answeredQuestions.get(i.toString()) ==store.allQuestions[store.pickedQuestion.get(i.toString())].correct){
        store.reviewButtonStyle['reviewButtonStyle'+i] = 'correct'
      } else {
        store.reviewButtonStyle['reviewButtonStyle'+i] = 'wrong'
      }
    }
  }

  res.redirect('/questions/?questionID='+store.questionID)
});


module.exports = router;
