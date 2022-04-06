<?php
	require_once("action/CommonAction.php");

	class LoginAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$hasConnectionError = false;

			if (isset($_POST["username"])) {

                $data = [];
                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["pwd"];

                $result = parent::callAPI("signin", $data);

                if ($result == "INVALID_USERNAME_PASSWORD") {
                    $hasConnectionError = true;
                }
                else {
                    // Pour voir les informations retournées : var_dump($result);exit;
                    $key = $result->key;
                    var_dump($result);
                    header("location: lobby.php");
                    exit;
                }

			}

			return compact("hasConnectionError");
		}
	}