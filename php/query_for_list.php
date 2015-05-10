<?php
	include 'connect.php';

	// set all queries that may be used
	$bienGenusQuery = "SELECT Genus FROM bien_panama GROUP BY Genus";
	$bienLatinQuery = "SELECT Latin FROM bien_panama GROUP BY Latin";
	$striGenusQuery = "SELECT Genus FROM stri_bci GROUP BY Genus";
	$striLatinQuery = "SELECT GenusSpecies FROM stri_bci GROUP BY GenusSpecies";
	$striCensusQuery = "SELECT CensusID FROM stri_bci GROUP BY CensusID";

	$queryResults = array();

	if (isset($_GET['query'])&&isset($_GET['type'])) { // if query and type are set

		if ($_GET['type']=='bien') { // if type is bien

			if ($_GET['query']=='genus') { // if query is bien
				// run query and add results to queryResults
				if(!$result = $con->query($bienGenusQuery)){
			 		die('There was an error running the query [' . $con->error . ']');
			  	} else {
			    	while ($row = $result->fetch_assoc()) {
			      		array_push($queryResults, array($row['Genus']));
			  		}
				}
			} else if ($_GET['query']=='latin') { // if query is latin
				// run query and add results to queryResults
				if(!$result = $con->query($bienLatinQuery)){
			 		die('There was an error running the query [' . $con->error . ']');
			  	} else {
			    	while ($row = $result->fetch_assoc()) {
			      		array_push($queryResults, array($row['Latin']));
			  		}
				}
			}

		} else if ($_GET['type']=='stri') { // if type is stri

			if ($_GET['query']=='genus') { // if query is genus
				// run query and add results to queryResults
				if(!$result = $con->query($striGenusQuery)){
			 		die('There was an error running the query [' . $con->error . ']');
			  	} else {
			    	while ($row = $result->fetch_assoc()) {
			      		array_push($queryResults, array($row['Genus']));
			  		}
				}
			} else if ($_GET['query']=='latin') { // if query is latin
				// run query and add results to queryResults
				if(!$result = $con->query($striLatinQuery)){
			 		die('There was an error running the query [' . $con->error . ']');
			  	} else {
			    	while ($row = $result->fetch_assoc()) {
			      		array_push($queryResults, array($row['GenusSpecies']));
			  		}
				}
			} else if ($_GET['query']=='census') { // if query is census
				// run query and add results to queryResults
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

	echo json_encode($queryResults); // return the results as json
	exit;
?>