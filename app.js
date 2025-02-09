// Exemple de base de données utilisateur simulée
const users = [
    {
        username: "mael",
        email: "mael@example.com",
        password: "1234",
        fullName: "Mael Gruand",
        profilePic: "../images/mael.jpg",
        joined: "January 2025",
        quizzes: [
            { title: "Math Quiz", date: "February 7, 2025", score: "85%" },
            { title: "History Quiz", date: "January 29, 2025", score: "92%" }
        ]
    },
    {
        username: "alex",
        email: "alex@example.com",
        password: "5678",
        fullName: "Alex Dupont",
        profilePic: "../images/alex.jpg",
        joined: "December 2024",
        quizzes: [
            { title: "Science Quiz", date: "February 3, 2025", score: "78%" },
            { title: "English Quiz", date: "January 15, 2025", score: "88%" }
        ]
    },
    {
        username: "sophie",
        email: "sophie@example.com",
        password: "abcd",
        fullName: "Sophie Martin",
        profilePic: "../images/sophie.jpg",
        joined: "November 2024",
        quizzes: [
            { title: "Geography Quiz", date: "February 5, 2025", score: "90%" },
            { title: "French Quiz", date: "January 10, 2025", score: "95%" }
        ]
    }
];

// Fonction d'authentification
function authenticateUser(username, password) {
    console.log("Vérification des identifiants...");
    
    // Rechercher l'utilisateur correspondant
    const user = users.find(u => (u.username === username || u.email === username) && u.password === password);

    if (user) {
        console.log("Authentification réussie");
        return user;
    } else {
        console.log("Authentification échouée");
        return null;
    }
}

// Fonction pour charger les informations du profil
function loadProfile() {
    const userNameElement = document.getElementById("userName");
    const userFullNameElement = document.getElementById("userFullName");
    const userEmailElement = document.getElementById("userEmail");
    const userJoinedElement = document.getElementById("userJoined");
    const profilePicElement = document.getElementById("profilePic");
    const quizTableBody = document.getElementById("quizTable") ? document.getElementById("quizTable").getElementsByTagName("tbody")[0] : null;

    // Récupérer l'utilisateur stocké dans sessionStorage
    const user = JSON.parse(sessionStorage.getItem("loggedUser"));

    if (user) {
        if (userNameElement) userNameElement.textContent = user.fullName;
        if (userFullNameElement) userFullNameElement.textContent = user.fullName;
        if (userEmailElement) userEmailElement.textContent = user.email;
        if (userJoinedElement) userJoinedElement.textContent = user.joined;
        if (profilePicElement) profilePicElement.src = user.profilePic;

        // Affichage des quiz
        if (quizTableBody) {
            quizTableBody.innerHTML = ""; // Vider le tableau avant de le remplir
            user.quizzes.forEach(quiz => {
                const row = quizTableBody.insertRow();
                row.innerHTML = `<td>${quiz.title}</td><td>${quiz.date}</td><td>${quiz.score}</td>`;
            });
        }
    } else {
        console.error("Aucun utilisateur trouvé dans sessionStorage.");
    }
}

// Gestion du formulaire de connexion
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            console.log("Tentative de connexion avec:", username, password);  // Vérification des valeurs

            const user = authenticateUser(username, password);

            if (user) {
                // Stocker les données de l'utilisateur connecté dans sessionStorage
                sessionStorage.setItem("loggedUser", JSON.stringify(user));
                console.log("Utilisateur connecté:", JSON.parse(sessionStorage.getItem("loggedUser")));  // Vérification

                // Redirection vers la page de profil
                window.location.href = "profile.html";
            } else {
                console.log("Échec de la connexion");
                document.getElementById("errorMessage").style.display = "block";
            }
        });
    }

    // Charger le profil si l'utilisateur est connecté
    if (window.location.pathname.includes("profile.html")) {
        loadProfile();
    }
});

// Fonction pour charger et modifier les données du profil
document.addEventListener("DOMContentLoaded", function () {
    const settingsModal = document.getElementById("settingsModal");
    const openSettingsBtn = document.getElementById("openSettings");
    const closeSettingsBtn = document.getElementById("closeSettings");

    // Ouvrir la fenêtre modale
    openSettingsBtn.addEventListener("click", function () {
        loadEditProfileForm();
        settingsModal.style.display = "block";
    });

    // Fermer la fenêtre modale
    closeSettingsBtn.addEventListener("click", function () {
        settingsModal.style.display = "none";
    });

    // Fermer la modale si on clique en dehors
    window.addEventListener("click", function (event) {
        if (event.target === settingsModal) {
            settingsModal.style.display = "none";
        }
    });

    // Charger les données utilisateur dans le formulaire
    function loadEditProfileForm() {
        const user = JSON.parse(sessionStorage.getItem("loggedUser"));

        if (user) {
            document.getElementById("editFullName").value = user.fullName;
            document.getElementById("editEmail").value = user.email;
            document.getElementById("editProfilePic").value = user.profilePic;
        }
    }

    // Gérer la soumission du formulaire de modification
    document.getElementById("editProfileForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let user = JSON.parse(sessionStorage.getItem("loggedUser"));
        if (!user) return;

        // Mettre à jour les infos
        user.fullName = document.getElementById("editFullName").value;
        user.email = document.getElementById("editEmail").value;
        user.profilePic = document.getElementById("editProfilePic").value;

        // Sauvegarder les nouvelles infos
        sessionStorage.setItem("loggedUser", JSON.stringify(user));

        // Mettre à jour l'affichage
        loadProfile();

        // Fermer la fenêtre de paramètres
        settingsModal.style.display = "none";

        alert("Profil mis à jour !");
    });

    // Charger le profil si l'utilisateur est connecté
    if (window.location.pathname.includes("profile.html")) {
        loadProfile();
    }
});
