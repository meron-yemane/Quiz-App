var state = {
  right: 0,
  wrong: 0,
  questionTracker: 0,
  rightAnswer: null
};

var questions = [
  {
    question: "How many feet are in a mile?",
    answers: ["5280 feet", "100 feet", "2640 feet", "3 feet"],
    correct: 0
  },
  {
    question: "How many feet are in a yard?",
    answers: ["3 feet", "2 feet", ".5 feet", "10 feet"],
    correct: 0
  },
  {
    question: "How many yards are in a mile?",
    answers: ["376 yards", "1760 yards", "40 yards", "10 yards"],
    correct: 1
  },
  {
    question: "How many inches are in a foot?",
    answers: ["376 inches", "17 yards", "4000 inches", "12 inches"],
    correct: 3
  },
  {
    question: "Bonus: 100 degrees Celsius is equivalent to...",
    answers: ["200 Fahrenheit", "0 Fahrenheit", "212 Fahrenheit", "Conversion Does Not Exist"],
    correct: 2
  }
];

var isCorrect = function(state, answer) {
  if (parseInt(answer) === questions[state.questionTracker].correct) {
    state.right++;
    state.rightAnswer = true;
  } else {
    state.wrong++;
    state.rightAnswer = false;
  }
};

var renderFeedback = function(state, element) {
  if (state.rightAnswer) {
    var html = '<h2>Great Job! Your answer was correct!</h2>';
  } else {
    var html = '<h2>Sorry, your are incorrect. The correct answer is ' + 
                questions[state.questionTracker].answers[questions[state.questionTracker].correct] + '</h2>';
  }
  if (state.questionTracker === questions.length - 1) {
    html += '<form class="next"><button type="submit">How did I do?</button></form>';
  } else {
    html += '<form class="next"><button type="submit">Next Question</button></form>';
  }
  element.html(html);
}

var renderQuestion = function(state, element) {
  var html = '<form class="question">';
  html += '<p>'+ (state.questionTracker + 1).toString() + '/' + questions.length.toString() + ': ' + questions[state.questionTracker].question + '</p>';
  for (var i = 0; i < questions[state.questionTracker].answers.length; i++) {
    html += '<input type="radio" name="answer" value="'+ i + '" required>' 
          + questions[state.questionTracker].answers[i] + '<br>';
  };  
  html += '<button type="submit">Submit Answer</button></form>';
  element.html(html);
};

var renderStarterPage = function(state, element) {
  var html = '<p>How well do you know your measurements of length? Test your knowledge with this short quiz!</p>';
  html += '<form id="opening-page">'; 
  html += '<button type="submit">Start Quiz</button></form>'
  element.html(html);
}

$(document).on("submit", ".question", function(event) {
  event.preventDefault();
  var answer = $('input[name=answer]:checked').val();
  isCorrect(state, answer);
  renderFeedback(state, $(".container"));
});

$(document).on("submit", ".next", function(event) {
  event.preventDefault();
  state.questionTracker++;
  if (state.questionTracker > questions.length - 1) {
    var html = '<h2>Congratulations on finishing! You got ' + state.right.toString() + '/' + questions.length.toString() + ' correct.</h2>';
    html += '<form class="restart">';
    html +=  '<button type="submit" name="restart-button">Start over</button></form>'
    $(".container").html(html);
  } else {
    renderQuestion(state, $(".container"));
  }
});

$(document).on("submit", "#opening-page", function(event) {
  event.preventDefault();
  renderQuestion(state, $(".container"));
});

renderStarterPage(state, $(".container"));


