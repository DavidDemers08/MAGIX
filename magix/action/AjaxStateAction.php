<?php
	require_once("action/CommonAction.php");

	class AjaxStateAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

		protected function executeAction() {
            $data = [];
			$data["key"] = $_SESSION["key"];
			
			
			if (isset($_POST["action"])) {
				$data["type"] = $_POST["action"];
				parent::callAPI("games/action",$data);
				unset($_POST["action"]);
			}

			$result = parent::callAPI("games/state", $data);
			return compact("result");
		}

		
	}