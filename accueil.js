document.addEventListener("DOMContentLoaded", function () {
    // === 1. BOUTON "VOIR PLUS" POUR .course-list ===
    const boutonDefilCour = document.getElementById("bouton_defil_cour");
    const courseList = document.querySelector(".course-list");

    if (courseList.scrollHeight <= courseList.clientHeight) {
        boutonDefilCour.style.display = "none";
    } else {
        boutonDefilCour.style.display = "block";
    }

    boutonDefilCour.addEventListener("click", function () {
        if (getComputedStyle(courseList).maxHeight === "300px") {
            courseList.style.maxHeight = "none";
            this.textContent = "▲";
        } else {
            courseList.style.maxHeight = "300px";
            this.textContent = "▼";
        }
    });

    // === 2. CHARGEMENT INFINI POUR .activity ===
    const activityContainer = document.getElementById("activity-container");
    const scrollActivity = document.querySelector(".activity");
    let loadingActivity = false;
    const itemCountActivity = 20;

    function loadMoreActivityItems() {
        if (loadingActivity) return;
        loadingActivity = true;

        setTimeout(() => {
            for (let i = 0; i < itemCountActivity; i++) {
                let newItem = document.createElement("li");
                newItem.classList.add("activity-item");
                newItem.textContent = "Nouvel élément " + (activityContainer.children.length + 1);
                activityContainer.appendChild(newItem);
            }
            loadingActivity = false;
        }, 50);
    }

    scrollActivity.addEventListener("scroll", function () {
        if (this.scrollTop + this.clientHeight >= this.scrollHeight - 10) {
            loadMoreActivityItems();
        }
    });

    loadMoreActivityItems(); // Chargement initial

    // === 3. FULLCALENDAR ===
    const agenda = document.getElementById("agenda");

    const calendar = new FullCalendar.Calendar(agenda, {
        initialView: "dayGridMonth",
        locale: "fr",
        firstDay: 1,
        events: [
            {
                title: "Sujet",
                cour: "WE4A",
                description: "Le sujet du projet est diponible",
                start: "2025-04-29"
            },
            {
                title: "changement heure",
                cour: "WE4A",
                description: "Le cour commencera à 8h30 au lieu de 8h ce jeudis",
                start: "2025-04-28"
            }
        ],
        eventClick: function (info) {
            info.jsEvent.preventDefault();
            window.location.href = "agenda.html";
        }
    });

    calendar.render();

    // === 4. AFFICHAGE DES POSTS (scroll infini) ===
    const postsSection = document.getElementById("posts-section");

    const posts = [
        {
            titre: "Sujet",
            date: "29 avril 2025",
            heure: "15h12",
            auteur: "Prof. Dupont",
            contenu: "Le sujet du projet est disponible : ",
            cour: "WE4A",
            nom_lien: "sujet",
            lien: "sujet_projet.pdf"
        },
        {
            titre: "Chapitre 2 : Les bases",
            date: "28 avril 2025",
            heure: "10h00",
            auteur: "Prof. Dupont",
            contenu: "Le cour commencera à 8h30 au lieu de 8h ce jeudi",
            cour: "WE4A",
            nom_lien: null,
            lien: null
        },
        {
            titre: "titre",
            date: "date",
            heure: "heure",
            auteur: "auteur",
            contenu: "contenu",
            cour: "cour",
            nom_lien: null,
            lien: null
        }
    ];



    let currentPostIndex = 0;
    const postBatchSize = 2;
    let loadingPosts = false;

    function renderPost(post) {
        const postDiv = document.createElement("div");
        postDiv.className = "post_aceuil";

        const title = document.createElement("h4");
        title.className = "post-title";
        title.textContent = post.titre;

        const meta = document.createElement("p");
        meta.className = "post-meta";
        meta.textContent = `Le ${post.date} à ${post.heure} — ${post.auteur}`;

        const cour = document.createElement("p");
        cour.className = "post-cour";
        cour.textContent = `Cours : ${post.cour}`;

        const content = document.createElement("p");
        content.className = "post-content";
        content.textContent = post.contenu;

        if (post.lien) {
            const link = document.createElement("a");
            link.href = post.lien;
            link.target = "_blank";
            link.textContent = post.nom_lien + " ⬇";
            link.className = "lien";
            content.appendChild(document.createElement("br"));
            content.appendChild(link);
        }

        postDiv.appendChild(title);
        postDiv.appendChild(meta);
        postDiv.appendChild(cour);
        postDiv.appendChild(content);

        return postDiv;
    }

    function loadMorePosts() {
        if (loadingPosts) return;
        loadingPosts = true;

        setTimeout(() => {
            for (let i = 0; i < postBatchSize; i++) {
                const post = posts[currentPostIndex];
                const postElement = renderPost(post);
                postsSection.appendChild(postElement);
                currentPostIndex++;
            }
            loadingPosts = false;
        }, 50);
    }

    const scrollPostsContainer = document.querySelector(".activity");

    scrollPostsContainer.addEventListener("scroll", function () {
        if (this.scrollTop + this.clientHeight >= this.scrollHeight - 10) {
            loadMorePosts();
        }
    });

    loadMorePosts(); // Chargement initial
});
