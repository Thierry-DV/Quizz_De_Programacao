const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const progressBarFill = document.querySelector("#progress-fill");
const feedbackMessage = document.querySelector("#feedback-message");

const letters = ["a", "b", "c", "d"];
let actualQuestion = 0;
let points = 0;

const questions = [
  {
    question: "O que significa HTML?",
    answers: [
      { answer: "Linguagem de Marcação de Hipertexto", correct: true },
      { answer: "Linguagem de Programação", correct: false },
      { answer: "Hiperlink e Texto de Marcação", correct: false },
      { answer: "Ferramenta de Estilo de Página", correct: false }
    ]
  },
  {
    question: "Qual linguagem é usada para estilizar páginas web?",
    answers: [
      { answer: "Python", correct: false },
      { answer: "HTML", correct: false },
      { answer: "CSS", correct: true },
      { answer: "Java", correct: false }
    ]
  },
  {
    question: "Qual desses é um framework JavaScript?",
    answers: [
      { answer: "React", correct: true },
      { answer: "Django", correct: false },
      { answer: "Laravel", correct: false },
      { answer: "Bootstrap", correct: false }
    ]
  },
  {
    question: "O que o comando 'console.log()' faz?",
    answers: [
      { answer: "Mostra uma caixa de alerta", correct: false },
      { answer: "Cria uma variável", correct: false },
      { answer: "Exibe uma mensagem no console", correct: true },
      { answer: "Executa um loop", correct: false }
    ]
  }
];

function init() {
  createQuestion(0);
}


function createQuestion(i) {
  const current = questions[i];

  answersBox.innerHTML = "";
  feedbackMessage.classList.add("hide");
  feedbackMessage.textContent = "";

  question.querySelector("#question-text").textContent = current.question;
  question.querySelector("#question-number").textContent = i + 1;

  current.answers.forEach((answer, index) => {
    const answerTemplate = document
      .querySelector(".answer-template")
      .cloneNode(true);

    answerTemplate.classList.remove("hide", "answer-template");
    answerTemplate.querySelector(".btn-letter").textContent = letters[index];
    answerTemplate.querySelector(".question-answer").textContent =
      answer.answer;
    answerTemplate.setAttribute("correct-answer", answer.correct);

    answersBox.appendChild(answerTemplate);
  });

  answersBox
    .querySelectorAll("button")
    .forEach((btn) => btn.addEventListener("click", () => checkAnswer(btn)));

  actualQuestion++;

  const progress = ((actualQuestion - 1) / questions.length) * 100;
  progressBarFill.style.width = `${progress}%`;
}

function checkAnswer(btn) {
  const buttons = answersBox.querySelectorAll("button");
  const isCorrect = btn.getAttribute("correct-answer") === "true";

  buttons.forEach((button) => {
    const correct = button.getAttribute("correct-answer") === "true";
    button.classList.add(correct ? "correct-answer" : "wrong-answer");
  });

  feedbackMessage.classList.remove("hide");
  if (isCorrect) {
    feedbackMessage.textContent = "✅ Resposta correta!";
    feedbackMessage.classList.remove("wrong-feedback");
    feedbackMessage.classList.add("correct-feedback");
    points++;
  } else {
    feedbackMessage.textContent = "❌ Resposta incorreta!";
    feedbackMessage.classList.remove("correct-feedback");
    feedbackMessage.classList.add("wrong-feedback");
  }

  setTimeout(() => {
    if (actualQuestion >= questions.length) {
      showSuccessMessage();
    } else {
      createQuestion(actualQuestion);
    }
  }, 1500);
}

function showSuccessMessage() {
  hideOrShowQuizz();

  const score = ((points / questions.length) * 100).toFixed(2);
  document.querySelector("#display-score span").textContent = score;
  document.querySelector("#correct-answers").textContent = points;
  document.querySelector("#questions-qty").textContent = questions.length;

  const messageEl = scoreContainer.querySelector("h2");

  if (score >= 80) {
    messageEl.textContent = "🎉 Incrível! Você domina programação!";
  } else if (score >= 50) {
    messageEl.textContent = "👏 Bom trabalho! Mas ainda dá pra melhorar!";
  } else {
    messageEl.textContent = "📘 Vamos estudar mais e tentar de novo!";
  }
}

function hideOrShowQuizz() {
  quizContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

document.querySelector("#restart").addEventListener("click", () => {
  actualQuestion = 0;
  points = 0;
  progressBarFill.style.width = "0%";
  hideOrShowQuizz();
  init();
});

init();
