document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('results-container');

    for (let chapter = 1; chapter <= 12; chapter++) { // Assuming 12 chapters
        ['easy', 'medium', 'hard'].forEach(difficulty => {
            const key = `quizAnswersChapter${chapter}${difficulty}`;
            const answers = JSON.parse(localStorage.getItem(key));
            if (answers) {
                const resultElem = document.createElement('div');
                resultElem.innerHTML = `<h3>Chapter ${chapter} - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}:</h3>`;
                answers.forEach((answer, index) => {
                    resultElem.innerHTML += `<p>Question ${index + 1}: ${answer || 'No answer'}</p>`;
                });
                resultsContainer.appendChild(resultElem);
            }
        });
    }
});
