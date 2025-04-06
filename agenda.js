document.addEventListener('DOMContentLoaded', function () {
    const agenda = document.getElementById('agenda');
    const main = document.getElementById('eventDetails');

    const calendar = new FullCalendar.Calendar(agenda, {
        initialView: 'dayGridMonth',
        locale: 'fr',
        firstDay: 1,
        events: [
            {
                title: 'Rendus projet',
                cour: 'WE4A',
                description: 'Il faut rendre une version préliminaire du site contenant HTML, CSS, JS',
                start: '2025-04-07'
            }
        ],
        eventClick: function(info) {
            info.jsEvent.preventDefault(); // pas d'ouverture par défaut

            // Récupérer les données de l’événement
            const titre = info.event.title;
            const cour = info.event.extendedProps.cour;
            const description = info.event.extendedProps.description;
            const date = info.event.start.toLocaleDateString('fr-FR');

            // Insérer les infos dans le <main>
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