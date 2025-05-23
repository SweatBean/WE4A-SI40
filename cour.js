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

function showSection(sectionId) {
    document.getElementById('notes').style.display = 'none';
    document.getElementById('participants').style.display = 'none';

    document.getElementById(sectionId).style.display = 'block';
}

afficherOnglet('contenu');