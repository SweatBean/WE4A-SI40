//savoir si on est prof
let isProfMode = false;

//données d'example
const users = [
    { nom: "Alice Martin", role: "Étudiante", email: "alice@example.com" },
    { nom: "Jean Dupont", role: "Professeur", email: "jean@example.com" },
    { nom: "Lucie Durand", role: "Étudiante", email: "lucie@example.com" }
];

//savoir si on voit participant
let isParticipantsVisible = false;

function toggleParticipants() {
    //changer si on voit ou non les participants
    const postsSection = document.getElementById("posts-section");
    const participantsSection = document.getElementById("participants");
    const button = document.getElementById("toggle-participants");

    isParticipantsVisible = !isParticipantsVisible;

    if (isParticipantsVisible) {
        postsSection.style.display = "none";
        participantsSection.style.display = "block";
        button.textContent = "Post";
        renderParticipants(users);
    } else {
        postsSection.style.display = "block";
        participantsSection.style.display = "none";
        button.textContent = "Participants";
    }
}

function rechercheUser() {
    // recherche des User
    const filtre = document.getElementById("searchUser").value.toLowerCase();
    const filteredUsers = users.filter(user =>
        user.nom.toLowerCase().includes(filtre) ||
        user.email.toLowerCase().includes(filtre)
    );
    renderParticipants(filteredUsers);
}

//donées exemple
const posts = [
    {
        titre: "Sujet",
        date: "29 avril 2025",
        heure: "15h12",
        auteur: "Prof. Dupont",
        contenu: "Le sujet du projet est disponible : ",
        nom_lien: "sujet",
        lien: "sujet_projet.pdf"
    },
    {
        titre: "changement heure",
        date: "28 avril 2025",
        heure: "10h00",
        auteur: "Prof. Dupont",
        contenu: "Le cours commencera à 8h30 au lieu de 8h ce jeudi",
        nom_lien: null,
        lien: null
    }
];

function renderParticipants(filteredUsers) {
    //affichage des participants
    const container = document.getElementById("participants-list");
    container.innerHTML = "";

    filteredUsers.forEach(user => {
        const div = document.createElement("div");
        div.className = "participant-card";
        div.textContent = `${user.nom} (${user.role}) — ${user.email}`;
        container.appendChild(div);
    });
}

document.getElementById("prof-toggle").addEventListener("click", () => {
    //changement de rôle (elève / prof)
    isProfMode = !isProfMode;
    renderPosts();
});

function renderPosts() {
    //permet d'afficher les post (et outils d'édition et poubelle si prof)
    //todo gérérer différent type de post + ceux épinglet
    const container = document.getElementById("posts-section");
    container.innerHTML = "";

    const addPostButton = document.getElementById("add-post-button");
    if (addPostButton) {
        addPostButton.style.display = isProfMode ? "inline-block" : "none";
    }

    posts.forEach((post, index) => {
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
            link.textContent = post.nom_lien + " ⬇";
            link.className = "lien";
            content.appendChild(link);
        }

        postDiv.appendChild(title);
        postDiv.appendChild(meta);
        postDiv.appendChild(content);

        if (isProfMode) {
            const editBtn = document.createElement("button");
            editBtn.textContent = "✏️";
            editBtn.className = "edit-button";
            editBtn.onclick = () => editPost(index);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "🗑️";
            deleteBtn.className = "delete-button";
            deleteBtn.onclick = () => {
                if (confirm("Supprimer ce post ?")) {
                    posts.splice(index, 1);
                    renderPosts();
                }
            };

            const actionsDiv = document.createElement("div");
            actionsDiv.className = "post-actions";
            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(deleteBtn);
            postDiv.appendChild(actionsDiv);
        }

        container.appendChild(postDiv);
    });
}
//permet déditer/de créer un post
let postIndexToEdit = null;

function editPost(index) {
    //modifier un psot
    const post = posts[index];
    postIndexToEdit = index;

    document.getElementById("edit-titre").value = post.titre;
    document.getElementById("edit-contenu").value = post.contenu;
    document.getElementById("edit-nom-fichier").value = post.nom_lien || "";
    document.getElementById("edit-form").style.display = "block";
}

function creerPost() {
    //créer un post
    document.getElementById("edit-form").style.display = "block";
}

function cancelEdit() {
    //annulation de création ou de modification de post
    document.getElementById("edit-form").style.display = "none";
    postIndexToEdit = null;
}

document.getElementById("post-edit-form").addEventListener("submit", function (e) {
    //permet de préremplir le questionnaire si on veut modifier un post
    e.preventDefault();
    if (postIndexToEdit !== null) {
        const titre = document.getElementById("edit-titre").value;
        const contenu = document.getElementById("edit-contenu").value;
        const nomFichier = document.getElementById("edit-nom-fichier").value;
        const fichier = document.getElementById("edit-fichier").files[0];

        posts[postIndexToEdit].titre = titre;
        posts[postIndexToEdit].contenu = contenu;
        posts[postIndexToEdit].nom_lien = nomFichier;
        posts[postIndexToEdit].lien = fichier ? URL.createObjectURL(fichier) : posts[postIndexToEdit].lien;

        renderPosts();
        cancelEdit();
    }
});
//chargement au lancement
window.onload = function () {
    renderPosts();
};
