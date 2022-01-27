var questions = [
  {
    question: "How many points is a touchdown:",
    choices: ["7", "6", "1", "3"],
    answer: "6",
  },
  {
    question: "How many points is a safety",
    choices: ["2", "1", "8", "3"],
    answer: "2",
  },
  {
    question: "Who starts with the football on offense",
    choices: ["Runningback", "Wide Receiver", "Center", "Quarterback"],
    answer: "Center",
  },
  {
    question: "How many players are allowed on the field for each team",
    choices: ["10", "22", "7", "11"],
    answer: "11",
  },
  {
    question: "What is the final game of the NFL season called",
    choices: ["The Finale", "The Championships", "The Superbowl", "The Cup"],
    answer: "The Super Bowl"
  }
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

var questionIndex = 0;
var correctCount = 0;

var time = 60;
var intervalId;

function renderQuestion() {

  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);

  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount;
}

function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

document
  .querySelector("#change-question")
  .addEventListener("click", function () {
    questionIndex++;
    renderQuestion();
  });


function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 2;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}

renderQuestion();
optionListEl.addEventListener("click", checkAnswer);
