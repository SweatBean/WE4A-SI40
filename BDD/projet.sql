-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 05 mai 2025 à 03:37
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `ajouter_participation` (IN `p_email` VARCHAR(255), IN `p_id_cour` INT)   BEGIN
    IF EXISTS (SELECT 1 FROM personne WHERE email = p_email) THEN
        IF EXISTS (SELECT 1 FROM cour WHERE id_cour = p_id_cour) THEN
            IF NOT EXISTS (
                SELECT 1 FROM participation
                WHERE email = p_email
                AND id_cour = p_id_cour
            ) THEN
                INSERT INTO participation (id_cour, email)
                VALUES (p_id_cour, p_email);
            END IF;
        END IF;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `changer_role` (`email` VARCHAR(255), `eleve` TINYINT, `prof` TINYINT, `admin` TINYINT)   BEGIN
  UPDATE personne
  SET est_élève = eleve, est_prof = prof, est_admin = admin
  WHERE email = email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cour_inscrit` (IN `email_utilisateur` VARCHAR(255))   BEGIN
  SELECT c.id_cour, c.nom
  FROM cour c
  JOIN participation p ON c.id_cour = p.id_cour
  WHERE p.email = email_utilisateur;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `cour_personne` (IN `p_email` VARCHAR(255))   BEGIN
  SELECT c.id_cour, c.nom, c.description, c.image
  FROM cour c
  JOIN participation part ON part.id_cour = c.id_cour
  WHERE part.email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `creer_UE` (IN `p_nom` VARCHAR(255), IN `p_description` TEXT, IN `p_image` VARCHAR(255))   BEGIN
    INSERT INTO cour (nom, description, image)
    VALUES (p_nom, p_description, p_image);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `creer_user` (IN `p_email` VARCHAR(255), IN `p_nom_utilisateur` VARCHAR(255), IN `p_mot_de_passe` VARCHAR(255), IN `p_est_eleve` TINYINT, IN `p_est_prof` TINYINT, IN `p_est_admin` TINYINT)   BEGIN
    INSERT INTO personne (email, nom_utilisateur, mot_de_passe, est_élève, est_prof, est_admin)
    VALUES (p_email, p_nom_utilisateur, p_mot_de_passe, p_est_eleve, p_est_prof, p_est_admin);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `epingler_message` (`id_section` INT)   BEGIN
  DECLARE current_epingle TINYINT;

  -- recupère si le msg est épingler ou non
  SELECT epingle INTO current_epingle
  FROM msg
  WHERE id_section = id_section;

  -- change l'état d'épinglement
  IF current_epingle = 0 THEN
    UPDATE msg
    SET epingle = 1
    WHERE id_section = id_section;
  ELSE
    UPDATE msg
    SET epingle = 0
    WHERE id_section = id_section;
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `lister_participants` (IN `id_cour` INT)   BEGIN
  SELECT p.email, CONCAT(p.prenom, ' ', p.nom) AS nom
  FROM personne p
  JOIN participation pa ON p.email = pa.email
  WHERE pa.id_cour = id_cour;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `liste_msg_user` (IN `p_email` VARCHAR(255))   BEGIN
    SELECT m.id_section, m.Titre, m.date_creation, m.contenu, m.type, m.epingle
    FROM msg m
    JOIN participation p ON p.id_cour = m.id_cour
    WHERE p.email = p_email
    ORDER BY m.epingle DESC, m.date_creation DESC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `messages_du_cours` (IN `p_id_cour` INT)   BEGIN
    SELECT *
    FROM msg
    WHERE id_cour = p_id_cour
    ORDER BY epingle DESC, date_creation DESC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `modifier_message` (IN `p_id_section` INT, IN `p_email` VARCHAR(255), IN `p_titre` VARCHAR(255), IN `p_contenu` TEXT, IN `p_type` VARCHAR(255), IN `p_epingle` TINYINT)   BEGIN
  UPDATE msg
  SET Titre = p_titre, contenu = p_contenu, type = p_type, epingle = p_epingle
  WHERE id_section = p_id_section AND email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `notes_cour_personne` (IN `p_email` VARCHAR(255), IN `p_id_cour` INT)   BEGIN
    SELECT 
        c.id_control,
        c.coef,
        n.note,
        (
            SELECT COUNT(*) + 1
            FROM notes n2
            JOIN controle c2 ON n2.id_control = c2.id_control
            WHERE c2.id_cour = c.id_cour
              AND n2.id_control = c.id_control
              AND n2.note > n.note
        ) AS rang
    FROM notes n
    JOIN controle c ON n.id_control = c.id_control
    WHERE n.email = p_email AND c.id_cour = p_id_cour;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `poster_message` (IN `email` VARCHAR(255), IN `id_cour` INT, IN `titre` VARCHAR(255), IN `contenu` TEXT, IN `type` VARCHAR(255), IN `epingle` TINYINT)   BEGIN
  INSERT INTO msg (email, id_cour, titre, contenu, type, epingle)
  VALUES (email, id_cour, titre, contenu, type, epingle);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `retirer_participation` (IN `p_email` VARCHAR(255), IN `p_id_cour` INT)   BEGIN
    IF EXISTS (
        SELECT 1
        FROM participation
        WHERE email = p_email
        AND id_cour = p_id_cour
    ) THEN
        DELETE FROM participation
        WHERE email = p_email
        AND id_cour = p_id_cour;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `supprimer_cours` (IN `p_id_cour` INT)   BEGIN
  DELETE FROM msg WHERE id_cour = p_id_cour;
  DELETE FROM participation WHERE id_cour = p_id_cour;
  -- risquer de suprimmer tout les control et dons les note lier à l'ue
  DELETE FROM controle WHERE id_cour = p_id_cour;
  DELETE FROM cour WHERE id_cour = p_id_cour;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `supprimer_message` (`id_section` INT)   BEGIN
  DELETE FROM msg WHERE id_section = id_section;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `supprimer_utilisateur` (IN `p_email` VARCHAR(255))   BEGIN
  DELETE FROM participation
  WHERE email = p_email;
  -- risquer de suprimer tout les msg d'un user quand il est suprimer
  DELETE FROM msg
  WHERE email = p_email;
  DELETE FROM personne
  WHERE email = p_email;
END$$

--
-- Fonctions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `acces` (`p_email` VARCHAR(255)) RETURNS INT(11) DETERMINISTIC BEGIN
  DECLARE estEleve TINYINT DEFAULT 0;
  DECLARE estProf TINYINT DEFAULT 0;
  DECLARE estAdmin TINYINT DEFAULT 0;

  SELECT est_élève, est_prof, est_admin
  INTO estEleve, estProf, estAdmin
  FROM personne
  WHERE email = p_email;

  IF estEleve = 1 AND estProf = 0 AND estAdmin = 0 THEN
    RETURN 1;
  ELSEIF estEleve = 0 AND estProf = 1 AND estAdmin = 0 THEN
    RETURN 2;
  ELSEIF estEleve = 0 AND estProf = 0 AND estAdmin = 1 THEN
    RETURN 3;
  ELSEIF estProf = 1 AND estAdmin = 1 THEN
    RETURN 4;
  ELSE
    RETURN 0; -- Erreur
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `moyenne_et_rang` (`p_email` VARCHAR(255), `p_id_cour` INT) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci DETERMINISTIC BEGIN
    DECLARE moy DOUBLE DEFAULT 0;
    DECLARE rang INT DEFAULT 0;
    
    -- calcule la moyenne de l'élève
    SELECT 
        IFNULL(SUM(n.note * c.coef) / NULLIF(SUM(c.coef), 0), 0)
    INTO moy
    FROM notes n
    JOIN controle c ON n.id_control = c.id_control
    WHERE n.email = p_email AND c.id_cour = p_id_cour;

    -- calcule rang de l'élève
    SELECT COUNT(DISTINCT email) + 1
    INTO rang
    FROM (
        SELECT n.email,
               SUM(n.note * c.coef) / NULLIF(SUM(c.coef), 0) AS moyenne
        FROM notes n
        JOIN controle c ON n.id_control = c.id_control
        WHERE c.id_cour = p_id_cour
        GROUP BY n.email
        HAVING moyenne > moy
    ) AS sous;

    RETURN CONCAT('Moyenne: ', ROUND(moy, 2), ', Rang: ', rang);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `controle`
--

CREATE TABLE `controle` (
  `id_control` int(11) NOT NULL,
  `id_cour` int(11) DEFAULT NULL,
  `coef` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `controle`
--

INSERT INTO `controle` (`id_control`, `id_cour`, `coef`) VALUES
(1, 1, 2.00),
(2, 2, 1.50);

-- --------------------------------------------------------

--
-- Structure de la table `cour`
--

CREATE TABLE `cour` (
  `id_cour` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cour`
--

INSERT INTO `cour` (`id_cour`, `nom`, `description`, `image`) VALUES
(1, 'WE4A', 'HTML, CSS, JS, PHP...', 'WE4A.jpg'),
(2, 'SI40', 'Base de données', 'SI40.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `msg`
--

CREATE TABLE `msg` (
  `id_section` int(11) NOT NULL,
  `Titre` varchar(255) NOT NULL,
  `date_creation` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) DEFAULT NULL,
  `id_cour` int(11) DEFAULT NULL,
  `contenu` text DEFAULT NULL,
  `lien` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `epingle` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `msg`
--

INSERT INTO `msg` (`id_section`, `Titre`, `date_creation`, `email`, `id_cour`, `contenu`, `lien`, `type`, `epingle`) VALUES
(1, 'Bienvenue', '2025-05-05 00:04:42', 'prof1@mail.com', 1, 'Bienvenue dans le cours de maths !', NULL, 'annonce', 1),
(2, 'Exercice 1', '2025-05-05 00:04:42', 'prof1@mail.com', 1, 'Faites cet exercice pour le prochain cours.', 'ex1.pdf', 'ressource', 0);

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE `notes` (
  `email` varchar(255) NOT NULL,
  `id_control` int(11) NOT NULL,
  `note` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`email`, `id_control`, `note`) VALUES
('eleve1@mail.com', 1, 15.50),
('eleve1@mail.com', 2, 12.00);

-- --------------------------------------------------------

--
-- Structure de la table `participation`
--

CREATE TABLE `participation` (
  `id_cour` int(11) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `participation`
--

INSERT INTO `participation` (`id_cour`, `email`) VALUES
(1, 'eleve1@mail.com'),
(2, 'eleve1@mail.com');

-- --------------------------------------------------------

--
-- Structure de la table `personne`
--

CREATE TABLE `personne` (
  `email` varchar(255) NOT NULL,
  `nom_utilisateur` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `est_élève` tinyint(1) DEFAULT 0,
  `est_prof` tinyint(1) DEFAULT 0,
  `est_admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `personne`
--

INSERT INTO `personne` (`email`, `nom_utilisateur`, `mot_de_passe`, `est_élève`, `est_prof`, `est_admin`) VALUES
('admin1@mail.com', 'admin1', 'mdp3', 0, 0, 1),
('eleve1@mail.com', 'eleve1', 'mdp1', 1, 0, 0),
('paul@mail.com', 'paul', 'mdp4', 0, 1, 1),
('prof1@mail.com', 'prof1', 'mdp2', 0, 1, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `controle`
--
ALTER TABLE `controle`
  ADD PRIMARY KEY (`id_control`),
  ADD KEY `id_cour` (`id_cour`);

--
-- Index pour la table `cour`
--
ALTER TABLE `cour`
  ADD PRIMARY KEY (`id_cour`);

--
-- Index pour la table `msg`
--
ALTER TABLE `msg`
  ADD PRIMARY KEY (`id_section`),
  ADD KEY `email` (`email`),
  ADD KEY `id_cour` (`id_cour`);

--
-- Index pour la table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`email`,`id_control`),
  ADD KEY `id_control` (`id_control`);

--
-- Index pour la table `participation`
--
ALTER TABLE `participation`
  ADD PRIMARY KEY (`id_cour`,`email`),
  ADD KEY `email` (`email`);

--
-- Index pour la table `personne`
--
ALTER TABLE `personne`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `nom_utilisateur` (`nom_utilisateur`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `controle`
--
ALTER TABLE `controle`
  MODIFY `id_control` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `cour`
--
ALTER TABLE `cour`
  MODIFY `id_cour` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `msg`
--
ALTER TABLE `msg`
  MODIFY `id_section` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `controle`
--
ALTER TABLE `controle`
  ADD CONSTRAINT `controle_ibfk_1` FOREIGN KEY (`id_cour`) REFERENCES `cour` (`id_cour`) ON DELETE CASCADE;

--
-- Contraintes pour la table `msg`
--
ALTER TABLE `msg`
  ADD CONSTRAINT `msg_ibfk_1` FOREIGN KEY (`email`) REFERENCES `personne` (`email`) ON DELETE SET NULL,
  ADD CONSTRAINT `msg_ibfk_2` FOREIGN KEY (`id_cour`) REFERENCES `cour` (`id_cour`) ON DELETE SET NULL;

--
-- Contraintes pour la table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`email`) REFERENCES `personne` (`email`) ON DELETE CASCADE,
  ADD CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`id_control`) REFERENCES `controle` (`id_control`) ON DELETE CASCADE;

--
-- Contraintes pour la table `participation`
--
ALTER TABLE `participation`
  ADD CONSTRAINT `participation_ibfk_1` FOREIGN KEY (`id_cour`) REFERENCES `cour` (`id_cour`) ON DELETE CASCADE,
  ADD CONSTRAINT `participation_ibfk_2` FOREIGN KEY (`email`) REFERENCES `personne` (`email`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
