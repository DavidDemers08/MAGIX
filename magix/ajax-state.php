<?php
    require_once("action/AjaxStateAction.php");

    $action = new AjaxStateAction();
    $data = $action->execute();

    echo $data["result"];
