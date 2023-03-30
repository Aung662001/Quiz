const questionAnswer = document.querySelector(".question-answer");
const startBth = document.querySelector(".start");
const nextBtn = document.querySelector(".next");
const answerBtn = document.querySelectorAll(".btn");
const questionDiv = document.querySelector(".question");
const allAnswer = document.querySelector(".all-answers");

let suffledQuestions, currentQuestionIndex;

startBth.addEventListener("click", () => {
  startBth.classList.add("hide");
  questionAnswer.classList.remove("hide");
  suffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  setNextQuestion();
});

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex >= questions.length - 1) {
    currentQuestionIndex = 0;
  } else {
    currentQuestionIndex++;
    setNextQuestion();
  }
});

function setNextQuestion() {
  resetState();
  showQuestion(suffledQuestions[currentQuestionIndex]);
}
function showQuestion(question) {
  questionDiv.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    allAnswer.append(button);
    if (answer.condition) {
      button.dataset.condition = answer.condition;
    }

    button.addEventListener("click", selectAnswer);
  });
}
function selectAnswer(e) {
  const selectButton = e.target;
  const correct = selectButton.dataset.condition;
  setStatusClass(document.body, correct);
  Array.from(allAnswer.children).forEach((button) => {
    setStatusClass(button, button.dataset.condition);
  });
  if (suffledQuestions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove("hide");
  } else {
    startBth.innerText = "Restart";
    startBth.classList.remove("hide");
  }
}
function setStatusClass(button, correct) {
  clearStatus(button);
  if (correct) {
    button.classList.add("true");
  } else {
    button.classList.add("false");
  }
}
function clearStatus(button) {
  button.classList.remove("true");
  button.classList.remove("false");
}
function resetState() {
  nextBtn.classList.add("hide");
  while (allAnswer.lastChild) {
    allAnswer.removeChild(allAnswer.lastChild);
  }
}
const questions = [
  {
    question: "What is your name?",
    answers: [
      { text: "Aung Aung", condition: true },
      { text: "Maung Aung", condition: true },
      { text: "Aung Maung", condition: false },
      { text: "Mr. Aung", condition: true },
    ],
  },
  {
    question: "What is programming?",
    answers: [
      { text: "Shopping", condition: false },
      { text: "Movie", condition: false },
      { text: "Loving", condition: false },
      { text: "Coding", condition: true },
    ],
  },
  {
    question: "What is Apple?",
    answers: [
      { text: "Car", condition: false },
      { text: "Home", condition: false },
      { text: "Person", condition: false },
      { text: "Fruit", condition: true },
    ],
  },
  {
    question: "Who is the richest in the world?",
    answers: [
      { text: "Elon", condition: false },
      { text: "Jeff Bezos", condition: false },
      { text: "Larry Ellison", condition: false },
      { text: "Bernard Arnault & family", condition: true },
    ],
  },
];
