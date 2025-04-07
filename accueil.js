document.getElementById("bouton_defil_cour").addEventListener("click", function () {
    let container = document.querySelector(".course-list");

    if (getComputedStyle(container).maxHeight === "300px") {
        container.style.maxHeight = "none";
        this.textContent = "▲";
    } else {
        container.style.maxHeight = "300px";
        this.textContent = "▼";
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const activityContainer = document.getElementById("activity-container");
    const scrollTrigger = document.getElementById("scroll-trigger");

    let loading = false;
    let itemCount = 20;

    function loadMoreItems() {
        if (loading) return;
        loading = true;

        setTimeout(() => {
            for (let i = 0; i < itemCount; i++) {
                let newItem = document.createElement("li");
                newItem.classList.add("activity-item");
                newItem.textContent = "Nouvel élément " + (activityContainer.children.length + 1);
                activityContainer.appendChild(newItem);
            }
            loading = false;
        }, 50);
    }


    document.querySelector(".activity").addEventListener("scroll", function () {
        if (this.scrollTop + this.clientHeight >= this.scrollHeight - 10) {
            loadMoreItems();
        }
    });


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
                description: 'Il faut rendre une version préliminaire du site contenant HTML, CSS, JS',
                start: '2025-04-07'  //todo quand on clique sur l'event aller sur agenda et afficher l'event en question
            }
        ],
        eventClick: function(info) {

            info.jsEvent.preventDefault();

            window.location.href="agenda.html";

        }
    });

    calendar.render();
});