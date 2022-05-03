<?php
    require_once("action/JeuAction.php");

	$action = new JeuAction();
	$data = $action->execute();

    

    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="js/javascript.js"></script>
    <link rel="stylesheet" href="css/jeu.css">
    <title>Jeu</title>
</head>
<body>
    <div class="ring">Loading
        <span></span>
    </div>
    <div class="contenant">
        <div id="contenant_adversaire"></div>
        <div class="adversaire">
            <img class="vie" src="png/—Pngtree—futuristic circle glitch frame_5978309.png" alt="">
            <p id="autre_vie">35</p>
        </div> 
        <div class="terrain">
            <div id="terrain_ennemi"></div>
            <div id="mon_terrain"></div>
        </div>
        <div class="main">
            <img class="vie" src="png/—Pngtree—futuristic circle glitch frame_5978309.png" alt="">
            <p id="moi_vie"></p>
        </div>
        <div id="contenant_main">

        </div>
        <button id="bouton_fin_tour" onclick="click">fin de tour</button>
    </div>
    
</body>
</html>