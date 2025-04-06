document.getElementById("bouton_defil_cour").addEventListener("click", function () {
    let container = document.querySelector(".course-list");

    // Comparer correctement la valeur de maxHeight
    if (getComputedStyle(container).maxHeight === "300px") {
        container.style.maxHeight = "none";  // Affiche tous les cours
        this.textContent = "▲";
    } else {
        container.style.maxHeight = "300px"; // Revient à une seule ligne
        this.textContent = "▼";
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const activityContainer = document.getElementById("activity-container");
    const scrollTrigger = document.getElementById("scroll-trigger");

    let loading = false; // Empêche le chargement multiple
    let itemCount = 20; // Nombre d’éléments à charger à chaque fois

    function loadMoreItems() {
        if (loading) return; // Évite le chargement en double
        loading = true;

        setTimeout(() => { // Simule un délai de chargement
            for (let i = 0; i < itemCount; i++) {
                let newItem = document.createElement("li");
                newItem.classList.add("activity-item");
                newItem.textContent = "Nouvel élément " + (activityContainer.children.length + 1);
                activityContainer.appendChild(newItem);
            }
            loading = false;
        }, 50);
    }

    // Détecte si on arrive en bas du conteneur
    document.querySelector(".activity").addEventListener("scroll", function () {
        if (this.scrollTop + this.clientHeight >= this.scrollHeight - 10) {
            loadMoreItems();
        }
    });

    // Charge les premiers éléments au démarrage
    loadMoreItems();
});


document.addEventListener('DOMContentLoaded', function () {
    const agenda = document.getElementById('agenda');

    const calendar = new FullCalendar.Calendar(agenda, {
        initialView: 'dayGridMonth',
        locale: 'fr',
        firstDay: 1,
        events: [
            {
                title: 'Rendus projet',
                cour: 'WE4A',
                start: '2025-04-07',
                url: 'agenda.html'  //surrement url différent selon event
            }
        ],
        eventClick: function(info) {
            // Empêche l'ouverture dans un nouvel onglet
            info.jsEvent.preventDefault();

            // Redirige vers l'URL définie
            if (info.event.url) {
                window.location.href = info.event.url;
            }
        }
    });

    calendar.render();
});