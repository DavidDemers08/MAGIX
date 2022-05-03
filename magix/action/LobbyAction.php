<?php
	require_once("action/CommonAction.php");

	class LobbyAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

		protected function executeAction() {
			if(isset($_POST["pvp"])){
				$data = [];
				$data["key"] = $_SESSION["key"];
				$data["type"] = "PVP";

				$result = parent::callAPI("games/auto-match", $data);

				if ($result == "CREATED_PVP") {
					header("Location:jeu.php");
					exit;
				}
			}
			else if(isset($_POST["pve"])){
				$data = [];
				$data["key"] = $_SESSION["key"];
				$data["type"] = "TRAINING";

				$result = parent::callAPI("games/auto-match", $data);

				if ($result == "JOINED_TRAINING") {
					header("Location:jeu.php");
					exit;
				}
			}
			

		}
	}