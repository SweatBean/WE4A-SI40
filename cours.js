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