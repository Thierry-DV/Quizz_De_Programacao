// Elementos da interface
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const restartBtn = document.querySelector("#restart");

// Controle
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

// Perguntas do quiz
const questions = [
  {
    question: "PHP foi desenvolvido para qual fim?",
    answers: [
      { answer: "back-end", correct: true },
      { answer: "front-end", correct: false },
      { answer: "Sistema operacional", correct: false },
      { answer: "Banco de dados", correct: false },
    ]
  },
  {
    question: "Uma forma de declarar variável em JavaScript:",
    answers: [
      { answer: "$var", correct: false },
      { answer: "var", correct: true },
      { answer: "@var", correct: false },
      { answer: "#let", correct: false },
    ]
  },
  {
    question: "Qual o seletor de id no CSS?",
    answers: [
      { answer: "#", correct: true },
      { answer: ".", correct: false },
      { answer: "@", correct: false },
      { answer: "/", correct: false },
    ]
  },
  {
    question: "Qual tag usamos para inserir uma imagem no HTML?",
    answers: [
      { answer: "<img>", correct: true },
      { answer: "<image>", correct: false },
      { answer: "<pic>", correct: false },
      { answer: "<src>", correct: false },
    ]
  },
  {
    question: "Qual destes é um framework JavaScript?",
    answers: [
      { answer: "Laravel", correct: false },
      { answer: "Django", correct: false },
      { answer: "React", correct: true },
      { answer: "Spring", correct: false },
    ]
  },
  {
    question: "Em CSS, qual propriedade altera a cor do texto?",
    answers: [
      { answer: "background-color", correct: false },
      { answer: "font-color", correct: false },
      { answer: "color", correct: true },
      { answer: "text-decoration", correct: false },
    ]
  },
  {
    question: "Qual comando exibe dados no console em JS?",
    answers: [
      { answer: "log()", correct: false },
      { answer: "print()", correct: false },
      { answer: "console.log()", correct: true },
      { answer: "echo()", correct: false },
    ]
  },
  {
    question: "Qual destes armazena múltiplos valores?",
    answers: [
      { answer: "string", correct: false },
      { answer: "boolean", correct: false },
      { answer: "array", correct: true },
      { answer: "number", correct: false },
    ]
  },
  {
    question: "Qual linguagem é usada para estilizar páginas web?",
    answers: [
      { answer: "HTML", correct: false },
      { answer: "JavaScript", correct: false },
      { answer: "CSS", correct: true },
      { answer: "Python", correct: false },
    ]
  },
  {
    question: "O que significa DOM?",
    answers: [
      { answer: "Document Object Model", correct: true },
      { answer: "Data Output Management", correct: false },
      { answer: "Developer Only Mode", correct: false },
      { answer: "Design Orientation Map", correct: false },
    ]
  },
];

// Início do quiz
function init() {
  createQuestion(0);
}

// Cria a pergunta e respostas
function createQuestion(i) {
  // Limpa respostas anteriores
  answersBox.innerHTML = "";

  const current = questions[i];
  question.querySelector("#question-text").textContent = current.question;
  question.querySelector("#question-number").textContent = i + 1;

  current.answers.forEach((answer, index) => {
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    answerTemplate.classList.remove("hide", "answer-template");

    answerTemplate.querySelector(".btn-letter").textContent = letters[index];
    answerTemplate.querySelector(".question-answer").textContent = answer.answer;
    answerTemplate.setAttribute("correct-answer", answer.correct);

    answersBox.appendChild(answerTemplate);
  });

  // Adiciona evento de clique
  answersBox.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => checkAnswer(button));
  });

  actualQuestion++;
}

// Checagem da resposta
function checkAnswer(selectedBtn) {
  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(btn => {
    const isCorrect = btn.getAttribute("correct-answer") === "true";

    btn.classList.add(isCorrect ? "correct-answer" : "wrong-answer");

    if (btn === selectedBtn && isCorrect) {
      points++;
    }
  });

  setTimeout(() => {
    if (actualQuestion >= questions.length) {
      showSuccessMessage();
    } else {
      createQuestion(actualQuestion);
    }
  }, 1000);
}

// Mostra pontuação final
function showSuccessMessage() {
  hideOrShowQuizz();

  const score = ((points / questions.length) * 100).toFixed(2);
  document.querySelector("#display-score span").textContent = score;
  document.querySelector("#correct-answers").textContent = points;
  document.querySelector("#questions-qty").textContent = questions.length;
}

// Alterna entre quiz e resultado
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// Reinicia o quiz
restartBtn.addEventListener("click", () => {
  points = 0;
  actualQuestion = 0;
  hideOrShowQuizz();
  init();
});

// Inicialização automática
init();
