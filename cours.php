<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mes cours</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
  <nav class="barre_bouton_menu">
    <div class="bouton_menu_gauche">
      <a href="accueil.php">
        <button class="bouton_menu">accueil</button>
      </a>
      <a href="cours.php">
        <button id="bouton_menu_actif" class="bouton_menu" disabled>mes cours</button>
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

<main id="main_cours">

    <section class="recent-courses">
      <h2>cour récent</h2>
      <div class="course-list">
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
      </div>
      <button id="bouton_defil_cour">▼</button>
    </section>

  </main>

<script src="cours.js"></script>
</body>
</html>
</title>
</head>
<body>
</body>
</html>

