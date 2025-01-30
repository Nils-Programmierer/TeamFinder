const result = document.getElementById("result");
const colors = ["#12ed2b", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#bdb2ff", "#ffc6ff", "#ed1241", "#eda012", "#ffffff", "#cbcac8", "#ffff3d", "#4a3dff", "#f93dff", "#74530b", "#bb0c12"];


document.addEventListener("DOMContentLoaded", () => {
    const safeGroups = localStorage.getItem("groups");

    if (safeGroups) {
        const groups = JSON.parse(safeGroups);

        groups.forEach((group, index) => {
            const div = document.createElement("div");
            div.setAttribute("class", "group");
            div.style.backgroundColor = colors[index % colors.length];
            div.innerHTML = `<h3>Gruppe ${index + 1}</h3>`;

            group.forEach(name => {
                const p = document.createElement("p");
                p.textContent = name;
                div.appendChild(p);
            });

            result.appendChild(div);
        });
    } else {
        Back();
    }
});


function Back() {
    window.history.back();
}