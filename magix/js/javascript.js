var chargement = document.getElementsByClassName("ring")
var board = document.getElementsByClassName("contenant")


const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
 method : "POST"        // l’API (games/state)
    })
.then(response => response.json())
.then(data => {
    console.log(data);
    // contient les cartes/état du jeu.
    if (data != "WAITING"){
        document.body.style.backgroundImage = "url(jpg/waiting.jpg)"
        chargement[0].style.display = 'none'
        board[0].style.display = "flex"
        
    }
    if (data == "LAST_GAME_WON" || data == "LAST_GAME_LOST") {
        location.href = "lobby.php"
    }

    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

window.addEventListener("load", () => {
setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});
