function codingQuiz (questions) {
    this.questions= questions;
    this.questionIndex = 0
    this.score = 0
}

codingQuiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

codingQuiz.prototype.personsInput = function (answer) {
    if(this.getQuestionIndex().isCorrect(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

function question(choices, answer, text) {
    this.choices = choices;
    this.answer = answer;
    this.text = text;
}

codingQuiz.prototype.isFinished = function () {
    return this.questionIndex === this.questions.length;
}

codingQuiz.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}

function redo () {
    if(codingQuiz.isFinished()) {
        scorePopup();
    }
    else {
        var elements = document.getElementById("question");
        elements.val = codingQuiz.getQuestionIndex().text;

        var choices = codingQuiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var elements = document.getElementById("choice" + i);
            elements.val = choices[i];
            personsInput("btn" + i, choices[i])
        }
        progressionPopup()
    }
}

function personsInput (id, personsInput) {
    var button = document.getElementById(id);
    button.onclick = function () {
        codingQuiz.personsInput(personsInput);
        redo();
    }
}

function scorePopup () {
    var restartHTML = "<h1>Your Results!</h1>";
    restartHTML = "<h2>Score: " + codingQuiz.score + "</h2>";
    var elements = document.getElementById("codingQuiz");
    elements.val=restartHTML;
}

function progressionPopup () {
    var currentQuestion = codingQuiz.questionIndex + 1;
    var elements = document.getElementById("progression");
    elements.val = "Question" + currentQuestion + " of " + codingQuiz.questions.length;
}

var questions = [
    new question("Which of the following is not one of the three main coding languages?", ["HTML", "CSS", "Python", "JavaScript"], "Python"),
    new question("What language is used for styling?", ["HTML", "CSS", "Java", "JQuery"], "CSS"),
    new question("What language is used for the body of a website?", ["HTML", "CSS", "BootStrap", "Console"], "HTML"),
    new question("Whch of the following is not one of the three main coding languages?", ["HTML", "CSS", "Python", "JavaScript"], "Python")
]

var CodingQuiz = new codingQuiz(questions);
redo();