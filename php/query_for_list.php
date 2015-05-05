<?php
	include 'connect.php';

	// List genus from database
	$bienGenusQuery = "SELECT Genus FROM bien_panama GROUP BY Genus";
	$bienLatinQuery = "SELECT Latin FROM bien_panama GROUP BY Latin";
	$striGenusQuery = "SELECT Genus FROM stri_bci GROUP BY Genus";
	$striLatinQuery = "SELECT GenusSpecies FROM stri_bci GROUP BY GenusSpecies";
	$striCensusQuery = "SELECT CensusID FROM stri_bci GROUP BY CensusID";

	$queryResults = array();

	if (isset($_GET['query'])&&isset($_GET['type'])) {

		if ($_GET['type']=='bien') {

			if ($_GET['query']=='genus') {
				if(!$result = $con->query($bienGenusQuery)){
			 		die('There was an error running the query [' . $con->error . ']');
			  	} else {
			    	while ($row = $result->fetch_assoc()) {
			      		array_push($queryResults, array($row['Genus']));
			  		}
				}
			} else if ($_GET['query']=='latin') {
				if(!$result = $con->query($bienLatinQuery)){
			 		die('There was an error running the query [' . $con->error . ']');
			  	} else {
			    	while ($row = $result->fetch_assoc()) {
			      		array_push($queryResults, array($row['Latin']));
			  		}
				}
			}

		} else if ($_GET['type']=='stri') {

			if ($_GET['query']=='genus') {
				if(!$result = $con->query($striGenusQuery)){
			 		die('There was an error running the query [' . $con->error . ']');
			  	} else {
			    	while ($row = $result->fetch_assoc()) {
			      		array_push($queryResults, array($row['Genus']));
			  		}
				}
			} else if ($_GET['query']=='latin') {
				if(!$result = $con->query($striLatinQuery)){
			 		die('There was an error running the query [' . $con->error . ']');
			  	} else {
			    	while ($row = $result->fetch_assoc()) {
			      		array_push($queryResults, array($row['GenusSpecies']));
			  		}
				}
			} else if ($_GET['query']=='census') {
				if(!$result = $con->query($striCensusQuery)){
			 		die('There was an error running the query [' . $con->error . ']');
			  	} else {
			    	while ($row = $result->fetch_assoc()) {
			      		array_push($queryResults, array($row['CensusID']));
			  		}
				}
			}
			
		}
	}

	echo json_encode($queryResults);
	exit;
?>