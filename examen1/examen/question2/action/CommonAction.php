<?php
	session_start();

	abstract class CommonAction {
		protected static $VISIBILITY_PUBLIC = 0;
		protected static $VISIBILITY_MEMBER = 1;
		protected static $VISIBILITY_MODERATOR = 2;
		protected static $VISIBILITY_ADMINISTRATOR = 3;
		
		private $pageVisibility = null;
	
		public function __construct($pageVisibility) {
			$this->pageVisibility = $pageVisibility;
		}
		
		public function execute() {
			if (!empty($_GET["logout"])) {
				session_unset();
				session_destroy();
				session_start();
			}

			if (empty($_SESSION["visibility"])) {
				$_SESSION["visibility"] = CommonAction::$VISIBILITY_PUBLIC;
			}
		
			if ($this->pageVisibility > $_SESSION["visibility"]) {
				header("location:login.php");
				exit;
			}

			$data =  $this->executeAction();

			$data["isConnected"] = $_SESSION["visibility"] > CommonAction::$VISIBILITY_PUBLIC;

			return $data;
		}
		
		abstract protected function executeAction();

		public function callAPI() {
            $apiURL = "http:/magix.apps-de-cours.com/api/games/log/1";

            $options = array(
                'http' => array(
                    'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                    'method'  => 'POST',

                )
            );
            $context  = stream_context_create($options);
            $result = file_get_contents($apiURL, false, $context);

        if (strpos($result, "<br") !== false) {
                var_dump($result);
                exit;
            }
            
        return json_decode($result);
        }
		
	}

	
	
	
	
	
	
	
	