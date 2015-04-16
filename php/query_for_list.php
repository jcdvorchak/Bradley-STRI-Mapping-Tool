<?php
	include 'connect.php';

	// List genus from database
	$genusQuery = "SELECT Genus FROM bien_panama GROUP BY Genus";
	$latinQuery = "SELECT Latin FROM bien_panama GROUP BY Latin";

	$queryResults = array();

	if (isset($_GET['query'])) {
		if ($_GET['query']=='genus') {
			if(!$result = $con->query($genusQuery)){
		 		die('There was an error running the query [' . $con->error . ']');
		  	} else {
		    	while ($row = $result->fetch_assoc()) {
		      		array_push($queryResults, array($row['Genus']));
		  		}
			}
		} else if ($_GET['query']=='species') {
			if(!$result = $con->query($latinQuery)){
		 		die('There was an error running the query [' . $con->error . ']');
		  	} else {
		    	while ($row = $result->fetch_assoc()) {
		      		array_push($queryResults, array($row['Latin']));
		  		}
			}
		}
	}

 //    if(!$result = $con->query($query)){
	// 	 	die('There was an error running the query [' . $con->error . ']');
 //  	} else {
 //    	while ($row = $result->fetch_assoc()) {
 //      		array_push($queryResults, array($row['Genus']));
 //  		}
	// }

	echo json_encode($queryResults);
	exit;
?>