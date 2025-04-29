const users = [
    { nom: "Alice Martin", role: "Étudiante", email: "alice@example.com" },
    { nom: "Jean Dupont", role: "Professeur", email: "jean@example.com" },
    { nom: "Lucie Durand", role: "Étudiante", email: "lucie@example.com" }
];

let isParticipantsVisible = false;

function toggleParticipants() {
    const postsSection = document.getElementById("posts-section");
    const participantsSection = document.getElementById("participants");
    const button = document.getElementById("toggle-participants");

    isParticipantsVisible = !isParticipantsVisible;

    if (isParticipantsVisible) {
        postsSection.style.display = "none";  // Masque les posts
        participantsSection.style.display = "block";  // Affiche la section participants
        button.textContent = "Post";
        renderParticipants(users);  // Affiche la liste des participants
    } else {
        postsSection.style.display = "block";  // Affiche les posts
        participantsSection.style.display = "none";  // Masque la section participants
        button.textContent = "Participants";
    }
}

function rechercheUser() {
    const filtre = document.getElementById("searchUser").value.toLowerCase();
    const filteredUsers = users.filter(user =>
        user.nom.toLowerCase().includes(filtre) ||
        user.email.toLowerCase().includes(filtre)
    );
    renderParticipants(filteredUsers);
}



const posts = [
    {
        titre: "Sujet",
        date: "29 avril 2025",
        heure: "15h12",
        auteur: "Prof. Dupont",
        contenu: "Le sujet du projet est diponible : ",
        nom_lien: "sujet",
        lien: "sujet_projet.pdf"
    },
    {
        titre: "Chapitre 2 : Les bases",
        date: "28 avril 2025",
        heure: "10h00",
        auteur: "Prof. Dupont",
        contenu: "Le cour commencera à 8h30 au lieu de 8h ce jeudis",
        nom_lein: null,
        lien: null
    }
];




function renderParticipants(filteredUsers) {
    const container = document.getElementById("participants-list");
    container.innerHTML = "";

    filteredUsers.forEach(user => {
        const div = document.createElement("div");
        div.className = "participant-card";
        div.textContent = `${user.nom} (${user.role}) — ${user.email}`;
        container.appendChild(div);
    });
}


function renderPosts() {
    const container = document.getElementById("posts-section");
    container.innerHTML = "";

    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";

        const title = document.createElement("h4");
        title.className = "post-title";
        title.textContent = post.titre;

        const meta = document.createElement("p");
        meta.className = "post-meta";
        meta.textContent = `Le ${post.date} à ${post.heure} — ${post.auteur}`;

        const content = document.createElement("p");
        content.className = "post-content";
        content.textContent = post.contenu;

        if (post.lien) {
            const link = document.createElement("a");
            link.href = post.lien;
            link.target = "_blank";
            link.textContent = post.nom_lien;
            link.className = "lien";
            content.appendChild(link);
        }

        postDiv.appendChild(title);
        postDiv.appendChild(meta);
        postDiv.appendChild(content);

        container.appendChild(postDiv);
    });
}

// Affichage initial des posts au chargement
window.onload = function () {
    renderPosts();
};
