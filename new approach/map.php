<?php
 
  include 'connect.php';
 
  $apikey = "AIzaSyCnxStZYPcxJNBjAa7V96g__7lpv80jIMY";
 
?>

<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport"
        content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map-canvas { height: 100% }
    </style>
    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=
          <?php echo $apikey; ?>">
    </script>
    <script type="text/javascript">
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(9.149639, -79.848202),
          zoom: 8
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
         
        <?php
           $key = "Aa";
           $getpoints = "SELECT Latitude, Longitude 
              FROM panama_bien 
              WHERE Genus = 'Aa'";
         
          if(!$result = $con->query($getpoints)){
            die('There was an error running the query 
                [' . $con->error . ']');
          } else {
            while ($row = $result->fetch_assoc()) {
              echo 'var myLatlng1 = new google.maps.LatLng('.$row[Latitude].', '.$row[Longitude].'); 
                var marker1 = new google.maps.Marker({ 
                    position: myLatlng1, 
                    map: map,
                    title:"'.$row['Aa'].'"
                });'
              ;
            }
          }
        ?>
      }
      google.maps.event.addDomListener(window, 'load', initialize);
    </script>
  </head>
  <body>
    <div id="map-canvas"/>
  </body>
</html>