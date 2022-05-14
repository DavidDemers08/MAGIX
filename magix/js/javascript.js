let chargement = document.getElementsByClassName("ring")
let board = document.getElementsByClassName("contenant")
const bouton = document.querySelector("#bouton_fin_tour")
let cartes
const vie = document.querySelector(".m-vie")
let drag;
let monBoard;
let parent;
let id_selection
let power = document.querySelector(".power")

power.onclick = () => {
    formData = new FormData();
    formData.append("action",'HERO_POWER')
    action()

}
// console.log(boardCartes)
// document.querySelectorAll("cadre").forEach(carte => {
//     carte.onclick = () => {
//         console.log("salut")
//     }
// })



vie.onclick = () => {
    if (id_selection != undefined | id_selection != null) {
        attack(0)
    // formData = new FormData();
    // formData.append("action",'END_TURN')
    // action()
    // console.log("salut")
    }
}

bouton.onclick = () => {
    formData = new FormData();
    formData.append("action",'END_TURN')
    action()
}



function clickMechants(){
    if (id_selection != undefined | id_selection != null) {
        let mechants = document.querySelectorAll("#cadre-ennemi")
        mechants.forEach(carte =>{
            carte.onclick = () => {
                id = carte.parentNode.id
                attack(id)
            }
        })
    }
}

function attack(ennemi) {
    formData = new FormData();
    formData.append("action",'ATTACK')
    formData.append("uid",id_selection)
    formData.append("targetuid",ennemi)
    action()
    
}


function clickCartesBoard(data){
    let boardCartes = document.querySelectorAll(".cadre")
    boardCartes.forEach(carte => {
        carte.onclick = () => {
            if (id_selection != undefined) {
                id_selection = null
            }
            else {
                id_selection = carte.parentNode.id
            }
            
            
        }
    })
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
        document.getElementById("autre_vie").innerText = data.opponent.hp
        if (data.yourTurn == false) {
            bouton.disabled = true;
            document.querySelector(".power").src = "png/poweroff.png"
        }
        if(data.heroPowerAlreadyUsed == true){
            document.querySelector(".power").src = "png/poweroff.png"
        }
        else {
            bouton.disabled = false;
            document.querySelector(".power").src = "png/power.png" 
        }

        joueur_cartes(data)
        ennemi_cartes(data)
        montrer_board(data)
        clickCartesBoard(data)
        clickMechants(data)
        
        dragAndDrop()
    
    }
    

    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer lâ€™appel
    })
}

window.addEventListener("load", () => {
setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

function dragAndDrop(){
    cartes = document.querySelectorAll(".carte_dispo");
    monBoard = document.querySelector(".mon_terrain")

    cartes.forEach(carte => {
        carte.addEventListener('dragstart', () => {
            // carte.classList.add('dragging')
            drag = carte
        })
        carte.addEventListener('dragend', () => {
            // carte.classList.remove('dragging')
            drag = null
        })
    })

    monBoard.addEventListener("dragover", (e) => {
        e.preventDefault()
    })

    monBoard.addEventListener("drop",() => {
        const draggable = drag

        if (draggable != null) {formData = new FormData();
            formData.append("action",'PLAY')
            formData.append("uid",draggable.id)
            fetch("ajax-action.php", {
                method : "POST",
                body : formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
        }
        
        
    })

}

function montrer_board(data){

    effacer_board()
    afficher(data)
}
function afficher(data) {

    for (let index = 0; index < data.opponent.board.length; index++) {
        let div = document.createElement("div")
        let cadre = document.createElement("img")
        let mana = document.createElement("p")
        let atk = document.createElement("p")
        let hp = document.createElement("p")
        let monstre = document.createElement("img")
        let description = document.createElement("p")

        mana.setAttribute('id',"mana")
        atk.setAttribute('id',"atk")
        hp.setAttribute('id',"hp")
        cadre.setAttribute('id',"cadre-ennemi")
        monstre.setAttribute('id','monstre')
        description.setAttribute('id','description')

        div.setAttribute('id',data.opponent.board[index].uid)
        div.setAttribute('class','ennemi_carte')
        div.setAttribute('draggable','false')
        cadre.setAttribute('draggable','false')
        monstre.setAttribute('draggable','false')

        mana.innerText = data.opponent.board[index].cost
        atk.innerText = data.opponent.board[index].atk
        hp.innerText = data.opponent.board[index].hp
        description.innerText = data.opponent.board[index].mechanics[0]



        monstre.src = "jpg/Hnet.com-image.png"
        cadre.src = "png/carte_visible.png"

        
        
        div.appendChild(monstre)
        div.appendChild(description)
        div.appendChild(cadre)
        div.appendChild(mana)
        div.appendChild(atk)
        div.appendChild(hp)
        

        document.getElementById("terrain_ennemi").appendChild(div)
    }


    for (let index = 0; index < data.board.length; index++) {
        let div = document.createElement("div")
        
        let mana = document.createElement("p")
        let atk = document.createElement("p")
        let hp = document.createElement("p")
        let description = document.createElement("p")

        let monstre = document.createElement("img")
        let cadre = document.createElement("img")

        mana.setAttribute('id',"mana")
        description.setAttribute('id',"description")
        atk.setAttribute('id',"atk")
        hp.setAttribute('id',"hp")
        cadre.setAttribute('id',"cadre")
        cadre.setAttribute('class',"cadre")
        monstre.setAttribute('id','monstre')

        div.setAttribute('id',data.board[index].uid)
        div.setAttribute('class','carte')
        div.setAttribute('draggable','true')
        cadre.setAttribute('draggable','false')
        monstre.setAttribute('draggable','false')

        

        if (data.board[index].uid == id_selection & data.yourTurn == true & data.board[index].state == "IDLE") {
            div.setAttribute('class','selection-atk')
        }

        mana.innerText = data.board[index].cost
        atk.innerText = data.board[index].atk
        hp.innerText = data.board[index].hp
        description.innerText = data.board[index].mechanics[0]


        monstre.src = "jpg/Hnet.com-image.png"
        cadre.src = "png/carte_visible.png"

        
        
        div.appendChild(monstre)
        div.appendChild(description)
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
        let description = document.createElement("p")

        mana.setAttribute('id',"mana")
        atk.setAttribute('id',"atk")
        hp.setAttribute('id',"hp")
        cadre.setAttribute('id',"cadre")
        monstre.setAttribute('id','monstre')
        description.setAttribute('id',"description")

        div.setAttribute('id',data.hand[index].uid)
        if (data.mp >= data.hand[index].cost & data.yourTurn == true) {
            div.setAttribute('class','carte_dispo')
        }
        else {
            div.setAttribute('class','carte')
        }
        
        div.setAttribute('draggable','true')
        cadre.setAttribute('draggable','false')
        monstre.setAttribute('draggable','false')

        mana.innerText = data.hand[index].cost
        atk.innerText = data.hand[index].atk
        hp.innerText = data.hand[index].hp
        description.innerText = data.hand[index].mechanics[0]



        div.style.height = "100%"
        monstre.src = "jpg/Hnet.com-image.png"
        cadre.src = "png/carte_visible.png"

        
        
        div.appendChild(monstre)
        div.appendChild(description)
        div.appendChild(cadre)
        div.appendChild(mana)
        div.appendChild(atk)
        div.appendChild(hp)

        document.getElementById("contenant_main").appendChild(div)
    }
}