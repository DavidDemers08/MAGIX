let chargement = document.getElementsByClassName("ring")
let board = document.getElementsByClassName("contenant")
const bouton = document.querySelector("#bouton_fin_tour")
var dragged
let cartes

bouton.onclick = () => {
    formData = new FormData();
    formData.append("action",'END_TURN')
    action()
}

const action = () => {
    fetch("ajax-action.php", {
        method : "POST",
        body : formData
    })
.then(response => response.json())
.then(data => {
    console.log(data)
})
}

const state = () => {
    fetch("ajax-state.php", {   // Il faut crÃ©er cette page et son contrÃ´leur appelle 
        method : "POST"       // lâ€™API (games/state)
    })
.then(response => response.json())
.then(data => {
    console.log(data);
    // contient les cartes/Ã©tat du jeu.
    if (data == "LAST_GAME_WON" || data == "LAST_GAME_LOST") {
        location.href = "lobby.php"
    }
    if (data != "WAITING"){

        board[0].style.display = "flex"
        chargement[0].style.display = 'none'
        document.getElementById("moi_vie").innerText = data.hp
        document.getElementsByClassName("autre_vie").innerText = data.opponent.hp
        

        joueur_cartes(data)
        ennemi_cartes(data)
        montrer_board(data)
        
    cartes = document.querySelectorAll("#carte");

    cartes.forEach(carte => {
        carte.addEventListener('dragstart',(event) => {
            dragged = event.target
            event.target.style.opacity = 0.5
        },false)
        carte.addEventListener('dragend',(event) =>{
            event.target.style.opacity = "";
        },false)
        carte.addEventListener("dragover",(event) => {
            // Empêche default d'autoriser le drop
            event.preventDefault();
        }, false);

    })
    
    }
    

    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer lâ€™appel
    })
}

window.addEventListener("load", () => {
setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

function montrer_board(data){

    effacer_board()
    afficher(data)
}

function click(evt) {
    console.log("salut")
}
function afficher(data) {

    for (let index = 0; index < data.opponent.board.length; index++) {
        let div = document.createElement("div")
        let cadre = document.createElement("img")
        let mana = document.createElement("p")
        let atk = document.createElement("p")
        let hp = document.createElement("p")
        let monstre = document.createElement("img")

        mana.setAttribute('id',"mana")
        atk.setAttribute('id',"atk")
        hp.setAttribute('id',"hp")
        cadre.setAttribute('id',"cadre")
        monstre.setAttribute('id','monstre')

        div.setAttribute('id',data.opponent.board[index].id)
        div.setAttribute('id','ennemi_carte')
        div.setAttribute('draggable','false')
        cadre.setAttribute('draggable','false')
        monstre.setAttribute('draggable','false')

        mana.innerText = data.opponent.board[index].cost
        atk.innerText = data.opponent.board[index].atk
        hp.innerText = data.opponent.board[index].hp



        monstre.src = "jpg/Hnet.com-image.png"
        cadre.src = "png/carte_visible.png"

        
        
        div.appendChild(monstre)
        div.appendChild(cadre)
        div.appendChild(mana)
        div.appendChild(atk)
        div.appendChild(hp)

        document.getElementById("terrain_ennemi").appendChild(div)
    }

    for (let index = 0; index < data.board.length; index++) {
        let div = document.createElement("div")
        let cadre = document.createElement("img")
        let mana = document.createElement("p")
        let atk = document.createElement("p")
        let hp = document.createElement("p")
        let monstre = document.createElement("img")

        mana.setAttribute('id',"mana")
        atk.setAttribute('id',"atk")
        hp.setAttribute('id',"hp")
        cadre.setAttribute('id',"cadre")
        monstre.setAttribute('id','monstre')

        div.setAttribute('id',data.board[index].id)
        div.setAttribute('id','carte')
        div.setAttribute('draggable','false')

        mana.innerText = data.board[index].cost
        atk.innerText = data.board[index].atk
        hp.innerText = data.board[index].hp


        monstre.src = "jpg/Hnet.com-image.png"
        cadre.src = "png/carte_visible.png"

        
        
        div.appendChild(monstre)
        div.appendChild(cadre)
        div.appendChild(mana)
        div.appendChild(atk)
        div.appendChild(hp)

        document.getElementById("mon_terrain").appendChild(div)
    }

    
}

function effacer_board() {

    while (document.getElementById("mon_terrain").firstChild) {
        document.getElementById("mon_terrain").removeChild(document.getElementById("mon_terrain").firstChild)
    }

    while (document.getElementById("terrain_ennemi").firstChild) {
        document.getElementById("terrain_ennemi").removeChild(document.getElementById("terrain_ennemi").firstChild)
    }
}




function ennemi_cartes(data) {

    while (document.getElementById("contenant_adversaire").firstChild) {
        document.getElementById("contenant_adversaire").removeChild(document.getElementById("contenant_adversaire").firstChild)
    }

    for (let index = 0; index < data.opponent.handSize; index++) {
        let img = document.createElement("img")
        img.src = "png/back_card.png"
        img.style.maxHeight = "100%"
        img.setAttribute('draggable','false')
        document.getElementById("contenant_adversaire").appendChild(img)
    }
}


function joueur_cartes(data){

    while (document.getElementById("contenant_main").firstChild) {
        document.getElementById("contenant_main").removeChild(document.getElementById("contenant_main").firstChild)
    }


    for (let index = 0; index < data.hand.length; index++) {
        let div = document.createElement("div")
        let cadre = document.createElement("img")
        let mana = document.createElement("p")
        let atk = document.createElement("p")
        let hp = document.createElement("p")
        let monstre = document.createElement("img")

        mana.setAttribute('id',"mana")
        atk.setAttribute('id',"atk")
        hp.setAttribute('id',"hp")
        cadre.setAttribute('id',"cadre")
        monstre.setAttribute('id','monstre')

        div.setAttribute('id',data.hand[index].id)
        div.setAttribute('id','carte')
        div.setAttribute('draggable','true')
        cadre.setAttribute('draggable','false')
        monstre.setAttribute('draggable','false')


        mana.innerText = data.hand[index].cost
        atk.innerText = data.hand[index].atk
        hp.innerText = data.hand[index].hp



        div.style.height = "100%"
        monstre.src = "jpg/Hnet.com-image.png"
        cadre.src = "png/carte_visible.png"

        
        
        div.appendChild(monstre)
        div.appendChild(cadre)
        div.appendChild(mana)
        div.appendChild(atk)
        div.appendChild(hp)

        document.getElementById("contenant_main").appendChild(div)
    }
}