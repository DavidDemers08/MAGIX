const state = () => {
    fetch("fantome-state.php", {   // Il faut crÃ©er cette page et son contrÃ´leur appelle 
        method : "POST"       // lâ€™API (games/state)
    })
.then(response => response.json())
.then(data => {
    console.log(data.evt);

    if (data.evt < 7 && data.evt > 0){
        document.querySelector("#frame-"+ data.evt).style.display = "none";
    }

    for (let index = 1; index < 7; index++) {
        
        document.querySelector("#frame-"+ index + "-evil").onclick = () =>{
            document.querySelector("#frame-"+ index).style.display = "block"
            document.querySelector("#frame-"+ index + "-evil").style.display = "none";
        }
    }



    setTimeout(state, 5000); // Attendre 1 seconde avant de relancer lâ€™appel
    })
}

window.addEventListener("load", () => {
setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});
