var map;
var layer = new google.maps.FusionTablesLayer();

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

	// rlayer = new google.maps.FusionTablesLayer({
 //      map: map,
 //      heatmap: { enabled: false },
 //      query: {
 //        select: "col2",
 //        from: "1vCvnicNK4hdsgq5mP4CKuoeYQOouCOd0_VwH93Mx",
 //        where: ""
 //      },
 //      options: {
 //        styleId: 2,
 //        templateId: 2
 //      }
 //    });
}

google.maps.event.addDomListener(window, 'load', initialize);