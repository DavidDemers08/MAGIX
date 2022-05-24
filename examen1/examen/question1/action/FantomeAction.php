<?php
	require_once("action/CommonAction.php");

	class FantomeAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			
			$result = parent::callAPI();
			return compact("result");
		}

		
	}