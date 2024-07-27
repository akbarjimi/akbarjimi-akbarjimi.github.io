document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result-container');

    fetch('data/questions.json')
        .then(response => response.json())
        .then(data => {
            const questions = data.chapter1.easy; // Example: loading easy questions from chapter 1
            questions.forEach((q, index) => {
                const questionElem = document.createElement('div');
                questionElem.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
                q.options.forEach(option => {
                    questionElem.innerHTML += `
                        <input type="radio" name="q${index}" value="${option}">
                        <label>${option}</label><br>
                    `;
                });
                quizContainer.appendChild(questionElem);
            });
        });

    submitBtn.addEventListener('click', () => {
        const answers = [];
        const questions = quizContainer.querySelectorAll('div');
        questions.forEach((question, index) => {
            const selectedOption = question.querySelector('input[name="q' + index + '"]:checked');
            if (selectedOption) {
                answers.push(selectedOption.value);
            } else {
                answers.push(null);
            }
        });
        localStorage.setItem('quizAnswers', JSON.stringify(answers));
        resultContainer.innerHTML = 'Your answers have been saved to your browser’s local storage.';
    });
});
