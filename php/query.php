<?php
	include 'connect.php';

	// List points from database
	if (isset($_GET['genus'])) {
		$query = "SELECT Latitude, Longitude, Latin FROM bien_panama WHERE Genus IN (" . $_GET['genus'] . ")";

		$points = array();
        if(!$result = $con->query($query)){
  		 	die('There was an error running the query [' . $con->error . ']');
      	} else {
        	while ($row = $result->fetch_assoc()) {
          		array_push($points, array($row['Latitude'], $row['Longitude'], $row['Latin']));
      		}
    	}

		echo json_encode($points);
		exit;
	}
?>
