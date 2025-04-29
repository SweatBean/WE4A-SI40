<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Cours</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <nav class="barre_bouton_menu">
        <div class="bouton_menu_gauche">
            <a href="accueil.php">
                <button class="bouton_menu">Accueil</button>
            </a>
            <a href="cours.php">
                <button class="bouton_menu">mes cours</button>
            </a>
            <a href="notes.php">
                <button class="bouton_menu">mes notes</button>
            </a>
        </div>
        <div>
            <a href="connexion.php">
                <button class="bouton_menu">déconnexion</button>
            </a>
        </div>
    </nav>
</header>



<div class="page_cour">
    <main>
        <div class="header-cours">
            <h1 class="titre-cours">WE4A</h1>
            <h3 class="sous-titre">HTML, CSS, JS, PHP...</h3>
        </div>

        <!-- Menu de navigation (Notes, Participants) -->
        <div class="menu-cours">
            <a href="note.php">
                <button class="menu-btn">Notes du cours</button>
            </a>
            <button id="toggle-participants" class="menu-btn" onclick="toggleParticipants()">Participants</button>
        </div>

        <!-- Section des posts -->
        <div id="posts-section" class="sections-cours">

        </div>

        <!-- Section Participants -->
        <div id="participants" class="page_acceuil" style="display:none;">
            <input type="text" id="searchUser" placeholder="Rechercher un utilisateur..." oninput="rechercheUser()">
            <div id="participants-list"></div>
        </div>
    </main>
</div>

<script src="cour.js"></script>
</body>
</html>
