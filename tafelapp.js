const tableForm = document.getElementById("tableForm");
const tableInput = document.getElementById("inputTafel");
const tableOutput = document.getElementById("tableOutput");
const quizSetupForm = document.getElementById("quizSetupForm");
const quizTableInput = document.getElementById("inputTafeloefen");
const quizQuestion = document.getElementById("quizQuestion");
const questionText = document.getElementById("questionText");
const quizAnswerForm = document.getElementById("quizAnswerForm");
const answerInput = document.getElementById("answerInput");
const checkAnswerButton = document.getElementById("checkAnswerButton");
const quizFeedback = document.getElementById("quizFeedback");
const quizScore = document.getElementById("quizScore");
const nextQuestionButton = document.getElementById("nextQuestionButton");

let selectedTable = 0;
let multiplier = 0;
let correctAnswers = 0;

tableForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const table = Number(tableInput.value);
    if (!Number.isInteger(table) || table < 1) {
        tableInput.reportValidity();
        return;
    }

    tableOutput.textContent = Array.from(
        { length: 10 },
        (_, index) => `${index + 1} x ${table} = ${(index + 1) * table}`
    ).join("\n");
});

quizSetupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    selectedTable = Number(quizTableInput.value);
    if (!Number.isInteger(selectedTable) || selectedTable < 1) {
        quizTableInput.reportValidity();
        return;
    }

    correctAnswers = 0;
    quizScore.textContent = "Goed: 0";
    quizQuestion.hidden = false;
    showNextQuestion();
});

quizAnswerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!Number.isInteger(multiplier) || answerInput.value === "") {
        answerInput.reportValidity();
        return;
    }

    const answer = Number(answerInput.value);
    const correctAnswer = multiplier * selectedTable;
    if (answer === correctAnswer) {
        correctAnswers++;
        quizFeedback.textContent = "Goed gedaan! Dat klopt.";
    } else {
        quizFeedback.textContent = `Helaas, het goede antwoord is ${correctAnswer}.`;
    }

    quizScore.textContent = `Goed: ${correctAnswers}`;
    answerInput.disabled = true;
    checkAnswerButton.disabled = true;
    nextQuestionButton.hidden = false;
});

nextQuestionButton.addEventListener("click", showNextQuestion);

function showNextQuestion() {
    multiplier = Math.floor(Math.random() * 10) + 1;
    questionText.textContent = `${multiplier} x ${selectedTable} = ?`;
    quizFeedback.textContent = "";
    answerInput.value = "";
    answerInput.disabled = false;
    checkAnswerButton.disabled = false;
    nextQuestionButton.hidden = true;
    answerInput.focus();
}
