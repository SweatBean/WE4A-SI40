function openTab(tabId) {
    // Enlever 'active' de tous les contenus
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Enlever 'active' de tous les boutons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    // Ajouter 'active' à l'onglet choisi
    document.getElementById(tabId).classList.add('active');

    // Ajouter 'active' au bouton cliqué
    const clickedButton = Array.from(document.querySelectorAll('.tab-button'))
        .find(btn => btn.textContent.includes(tabId.slice(-1)));
    if (clickedButton) clickedButton.classList.add('active');
}
