<?php
    require_once("action/FantomeAction.php");

    $action = new FantomeAction();
    $data = $action->execute();

    echo json_encode($data["result"]);