<?php
	require_once("action/CommonAction.php");

	class JeuAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_SESSION["key"];
			$data["type"] = "PVP";

			$result = parent::callAPI("games/auto-match", $data);

			if ($result == "CREATED_PVP") {
				
			}
			
			


		}
	}