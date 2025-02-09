// Gestion de l'ajout dynamique de questions
document.getElementById('addQuestionBtn').addEventListener('click', function() {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionCount = questionsContainer.children.length + 1;

    // Créer un nouveau groupe de questions
    const newQuestionGroup = document.createElement('div');
    newQuestionGroup.classList.add('question-group');
    
    newQuestionGroup.innerHTML = `
        <label for="question${questionCount}">Question ${questionCount}:</label>
        <input type="text" id="question${questionCount}" name="questions[]" placeholder="Enter question" required>
        
        <label for="answer${questionCount}a">Option A:</label>
        <input type="text" id="answer${questionCount}a" name="answers[${questionCount - 1}][]" placeholder="Enter option A" required>
        
        <label for="answer${questionCount}b">Option B:</label>
        <input type="text" id="answer${questionCount}b" name="answers[${questionCount - 1}][]" placeholder="Enter option B" required>
        
        <label for="answer${questionCount}c">Option C:</label>
        <input type="text" id="answer${questionCount}c" name="answers[${questionCount - 1}][]" placeholder="Enter option C">
        
        <label for="answer${questionCount}d">Option D:</label>
        <input type="text" id="answer${questionCount}d" name="answers[${questionCount - 1}][]" placeholder="Enter option D">
        
        <label for="correctAnswer${questionCount}">Correct Answer:</label>
        <select id="correctAnswer${questionCount}" name="correctAnswers[]" required>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
        </select>
    `;

    questionsContainer.appendChild(newQuestionGroup);
});

// Gestion de la soumission du quiz
document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupérer les données du quiz
    const quizData = {
        title: document.getElementById('quizTitle').value,
        description: document.getElementById('quizDescription').value,
        questions: []
    };

    const questionInputs = document.querySelectorAll('input[name="questions[]"]');
    const answerInputs = document.querySelectorAll('input[name="answers[]"]');
    const correctAnswerInputs = document.querySelectorAll('select[name="correctAnswers[]"]');

    questionInputs.forEach((input, index) => {
        const question = {
            questionText: input.value,
            answers: [],
            correctAnswer: correctAnswerInputs[index].value
        };

        // Récupérer les réponses de la question
        for (let i = 0; i < 4; i++) {
            const answer = answerInputs[index * 4 + i].value;
            if (answer) {
                question.answers.push(answer);
            }
        }

        quizData.questions.push(question);
    });

    console.log('Quiz data:', quizData);

    // Sauvegarder les données dans le sessionStorage
    sessionStorage.setItem('quizData', JSON.stringify(quizData));

    alert('Quiz saved successfully!');
});

// Charger les données sauvegardées depuis le sessionStorage (si disponibles)
window.addEventListener('load', function() {
    const savedQuizData = sessionStorage.getItem('quizData');
    if (savedQuizData) {
        const quizData = JSON.parse(savedQuizData);

        // Récupérer le titre et la description du quiz
        document.getElementById('quizTitle').value = quizData.title || '';
        document.getElementById('quizDescription').value = quizData.description || '';

        // Récupérer les questions et leurs options
        const questionsContainer = document.getElementById('questionsContainer');
        quizData.questions.forEach((question, index) => {
            const newQuestionGroup = document.createElement('div');
            newQuestionGroup.classList.add('question-group');

            newQuestionGroup.innerHTML = `
                <label for="question${index + 1}">Question ${index + 1}:</label>
                <input type="text" id="question${index + 1}" name="questions[]" placeholder="Enter question" value="${question.questionText}" required>
                
                <label for="answer${index + 1}a">Option A:</label>
                <input type="text" id="answer${index + 1}a" name="answers[${index}][]" placeholder="Enter option A" value="${question.answers[0]}" required>
                
                <label for="answer${index + 1}b">Option B:</label>
                <input type="text" id="answer${index + 1}b" name="answers[${index}][]" placeholder="Enter option B" value="${question.answers[1]}" required>
                
                <label for="answer${index + 1}c">Option C:</label>
                <input type="text" id="answer${index + 1}c" name="answers[${index}][]" placeholder="Enter option C" value="${question.answers[2]}">
                
                <label for="answer${index + 1}d">Option D:</label>
                <input type="text" id="answer${index + 1}d" name="answers[${index}][]" placeholder="Enter option D" value="${question.answers[3]}">
                
                <label for="correctAnswer${index + 1}">Correct Answer:</label>
                <select id="correctAnswer${index + 1}" name="correctAnswers[]" required>
                    <option value="A" ${question.correctAnswer === 'A' ? 'selected' : ''}>A</option>
                    <option value="B" ${question.correctAnswer === 'B' ? 'selected' : ''}>B</option>
                    <option value="C" ${question.correctAnswer === 'C' ? 'selected' : ''}>C</option>
                    <option value="D" ${question.correctAnswer === 'D' ? 'selected' : ''}>D</option>
                </select>
            `;

            questionsContainer.appendChild(newQuestionGroup);
        });
    }
});
// Gestion de l'ajout dynamique de questions
document.getElementById('addQuestionBtn').addEventListener('click', function() {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionCount = questionsContainer.children.length + 1;

    // Créer un nouveau groupe de questions
    const newQuestionGroup = document.createElement('div');
    newQuestionGroup.classList.add('question-group');
    
    newQuestionGroup.innerHTML = `
        <label for="question${questionCount}">Question ${questionCount}:</label>
        <input type="text" id="question${questionCount}" name="questions[]" placeholder="Enter question" required>
        
        <label for="answer${questionCount}a">Option A:</label>
        <input type="text" id="answer${questionCount}a" name="answers[${questionCount - 1}][]" placeholder="Enter option A" required>
        
        <label for="answer${questionCount}b">Option B:</label>
        <input type="text" id="answer${questionCount}b" name="answers[${questionCount - 1}][]" placeholder="Enter option B" required>
        
        <label for="answer${questionCount}c">Option C:</label>
        <input type="text" id="answer${questionCount}c" name="answers[${questionCount - 1}][]" placeholder="Enter option C">
        
        <label for="answer${questionCount}d">Option D:</label>
        <input type="text" id="answer${questionCount}d" name="answers[${questionCount - 1}][]" placeholder="Enter option D">
        
        <label for="correctAnswer${questionCount}">Correct Answer:</label>
        <select id="correctAnswer${questionCount}" name="correctAnswers[]" required>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
        </select>
    `;

    questionsContainer.appendChild(newQuestionGroup);
});

// Gestion de la soumission du quiz
document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupérer les données du quiz
    const quizData = {
        title: document.getElementById('quizTitle').value,
        description: document.getElementById('quizDescription').value,
        questions: []
    };

    const questionInputs = document.querySelectorAll('input[name="questions[]"]');
    const answerInputs = document.querySelectorAll('input[name="answers[]"]');
    const correctAnswerInputs = document.querySelectorAll('select[name="correctAnswers[]"]');

    questionInputs.forEach((input, index) => {
        const question = {
            questionText: input.value,
            answers: [],
            correctAnswer: correctAnswerInputs[index].value
        };

        // Récupérer les réponses de la question
        for (let i = 0; i < 4; i++) {
            const answer = answerInputs[index * 4 + i].value;
            if (answer) {
                question.answers.push(answer);
            }
        }

        quizData.questions.push(question);
    });

    console.log('Quiz data:', quizData);

    // Sauvegarder les données dans le sessionStorage
    sessionStorage.setItem('quizData', JSON.stringify(quizData));

    alert('Quiz saved successfully!');
});

// Charger les données sauvegardées depuis le sessionStorage (si disponibles)
window.addEventListener('load', function() {
    const savedQuizData = sessionStorage.getItem('quizData');
    if (savedQuizData) {
        const quizData = JSON.parse(savedQuizData);

        // Récupérer le titre et la description du quiz
        document.getElementById('quizTitle').value = quizData.title || '';
        document.getElementById('quizDescription').value = quizData.description || '';

        // Récupérer les questions et leurs options
        const questionsContainer = document.getElementById('questionsContainer');
        quizData.questions.forEach((question, index) => {
            const newQuestionGroup = document.createElement('div');
            newQuestionGroup.classList.add('question-group');

            newQuestionGroup.innerHTML = `
                <label for="question${index + 1}">Question ${index + 1}:</label>
                <input type="text" id="question${index + 1}" name="questions[]" placeholder="Enter question" value="${question.questionText}" required>
                
                <label for="answer${index + 1}a">Option A:</label>
                <input type="text" id="answer${index + 1}a" name="answers[${index}][]" placeholder="Enter option A" value="${question.answers[0]}" required>
                
                <label for="answer${index + 1}b">Option B:</label>
                <input type="text" id="answer${index + 1}b" name="answers[${index}][]" placeholder="Enter option B" value="${question.answers[1]}" required>
                
                <label for="answer${index + 1}c">Option C:</label>
                <input type="text" id="answer${index + 1}c" name="answers[${index}][]" placeholder="Enter option C" value="${question.answers[2]}">
                
                <label for="answer${index + 1}d">Option D:</label>
                <input type="text" id="answer${index + 1}d" name="answers[${index}][]" placeholder="Enter option D" value="${question.answers[3]}">
                
                <label for="correctAnswer${index + 1}">Correct Answer:</label>
                <select id="correctAnswer${index + 1}" name="correctAnswers[]" required>
                    <option value="A" ${question.correctAnswer === 'A' ? 'selected' : ''}>A</option>
                    <option value="B" ${question.correctAnswer === 'B' ? 'selected' : ''}>B</option>
                    <option value="C" ${question.correctAnswer === 'C' ? 'selected' : ''}>C</option>
                    <option value="D" ${question.correctAnswer === 'D' ? 'selected' : ''}>D</option>
                </select>
            `;

            questionsContainer.appendChild(newQuestionGroup);
        });
    }
});
