<?php
	require_once("action/CommonAction.php");

	class AjaxAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

		protected function executeAction() {
            $data = [];
			$data["key"] = $_SESSION["key"];
            $data["type"] = $_POST["action"];
			if(isset($_POST["uid"])){
				$data["uid"] = $_POST["uid"];
			}
			if(isset($_POST["targetuid"])){
				$data["targetuid"] = $_POST["targetuid"];
			}
            $result = parent::callAPI("games/action",$data);
			return compact("result");
		}

		
	}