<?php
	require_once("action/LoginAction.php");

	$action = new LoginAction();
	$data = $action->execute();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link
        href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.11.0/mdb.min.css"
        rel="stylesheet"
    />
    <link rel="stylesheet" href="css/login.css">  
    <title>Magix</title>
</head>
<body>
<section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">
              <h2 class="fw-bold mb-2 text-uppercase">Magix</h2>
              <p class="text-white-50 mb-5">Veuillez entrer vos informations de connexion!</p>
              <?php
                if ($data["hasConnectionError"]) {
                  ?>
                  <p class="text-white-50 mb-5"><strong>Erreur : </strong>Connexion erronée</p>
                  <?php
                }
              ?>
            <form action="" method="post">
              <div class="form-outline form-white mb-4">
                  <input type="username" id="username" class="form-control form-control-lg" name="username" />
                  <label class="form-label" for="username">nom d'usager</label>
                </div>

                  <div class="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" class="form-control form-control-lg" name="pwd" />
                    <label class="form-label" for="typePasswordX">mot de passe</label>
                  </div>

                  <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Mot de passe oublié?</a></p>

                  <button class="btn btn-outline-light btn-lg px-5" type="submit">Connexion</button>

              </div>
            </form>  
            <div>
              <p class="mb-0">Pas de compte ? <a href="https://magix.apps-de-cours.com/server/#/signup" class="text-white-50 fw-bold">Identification</a>
              </p>
            </div>
          </div>    
</body>
</html>