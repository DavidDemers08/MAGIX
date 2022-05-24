<?php
	require_once("action/IndexAction.php");

	$action = new IndexAction();
	$data = $action->execute();


	$pageTitle = "Accueil";
	require_once("partial/header.php");
?>
	<div class="container">
		<table>
			<tr>
				<th>Date</th>
				<th>Gagnant</th>
				<th>Perdant</th>
			</tr>
			<tr>
				<td>Exemple 1</td>
				<td>Exemple 2</td>
				<td>Exemple 3</td>
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