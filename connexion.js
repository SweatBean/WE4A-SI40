document.addEventListener("DOMContentLoaded", function() {
    const formConnexion = document.getElementById("form_connexion");

    if (formConnexion) {
        document.getElementById("form_connexion").addEventListener("submit", function (event) {
            event.preventDefault();

            const nom = document.getElementById("utilisateur").value;
            const motDePasse = document.getElementById("mdp").value;

            console.log("Nom d'utilisateur :", nom);
            console.log("Mot de passe :", motDePasse);


            if (nom === "admin" && motDePasse === "1234") {
                window.location.href = "accueil.html";
            } else {
                document.getElementById("erreur_message").textContent = "Identifiants ou mdp incorrects. Veux-tu t'inscrire ?";
            }
        });
    }
});