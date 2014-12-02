function initialize() 
{
	var mapOptions = { 
		center: new google.maps.LatLng(9.149639, -79.848202),
		zoom: 8,
		disableDefaultUI: true
	};

	var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);