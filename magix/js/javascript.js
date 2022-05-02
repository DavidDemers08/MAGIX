let chargement = document.getElementsByClassName("ring")
let board = document.getElementsByClassName("contenant")
let vie_adverse = document.getElementsByClassName("vie_adverse")
let contenant_main_adverse = document.getElementById("contenant_adversaire")
let contenant_main = document.getElementById("contenant_main")
let nbcartes = 0
let mes_cartes = 0

const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
 method : "POST"        // l’API (games/state)
    })
.then(response => response.json())
.then(data => {
    console.log(data);
    // contient les cartes/état du jeu.
    if (data == "LAST_GAME_WON" || data == "LAST_GAME_LOST") {
        location.href = "lobby.php"
    }
    if (data != "WAITING"){
        document.body.style.backgroundImage = "url(jpg/waiting.jpg)"
        chargement[0].style.display = 'none'
        board[0].style.display = "flex"
        document.getElementById("moi_vie").innerText = data.hp
        document.getElementsByClassName("autre_vie").innerText = data.opponent.hp

        if (nbcartes == 0 ){
            for (let index = 0; index < data.opponent.handSize; index++) {
                let img = document.createElement("img")
                img.src = "png/back_card.png"
                img.style.maxHeight = "100%"
                document.getElementById("contenant_adversaire").appendChild(img)
                nbcartes++
            }
            
        }

        if (mes_cartes == 0){
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
                div.setAttribute('class','carte')

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
                mes_cartes++
            }
        }

        let ajout = data.opponent.handSize - nbcartes
        let ajout_moi = data.opponent.handSize - mes_cartes

        if (ajout > 0){
            for (let index = 0; index < ajout; index++) {
                let img = document.createElement("img")
                img.src = "png/back_card.png"
                img.style.maxHeight = "100%"
                document.getElementById("contenant_adversaire").appendChild(img)
                nbcartes++
            } 
        }

        if (ajout_moi > 0){
            for (let index = 0; index < ajout_moi; index++) {
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
                div.setAttribute('class','carte')

                mana.innerText = data.hand[index].cost
                atk.innerText = data.hand[index].atk
                hp.innerText = data.hand[index].hp



                div.style.height = "100%"
                div.style.position = "absolute"
                monstre.src = "jpg/Hnet.com-image.png"
                cadre.src = "png/carte_visible.png"

                div.appendChild(mana)
                div.appendChild(atk)
                div.appendChild(hp)
                
                div.appendChild(monstre)
                div.appendChild(cadre)


            } 
        }



        
    }
    

    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

window.addEventListener("load", () => {
setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});
