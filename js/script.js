let translations = {};
let currentLanguage = 'en';

function loadLanguage(lang) {
    fetch(`lang/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            translations = data;
            updateTexts();
        });
}

function setLanguage(lang) {
    currentLanguage = lang;
    document.body.className = lang;
    loadLanguage(lang);
}


function updateTexts() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
            element.innerText = translations[key];
        } else if (Array.isArray(translations.steps)) {
            translations.steps.forEach((step, index) => {
                const stepElement = document.querySelector(`[data-translate="steps_${index + 1}"]`);
                if (stepElement) {
                    stepElement.innerText = step;
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadLanguage(currentLanguage);
});
