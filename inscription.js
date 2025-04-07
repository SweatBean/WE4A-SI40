document.addEventListener("DOMContentLoaded", function() {
    const formConnexion = document.getElementById("form_connexion");

    if (formConnexion) {
        formConnexion.addEventListener("submit", function (event) {
            event.preventDefault();

            const nom = document.getElementById("utilisateur").value;
            const motDePasse = document.getElementById("mdp").value;
            const motDePasseConfirm = document.getElementById("mdp_confirm").value;
            const messageErreur = document.getElementById("erreur_message");

            console.log("Nom d'utilisateur :", nom);
            console.log("Mot de passe :", motDePasse);
            console.log("Confirmation :", motDePasseConfirm);

            //todo verifier nom utilisateur pas déjà utiliser


            if (motDePasse !== motDePasseConfirm) {
                messageErreur.textContent = "Les mots de passe ne correspondent pas.";
                return;
            }

            window.location.href = "accueil.html";
        });
    }
});
