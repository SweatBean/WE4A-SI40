document.addEventListener("DOMContentLoaded", function() {
    //logique du formulaire de connexion
    const formConnexion = document.getElementById("form_connexion");

    if (formConnexion) {
        document.getElementById("form_connexion").addEventListener("submit", function (event) {
            event.preventDefault();

            const nom = document.getElementById("utilisateur").value;
            const motDePasse = document.getElementById("mdp").value;

            console.log("Nom d'utilisateur :", nom);
            console.log("Mot de passe :", motDePasse);


            //pas connecter au back donc ce code pour l'instant
            if (nom === "profadmin" && motDePasse === "1234") {
                window.location.href = "admin.php";
            } else if (nom === "admin" && motDePasse === "1234") {
                window.location.href = "admin.php";
            } else if (nom === "prof" && motDePasse === "1234") {
                window.location.href = "accueil.php";
            } else if (nom === "eleve" && motDePasse === "1234") {
                window.location.href = "accueil.php";
            } else {
                document.getElementById("erreur_message").textContent = "Identifiants ou mot de passe incorrects.";
            }
        });
    }
});



function infoconnection() {
    //texte d'affichage si probèle connexion
    alert("pour le test vous pouvez utiliser en user profadmin, admin, prof, eleve avec mdp = 1234 \n \n contacter votre établissement pour retrouver les accès de votre compte");
}