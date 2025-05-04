function openTab(tabId) {
    //onglet
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');

    const clickedButton = Array.from(document.querySelectorAll('.tab-button'))
        .find(btn => btn.getAttribute("onclick").includes(tabId));
    if (clickedButton) clickedButton.classList.add('active');
}

function previewImageUE(event) {
    //prévisualisation des immages de l'ue
    const input = event.target;
    const preview = document.getElementById('imageUEPreview');

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// donné exemple
const exemplesUE = [
    { nom: "RS40", description: "Réseau et cybersécurité." },
    { nom: "SI40", description: "Les bases de données." },
    { nom: "WE4AB", description: "HTML, CSS, JavaScript, PHP." }
];

const exemplesUsers = [
    { email: "alice@example.com", nom: "Alice", role: "Étudiant", ues: ["RS40"] },
    { email: "bob@example.com", nom: "Bob", role: "Enseignant", ues: ["SI40"] },
    { email: "carla@example.com", nom: "Carla", role: "Administrateur", ues: [] }
];


const associations = {
    "RS40": ["alice@example.com"],
    "SI40": ["bob@example.com"],
};


function chargerUE(filtre = "") {
    //afficher UE
    const ueList = document.getElementById("ueList");
    ueList.innerHTML = ""; // Vide la liste avant de remplir

    exemplesUE
        .filter(ue => ue.nom.toLowerCase().includes(filtre.toLowerCase()) || ue.description.toLowerCase().includes(filtre.toLowerCase()))
        .forEach(ue => {
            const div = document.createElement("div");
            div.className = "ue-item";
            div.textContent = `${ue.nom} — ${ue.description}`;
            div.onclick = () => afficherDetailsUE(ue.nom);
            ueList.appendChild(div);
        });
}


function chargerUsers(filtre = "") {
    //affiche user
    const userList = document.getElementById("userList");
    userList.innerHTML = ""; // Vide la liste avant de remplir

    exemplesUsers
        .filter(user => user.nom.toLowerCase().includes(filtre.toLowerCase()) || user.email.toLowerCase().includes(filtre.toLowerCase()) || user.role.toLowerCase().includes(filtre.toLowerCase()))
        .forEach(user => {
            const div = document.createElement("div");
            div.className = "user-item";
            div.textContent = `${user.nom} (${user.role}) — ${user.email}`;
            div.onclick = () => afficherDetailsUser(user.email);
            userList.appendChild(div);
        });
}


function rechercheUE() {
    //recherche avec mot clés dans les UE
    const filtre = document.getElementById("searchUE").value;
    chargerUE(filtre);
}

function rechercheUser() {
    //recherche avec mot clés dans les user
    const filtre = document.getElementById("searchUser").value;
    chargerUsers(filtre);
}



function afficherDetailsUE(nomUE) {
    //affiche le détaille d'une UE (nom, description user inscrit) depuit celui-ci on peut enlever des user ou en rajouter ou encore regarder un détail un user
    const ue = exemplesUE.find(u => u.nom === nomUE);
    const ueDetails = document.getElementById("ueDetails");
    if (!ue) return;

    const usersDansUe = exemplesUsers.filter(user => user.ues?.includes(nomUE));
    openTab("tabUE");
    ueDetails.innerHTML = `
        <h3>Détails de l'UE : ${ue.nom}</h3>
        <p>${ue.description}</p>
        <h4>Étudiants dans cette UE</h4>
        <div id="usersInUe">
            ${usersDansUe.map(user => `
                <div class="list-item">
                    <button class="user-item" onclick="afficherDetailsUser('${user.email}')">
                        ${user.nom} (${user.role}) — ${user.email}
                    </button>
                    <button class="remove-btn" onclick="retirerUserDeUE('${user.email}', '${ue.nom}')">❌</button>
                </div>
            `).join('')}
        </div>
        <input type="text" id="ajoutUserUEInput" placeholder="Rechercher un utilisateur..." oninput="rechercheAjoutUser()">
        <button onclick="ajouterUserAUE('${ue.nom}')">Ajouter</button>
    `;
    ueDetails.style.display = "block";
}







function afficherDetailsUser(email) {
    //affiche le détaille d'un user (nom, e-mail, role) depuit celui-ci on peut enlever des UE ou en rajouter ou encore regarder un détail une UE
    const user = exemplesUsers.find(u => u.email === email);
    const userDetails = document.getElementById("userDetails");
    if (!user) return;

    const sesUEs = user.ues || [];
    openTab("tabuser");
    userDetails.innerHTML = `
        <h3>Détails de l'utilisateur : ${user.nom}</h3>
        <p>Rôle : ${user.role}<br>Email : ${user.email}</p>
        <h4>UEs suivies</h4>
        <div id="uesDuUser">
            ${sesUEs.map(nomUE => {
        const ue = exemplesUE.find(u => u.nom === nomUE);
        if (!ue) return '';
        return `
                    <div class="list-item">
                        <button class="ue-item" onclick="afficherDetailsUE('${ue.nom}')">
                            ${ue.nom} — ${ue.description}
                        </button>
                        <button class="remove-btn" onclick="retirerUEDeUser('${email}', '${ue.nom}')">❌</button>
                    </div>
                `;
    }).join('')}
        </div>
        <input type="text" id="ajoutUEUserInput" placeholder="Rechercher une UE..." oninput="rechercheAjoutUE()">
        <button onclick="ajouterUEAUser('${email}')">Ajouter</button>
    `;
    userDetails.style.display = "block";
}






//a partir d'ici les fonction ne marche pas
function retirerUserDeUE(email, nomUE) {
    const user = exemplesUsers.find(u => u.email === email);
    if (!user) return;
    user.ues = (user.ues || []).filter(ue => ue !== nomUE);
    afficherDetailsUE(nomUE);
}

function ajouterUserAUE(nomUE) {
    const recherche = document.getElementById("ajoutUserUEInput").value.toLowerCase();
    const user = exemplesUsers.find(u => u.nom.toLowerCase().includes(recherche));
    if (!user) return alert("Utilisateur introuvable !");
    user.ues = user.ues || [];
    if (!user.ues.includes(nomUE)) user.ues.push(nomUE);
    afficherDetailsUE(nomUE);
}

function retirerUEDeUser(email, nomUE) {
    const user = exemplesUsers.find(u => u.email === email);
    if (!user) return;
    user.ues = (user.ues || []).filter(ue => ue !== nomUE);
    afficherDetailsUser(email);
}

function ajouterUEAUser(email) {
    const recherche = document.getElementById("ajoutUEUserInput").value.toLowerCase();
    const ue = exemplesUE.find(u => u.nom.toLowerCase().includes(recherche));
    const user = exemplesUsers.find(u => u.email === email);
    if (!ue || !user) return alert("UE ou utilisateur introuvable !");
    user.ues = user.ues || [];
    if (!user.ues.includes(ue.nom)) user.ues.push(ue.nom);
    afficherDetailsUser(email);
}


function rechercheAjoutUser(nomUe, terme) {
    const result = document.getElementById("rechercheAjoutUserResult");
    const filtrés = exemplesUsers.filter(u => u.nom.toLowerCase().includes(terme.toLowerCase()) && !(associations[nomUe] || []).includes(u.email));
    result.innerHTML = filtrés.map(u =>
        `<div>${u.nom} (${u.email}) <button onclick="ajouterUserAUE('${nomUe}', '${u.email}')">➕</button></div>`
    ).join('') || "<p>Aucun résultat</p>";
}

function rechercheAjoutUE(email, terme) {
    const result = document.getElementById("rechercheAjoutUEResult");
    const uesInscrites = Object.entries(associations).filter(([_, users]) => users.includes(email)).map(([ue]) => ue);
    const filtrés = exemplesUE.filter(ue => ue.nom.toLowerCase().includes(terme.toLowerCase()) && !uesInscrites.includes(ue.nom));
    result.innerHTML = filtrés.map(ue =>
        `<div>${ue.nom} <button onclick="ajouterUEAUser('${ue.nom}', '${email}')">➕</button></div>`
    ).join('') || "<p>Aucun résultat</p>";
}







// Lancer au chargement de la page
window.onload = function () {
    chargerUE();
    chargerUsers();
};

//todo créer + rajouter ne marche pas