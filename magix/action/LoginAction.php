
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
                    $_SESSION["key"] = $result->key;
                    $_SESSION["username"] = $data["username"];
                    $_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
                    header("Location:lobby.php");
                    exit;
                }

			}

			return compact("hasConnectionError");
		}
	}