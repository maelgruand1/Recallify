document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("quizModal");
    const openModal = document.getElementById("openModal");
    const closeModal = document.getElementById("closeModal");
    const createQuizBtn = document.getElementById("createQuiz");
    const quizTopicInput = document.getElementById("quizTopic");

    openModal.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    createQuizBtn.addEventListener("click", () => {
        const topic = quizTopicInput.value.trim();
        if (topic) {
            // Redirection vers la page de création avec le sujet en paramètre d'URL
            window.location.href = `createQuiz.html?topic=${encodeURIComponent(topic)}`;
        } else {
            alert("Please enter a quiz topic.");
        }
    });
});
