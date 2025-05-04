document.addEventListener('DOMContentLoaded', function () {
    //calendrier
    const agenda = document.getElementById('agenda');
    const main = document.getElementById('eventDetails');

    const calendar = new FullCalendar.Calendar(agenda, {
        initialView: 'dayGridMonth',
        locale: 'fr',
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
        eventClick: function(info) {
            info.jsEvent.preventDefault();


            const titre = info.event.title;
            const cour = info.event.extendedProps.cour;
            const description = info.event.extendedProps.description;
            const date = info.event.start.toLocaleDateString('fr-FR');


            main.innerHTML = `
                    <h2>${titre}</h2>
                    <p><strong>Cours :</strong> ${cour}</p>
                    <p><strong>Date de rendu :</strong> ${date}</p>
                    <p><strong>Description :</strong> ${description}</p>
                `;
        }
    });

    calendar.render();
});