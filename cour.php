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

<div class="page_cours">
    <main>
            <div class="header-cours">
                <h1 class="titre-cours">Mon cours</h1>
                <h3 class="sous-titre">Contenu du cours</h3>
            </div>

            <!-- Menu de navigation (Notes, Participants) -->
            <div class="menu-cours">
                <button class="menu-btn" onclick="showSection('notes')">Notes du cours</button>
                <button class="menu-btn" onclick="showSection('participants')">Participants</button>
            </div>

            <!-- Sections du cours -->
            <div class="sections-cours">
                <div class="section">
                    <div class="section-header" onclick="toggleSection(this)">Section 1 : Introduction</div>
                    <div class="section-content">Bienvenue dans la section 1. Voici le contenu introductif du cours.</div>
                </div>

                <div class="section">
                    <div class="section-header" onclick="toggleSection(this)">Section 2 : Théorie</div>
                    <div class="section-content">Voici la théorie importante du cours. Documents et vidéos ici.</div>
                </div>

                <div class="section">
                    <div class="section-header" onclick="toggleSection(this)">Section 3 : Exercices</div>
                    <div class="section-content">Voici quelques exercices à réaliser pour pratiquer.</div>
                </div>

                <div class="section">
                    <div class="section-header" onclick="toggleSection(this)">Section 4 : Étude de cas</div>
                    <div class="section-content">Étude de cas pratique sur le sujet du cours.</div>
                </div>

                <div class="section">
                    <div class="section-header" onclick="toggleSection(this)">Section 5 : Évaluation</div>
                    <div class="section-content">Tests, quiz et évaluation finale.</div>
                </div>
            </div>

            <!-- Sections de Notes et Participants -->
            <div id="notes" class="page_acceuil" style="display:none;">
                <div class="activity" style="width: 100%;">
                    <h3>Notes</h3>
                    <p>En travaux...</p>
                </div>
            </div>

            <div id="participants" class="page_acceuil" style="display:none;">
                <div class="activity" style="width: 100%;">
                    <h3>Participants</h3>
                    <p>En travaux...</p>
                </div>
            </div>
    </main>
</div>


<script src="cour.js"></script>
</body>
</html>
