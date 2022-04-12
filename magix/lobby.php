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
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <!-- Container wrapper -->
  <div class="container-fluid">
    <!-- Toggle button -->
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarCenteredExample"
      aria-controls="navbarCenteredExample"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    <!-- Collapsible wrapper -->
    <div
      class="collapse navbar-collapse justify-content-center"
      id="navbarCenteredExample"
    >
      <!-- Left links -->
      <div class=""></div>
      <span class="navbar-brand fixed-left mb-0 h1">Navbar</span>
      <ul class="navbar-nav mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="lobby.php">Lobby</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pratique</a>
        </li>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Jouer</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="?logout=true">Quitter</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div class="flex">
    <div class="chat">
        <iframe style="width: 1000px;height:240px;" 
                src="https://magix.apps-de-cours.com/server/#/chat/<?= $data["key"] ?>">
        </iframe>
    </div>
</div>





    
</body>

</html>