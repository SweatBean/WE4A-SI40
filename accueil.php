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
            <a href="accueil.php">
                <button id="bouton_menu_actif" class="bouton_menu" disabled>accueil</button>
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

<div class="page_acceuil">
    <main>

        <section class="recent-courses">
            <h2>Cour récent</h2>
            <div class="course-list">
                <!-- todo géré les img des cour -->
                <div class="cour" onclick="window.location.href='cour.php'" style="cursor: pointer;">
                    <div class="course-img"></div>
                    <p>WE4A</p>
                    <a class="lien" href="sujet_projet.pdf" download="sujet_projet.pdf" onclick="event.stopPropagation();">Sujet projet ⬇</a>
                </div>
                <div class="cour" onclick="window.location.href='cour.php'" style="cursor: pointer;">
                    <div class="course-img"></div>
                    <p>SI40</p>
                    <p >Salle A101</p>
                </div>
                <div class="cour" onclick="window.location.href='cour.php'" style="cursor: pointer;">
                    <div class="course-img"></div>
                    <p>RS40</p>
                    <p>Début TP</p>
                </div>
            </div>
            <button id="bouton_defil_cour">▼</button>
        </section>
        <div class="activity" style="height: 400px; overflow-y: auto;">
            <div id="posts-section" class="activity" style="padding: 10px;"></div>
        </div>

    </main>
    <main id="page_acceuil_agenda">
        <!-- FullCalendar CSS -->
        <link href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.css" rel="stylesheet">

        <!-- FullCalendar JS -->
        <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js"></script>

        <h2><a class="lien" href="agenda.php">Mon Agenda</a></h2>
        <div id="agenda"></div>
    </main>


</div>

<script src="accueil.js"></script>
</body>
</html>
</title>
</head>
<body>
</body>
</html>

