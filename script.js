const questions = [
    {
        question:
            "You receive an email asking you to verify your account through an unfamiliar link. What should you do?",

        answers: [
            "Click the link immediately",
            "Reply with your password",
            "Ignore the link and verify the account through the official website",
            "Forward the email to your friends"
        ],

        correctAnswer: 2
    },

    {
        question:
            "Which password is the strongest?",

        answers: [
            "password123",
            "Ahmed2005",
            "MyDogName",
            "T9!vQ2#Lm8@Zp4"
        ],

        correctAnswer: 3
    },

    {
        question:
            "What is the main purpose of Two-Factor Authentication?",

        answers: [
            "To make your internet faster",
            "To add an extra layer of account protection",
            "To delete old emails",
            "To hide your username"
        ],

        correctAnswer: 1
    },

    {
        question:
            "Someone calls you and urgently asks for your verification code. What should you do?",

        answers: [
            "Give them the code quickly",
            "Ask them for their password",
            "End the call and contact the organization through an official channel",
            "Post the code online"
        ],

        correctAnswer: 2
    },

    {
        question:
            "Which action is safest when downloading a file?",

        answers: [
            "Download files from unknown pop-ups",
            "Download only from trusted websites",
            "Disable your antivirus first",
            "Open every email attachment"
        ],

        correctAnswer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let questionAnswered = false;

const questionNumber = document.getElementById("question-number");
const totalQuestions = document.getElementById("total-questions");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const resultTotal = document.getElementById("result-total");
const restartButton = document.getElementById("restart-button");

totalQuestions.textContent = questions.length;
resultTotal.textContent = questions.length;

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionNumber.textContent = currentQuestionIndex + 1;
    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";
    feedback.textContent = "";
    nextButton.style.display = "none";
    questionAnswered = false;

    currentQuestion.answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");

        answerButton.textContent = answer;
        answerButton.classList.add("answer-button");

        answerButton.addEventListener("click", () => {
            selectAnswer(index, answerButton);
        });

        answersContainer.appendChild(answerButton);
    });
}

function selectAnswer(selectedAnswer, selectedButton) {
    if (questionAnswered) {
        return;
    }

    questionAnswered = true;

    const currentQuestion = questions[currentQuestionIndex];
    const allAnswerButtons = document.querySelectorAll(".answer-button");

    allAnswerButtons.forEach((button) => {
        button.disabled = true;
    });

    if (selectedAnswer === currentQuestion.correctAnswer) {
        selectedButton.classList.add("correct");
        feedback.textContent = "Correct answer!";
        feedback.style.color = "#176b35";
        score++;
    } else {
        selectedButton.classList.add("wrong");

        allAnswerButtons[currentQuestion.correctAnswer].classList.add("correct");

        feedback.textContent =
            "Incorrect. The correct answer is highlighted.";
        feedback.style.color = "#8e2020";
    }

    nextButton.style.display = "inline-block";

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = "Show Result";
    }
}

function showResult() {
    questionText.classList.add("hidden");
    answersContainer.classList.add("hidden");
    feedback.classList.add("hidden");
    nextButton.classList.add("hidden");
    questionNumber.parentElement.classList.add("hidden");

    resultContainer.classList.remove("hidden");
    scoreElement.textContent = score;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResult();
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    questionText.classList.remove("hidden");
    answersContainer.classList.remove("hidden");
    feedback.classList.remove("hidden");
    nextButton.classList.remove("hidden");
    questionNumber.parentElement.classList.remove("hidden");

    resultContainer.classList.add("hidden");

    showQuestion();
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

showQuestion();
const themeButton = document.getElementById("theme-button");

function updateThemeButton() {
    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "☀️ Light Mode";
    } else {
        themeButton.textContent = "🌙 Dark Mode";
    }
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    updateThemeButton();
}

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

    updateThemeButton();
});

loadSavedTheme();
