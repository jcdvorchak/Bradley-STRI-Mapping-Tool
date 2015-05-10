<?php
	include 'connect.php';

	if (isset($_GET['where'])&&isset($_GET['type'])) { // if where and type are set
		$points = array();
		if ($_GET['type']=='bien') { // query bien
			// create query with where clause
			$query = "SELECT Latitude, Longitude, Latin FROM bien_panama WHERE " . $_GET['where'] . "";

			// run query and add results to queryResults
	        if(!$result = $con->query($query)){
	  		 	die('There was an error running the query [' . $con->error . ']');
	      	} else {
	        	while ($row = $result->fetch_assoc()) {
	          		array_push($points, array($row['Latitude'], $row['Longitude'], $row['Latin']));
	      		}
	    	}
    	} else if ($_GET['type']=='stri') { // query stri
    		// create query with where clause
			$query = "SELECT GX, GY, GenusSpecies FROM stri_bci WHERE " . $_GET['where'] . "";

			// run query and add results to queryResults
	        if(!$result = $con->query($query)){
	  		 	die('There was an error running the query [' . $con->error . ']');
	      	} else {
	        	while ($row = $result->fetch_assoc()) {
	          		array_push($points, array($row['GX'], $row['GY'], $row['GenusSpecies']));
	      		}
	    	}
    	}

		echo json_encode($points); // return results as json
		exit;
	}
?>
