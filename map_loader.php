<?php
  include 'connect.php';
  // $apikey = "AIzaSyCnxStZYPcxJNBjAa7V96g__7lpv80jIMY";
?>

<script type="text/javascript">
  var map;
  var layer = new google.maps.FusionTablesLayer();

  function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(9.149639, -79.848202),
      zoom: 8,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
        style: google.maps.ZoomControlStyle.DEFAULT
      },
      panControl: true,
      panControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      scaleControl: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      },
      suppressInfoWindows:true
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
     
    <?php
       $key = "Aa";
       $getpoints = "SELECT Latitude, Longitude
          FROM bien_panama 
          WHERE Genus = '$key'";
     
      if(!$result = $con->query($getpoints)){
        die('There was an error running the query 
            [' . $con->error . ']');
      } else {
        while ($row = $result->fetch_assoc()) {
          echo 'var myLatlng1 = new google.maps.LatLng('.$row['Latitude'].', '.$row['Longitude'].'); 
            var marker1 = new google.maps.Marker({ 
                position: myLatlng1, 
                map: map
            });'
          ;
        }
      }
    ?>
  }
  google.maps.event.addDomListener(window, 'load', initialize);
</script>