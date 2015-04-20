<?php
	include 'connect.php';

	// List points from database
	if (isset($_GET['where'])&&isset($_GET['type'])) {
		$points = array();
		if ($_GET['type']=='bien') { // query bien
			$query = "SELECT Latitude, Longitude, Latin FROM bien_panama WHERE " . $_GET['where'] . "";

	        if(!$result = $con->query($query)){
	  		 	die('There was an error running the query [' . $con->error . ']');
	      	} else {
	        	while ($row = $result->fetch_assoc()) {
	          		array_push($points, array($row['Latitude'], $row['Longitude'], $row['Latin']));
	      		}
	    	}
    	} else if ($_GET['type']=='stri') { // query stri
			$query = "SELECT QX, QY, GenusSpecies FROM stri_bci WHERE " . $_GET['where'] . "";

	        if(!$result = $con->query($query)){
	  		 	die('There was an error running the query [' . $con->error . ']');
	      	} else {
	        	while ($row = $result->fetch_assoc()) {
	          		array_push($points, array($row['QX'], $row['QY'], $row['GenusSpecies']));
	      		}
	    	}
    	}

		echo json_encode($points);
		exit;
	}
?>
