const state = () => {
    fetch("https://notes-de-cours.com/dev/exam-api.php", {
        method : "POST"       
    })
.then(response => response.json())
.then(data => {
    console.log(data);

    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer lâ€™appel
})
}

window.addEventListener("load", () => {
setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});
