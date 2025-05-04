<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Accueil</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <nav class="barre_bouton_menu">
        <div class="bouton_menu_gauche">

        </div>
        <div>
            <a href="accueil.php">
                <button id="prof-toggle" class="bouton_menu">prof</button>
                <a/>
            <a href="connexion.php">
                <button class="bouton_menu">déconnexion</button>
            </a>
        </div>
    </nav>
</header>




<main id="main_cours">
    <div class="tabs">
        <button class="tab-button active" onclick="openTab('tabUE')">UE</button>
        <button class="tab-button" onclick="openTab('tabuser')">User</button>
    </div>

    <section class="tab-active">
        <div id="tabUE" class="tab-content active">
            <div class="form-section">
                <h2>Créer une UE</h2>
                <input type="text" id="nomUe" placeholder="Nom de l'UE">
                <input type="text" id="descriptionUe" placeholder="description">
                <label for="imageUE">Image de l'UE :</label>
                <input type="file" id="imageUE" accept="image/*" onchange="previewImageUE(event)">
                <img id="imageUEPreview" src="#" alt="Aperçu de l'image" style="display:none; max-width: 100%; margin-top: 10px;">
                <button onclick="creerUE()">Créer UE</button>
            </div>

            <div class="form-section">
                <h2>Catalogue des UE</h2>
                <input type="text" id="searchUE" placeholder="Rechercher une UE..." oninput="rechercheUE()">
                <div id="ueList" class="list"></div>
            </div>
            <div id="ueDetails" class="form-section" style="display:none;"></div>
        </div>

        <div id="tabuser" class="tab-content">
            <div class="form-section">
                <h2>Créer un Utilisateur</h2>
                <input type="text" id="email" placeholder="email">
                <input type="text" id="nomUser" placeholder="Nom d'utilisateur">
                <input type="text" id="mdp" placeholder="mot de passe">
                <input type="text" id="c_mdp" placeholder="confirmation mot de passe">
                <select id="userRole">
                    <option value="eleve">Étudiant</option>
                    <option value="prof">Enseignant</option>
                    <option value="admin">Administrateur</option>
                    <option value="profAdmin">Administrateur et Enseignant</option>
                </select>

                <button onclick="creerUser()">Créer Utilisateur</button>
            </div>

            <div class="form-section">
                <!-- todo mieux le faire pour pouvoir gérer plus de personne et mieux les gérer (changer de rôle, modifer mdp...)-->
                <h2>Gérer les utilisateurs</h2>
                <input type="text" id="searchUser" placeholder="Rechercher un utilisateur..." oninput="rechercheUser()">
                <div id="userList" class="list"></div>
            </div>
            <div id="userDetails" class="form-section" style="display:none;"></div>
        </div>
    </section>


</main>





<script src="admin.js"></script>
</body>
</html>
</title>
</head>
<body>
</body>
</html>