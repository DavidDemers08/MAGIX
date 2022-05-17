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
    <title>LobbyMagix</title>
</head>
<body>
<nav>
<ul>
  <li style="float:left"><a class="active">Bienvenue <?= $data["username"] ?> !</a></li>
  
  <li><a href="?logout=true">déconnexion</a></li>
  <li id="deckchange"><a href="">Changer de deck</a></li>
  <form action="" method="post">
      <li>
        <input type="submit" value="Jouer" name="pvp">
      </li>
      <li>
        <input type="submit" value="Pratiquer" name="pve">
      </li>
      
      
  </form>
  
  <li><a href="">Lobby</a></li>
  
</ul>
</nav>
<div class="flex">
    <div class="chat">
        <iframe style="width: 1000px;height:240px;" 
                src="https://magix.apps-de-cours.com/server/#/chat/<?=$data["key"]?>">
        </iframe>
    </div>
</div>





    
</body>

</html>