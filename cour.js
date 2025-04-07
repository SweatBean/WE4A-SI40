function afficherOnglet(nom) {
    const onglets = ['contenu', 'notes', 'participants'];
    onglets.forEach(id => {
        document.getElementById(id).style.display = id === nom ? 'flex' : 'none';
        document.getElementById(`btn-${id}`).id = `btn-${id}`; // reset ID
    });

    document.getElementById(`btn-${nom}`).id = 'bouton_menu_actif';
}

function toggleSection(element) {
    const section = element.parentElement;
    section.classList.toggle('active');
}

// Par défaut, afficher "contenu"
afficherOnglet('contenu');