var markers = [];

function plotAll() {
	var table;

	var activeTab = document.getElementsByClassName('tab-pane active')[0];
	if(activeTab.id == "panama") {
		table = document.getElementById("listTablePanama");
	} else if(activeTab.id == "colombia") {
		table = document.getElementById("listTableColombia");
	}

	if (table.rows.length>0) {
		deleteMarkers();

		var searchKeys = new Array();
		for (i=0; i<table.rows.length;i++) {
			var searchKey = table.rows[i].cells[0].innerHTML; // row value in the query table
			searchKeys.push(searchKey.trim());
		}

		// get all genus in the list
		var genus = "";
		for (i=0;i<searchKeys.length;i++) {
			genus += "'" + searchKeys[i] + "'";
			if (i<searchKeys.length-1) {
				genus += ",";
			}	
		}
		console.log(genus);

		var xmlhttp;
		if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xmlhttp.open("GET", "php/query.php?genus="+genus, false); // post for security
		xmlhttp.send(); // send variable to php script to query mysql db
		var responseMessage = eval(xmlhttp.responseText); // get response from the query
		console.log("response0: " + responseMessage[0]); // lat,long, latin
		console.log("response1: " + responseMessage[1]);
		console.log("response2: " + responseMessage[2]);

		for (i=0; i<responseMessage.length-1;i++) {
			var latlng = new google.maps.LatLng(responseMessage[i][0], responseMessage[i][1]); 
			addMarker(latlng);
		}

		// setMarkers(searchKeys);
		// setMapTips(whereClause);
	} else {
		deleteMarkers();
	}
}

// Add a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  setAllMap(null);
  markers = [];
}

function setMarkers(searchKeys) {
	var markerIcons = ["small_yellow","small_green","small_blue","small_purple","measle_turquoise"/*,"measle_brown","measle_grey","measle_white"*/];
	var styles = new Array();
	var rows = table.rows;

	for (i = 0; i<searchKeys.length; i++) {
		// set an icon for each query in the query table
		styles.push({
				where: "Genus = "+"'"+searchKeys[searchKeys.length-(i+1)]+"'", // color stays with query while adding more queries
				markerOptions: {
					iconName: markerIcons[i] // if greater than 5 it will default to red
				}
		});

		// add image of icon to query table
		var row = rows[rows.length-(i+1)];
		if (row.cells.length>=3) {
			row.deleteCell(2);
		}
		var markerCell = row.insertCell(2);
		console.log(markerCell.innerHTML);
		if (i<5) { // only 5 options
			markerCell.innerHTML = "<img src='images/"+markerIcons[i]+".png' alt='image not found'>";
		} else { // default to small_red
			markerCell.innerHTML = "<img src='images/small_red.png' alt='image not found'>";
		}
	}

	layer.set('styles',styles);
}

function setMapTips(whereClause) {
	layer.disableMapTips(); // wipe previous map tips
	layer.enableMapTips({
		select: "'Latin','Family','Country','Province','Latitude','Longitude'", // list of columns for the map tip
		from: '1EtC8wMoso-d59wgiTgXaGFTovW2-wcgdb25jNV8p', // fusion table name
		where: whereClause, // filter on more than just geometryColumn
		geometryColumn: 'Latitude', // geometry column names
		suppressMapTips: false, // optional, whether to show map tips. default false
		delay: 200, // milliseconds mouse pause before send a server query. default 300.
		tolerance: 8, // tolerance in pixel around mouse. default is 6.
		googleApiKey: "AIzaSyCnxStZYPcxJNBjAa7V96g__7lpv80jIMY" // generated with google developer console
	});
}
