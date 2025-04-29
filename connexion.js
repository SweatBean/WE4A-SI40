//todo le conecter à la base de donné et enlever droit d'accès pour demander à la bdd car droit_accès côté client donc archi pas secure
document.addEventListener("DOMContentLoaded", function() {
    const formConnexion = document.getElementById("form_connexion");

    if (formConnexion) {
        document.getElementById("form_connexion").addEventListener("submit", function (event) {
            event.preventDefault();

            const nom = document.getElementById("utilisateur").value;
            const motDePasse = document.getElementById("mdp").value;

            console.log("Nom d'utilisateur :", nom);
            console.log("Mot de passe :", motDePasse);


            let droit_accès = -1;

            if (nom === "profadmin" && motDePasse === "1234") {
                droit_accès = 3;
                window.location.href = "accueil.php";
            } else if (nom === "admin" && motDePasse === "1234") {
                droit_accès = 2;
                window.location.href = "admin.php";
            } else if (nom === "prof" && motDePasse === "1234") {
                droit_accès = 1;
                window.location.href = "accueil.php";
            } else if (nom === "eleve" && motDePasse === "1234") {
                droit_accès = 0;
                window.location.href = "accueil.php";
            } else {
                document.getElementById("erreur_message").textContent = "Identifiants ou mot de passe incorrects. Veux-tu t'inscrire ?";
            }

            // Si tu veux stocker le droit d'accès, tu peux le mettre dans localStorage
            if (droit_accès !== -1) {
                localStorage.setItem("droit_accès", droit_accès);
            }
        });
    }
});
