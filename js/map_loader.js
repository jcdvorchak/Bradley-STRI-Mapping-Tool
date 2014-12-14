var map;

function initialize() 
{
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
		}
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

	// to test using variables
	var whereClause;
	var searchString = 'Aa'; // this will need to be what they enter
	whereClause = "'Genus' = '" + searchString + "'";

	var layer = new google.maps.FusionTablesLayer({
	    query: {
	      select: 'Latitude',
	      from: '1EtC8wMoso-d59wgiTgXaGFTovW2-wcgdb25jNV8p', // new table
	      // from: '1BwwBtlnE-JoVHbGXiBe4FJqNn1_or59a7aV4osk', // old table
	      where: whereClause
	    }
	});
	layer.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);