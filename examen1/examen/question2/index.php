<?php
	require_once("action/IndexAction.php");

	$action = new IndexAction();
	$data = $action->execute();

	
	$donnees =  json_encode($data["result"]);
	

	$pageTitle = "Accueil";
	require_once("partial/header.php");
?>
	<div class="container">
		<table>
			<tr>
					<th>Date</th>
				<th>Gagnant</th>
				<th>Perdant</th>
					<?php
						for ($i=0; $i < 20; $i++) {
							?>
								<tr>
									<th><?=$data["result"][$i]->date?></th>
									<th><?=$data["result"][$i]->winner?></th>
									<th><?=$data["result"][$i]->looser?></th>
								</tr>
							<?php
							
						}
					?>
							


				
			</tr>
			
		</table>
		<div class="btn-container">
			<button>
				Suivant &gt;&gt;
			</button>
		</div>
	</div>
<?php
	require_once("partial/footer.php");