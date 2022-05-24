const state = () => {
    fetch("fantome-state.php", {   // Il faut crÃ©er cette page et son contrÃ´leur appelle 
        method : "POST"       // lâ€™API (games/state)
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
