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