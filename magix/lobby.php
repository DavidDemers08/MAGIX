<?php
    require_once("action/LobbyAction.php");

	$action = new LobbyAction();
	$data = $action->execute();

    
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/lobby.css">
    <link
        href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.11.0/mdb.min.css"
        rel="stylesheet"
    />
    <title>LobbyMagix</title>
</head>
<body>
<nav>
<ul>
  <li style="float:left"><a class="active">Bienvenue <?= $data["usager"] ?></a></li>
  
  <li><a href="?logout=true">déconnexion</a></li>
  <li><a href="">Changer de deck</a></li>
  <li><a href="">Pratiquer</a></li>
  <li><a href="">Jouer</a></li>
  <li><a href="">Lobby</a></li>
  
</ul>
</nav>
<div class="flex">
    <div class="chat">
        <iframe style="width: 1000px;height:240px;" 
                src="https://magix.apps-de-cours.com/server/#/chat/<?= $data["cle"] ?>">
        </iframe>
    </div>
</div>





    
</body>

</html>