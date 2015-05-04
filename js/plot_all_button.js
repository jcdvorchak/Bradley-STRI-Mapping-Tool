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

		var bienSearchKeys = new Array();
		var striSearchKeys = new Array();
		var searchKey;
		for (i=0; i<table.rows.length;i++) {
			if (table.rows[i].cells[2].innerHTML.indexOf('bien')!=-1) { // if it is bien (index of returns -1 if string is not found)
				searchKey = table.rows[i].cells[0].innerHTML;
				bienSearchKeys.push(searchKey.trim());
				console.log("bien keys: " + bienSearchKeys);
			} else if (table.rows[i].cells[2].innerHTML.indexOf('stri')!=-1) { // if it is stri (index of returns -1 if string is not found)
				searchKey = table.rows[i].cells[0].innerHTML;
				striSearchKeys.push(searchKey.trim());
				console.log("stri keys: " + striSearchKeys);
			}
		}

		if (bienSearchKeys.length>0) {
			plotBienData(bienSearchKeys);
			//setMarkers(bienSearchKeys, 1);
		}
		if (striSearchKeys.length>0) {
			plotStriData(striSearchKeys);
			//setMarkers(striSearchKeys, 2);
		}

		//setMarkers(searchKeys);
		// setMapTips(whereClause);
	} else {
		deleteMarkers();
	}
}

function plotBienData(searchKeys) {
	console.log("plotting bien data...");
	// get all genus in the list
	var whereClause = "";
	for (i=0;i<searchKeys.length;i++) {
		whereClause += "Latin LIKE '" + searchKeys[i] + "%'";
		if (i<searchKeys.length-1) {
			whereClause += " OR ";
		}	
	}
	console.log(whereClause); // comma separated genus list

	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.open("GET", "php/query_for_location.php?where="+whereClause+"&type=bien", false); // post for security
	xmlhttp.send(); // send variable to php script to query mysql db
	var responseMessage = eval(xmlhttp.responseText); // get response from the query

	for (i=0; i<responseMessage.length-1;i++) {
		var latlng = new google.maps.LatLng(responseMessage[i][0], responseMessage[i][1]); 
		var icon = determineIcon(searchKeys, responseMessage[i], 1);
		addMarker(latlng, responseMessage[i], icon);
	}
}

function plotStriData(searchKeys) {
	console.log("plotting stri data...");

	var status = "%";
	var dbhMin = 0;
	var dbhMax = 3500;
	var censusId = -1;
	//var plot; //IMPLEMENT

	// If dead is checked show trees of all Status
	if (document.getElementById('dead').checked) {
		console.log("dead checked");
		showDead = "%";
	} else { // If dead is not check only show trees that are alive
		console.log("dead not checked");
		showDead = "alive";
	}


	// get all genus in the list
	var whereClause = "(";
	for (i=0;i<searchKeys.length;i++) {
		whereClause += "GenusSpecies LIKE '" + searchKeys[i] + "%'";
		if (i<searchKeys.length-1) {
			whereClause += " OR ";
		}
	}
	whereClause += ") AND Status LIKE '"+showDead+"'"; // filter based on Dead button
	console.log(whereClause); // comma separated genus list

	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.open("GET", "php/query_for_location.php?where="+whereClause+"&type=stri", false); // post for security
	xmlhttp.send(); // send variable to php script to query mysql db
	var responseMessage = eval(xmlhttp.responseText); // get response from the query

	for (i=0; i<responseMessage.length-1;i++) {
		var latlng = new google.maps.LatLng(responseMessage[i][1], responseMessage[i][0]); 
		var icon = determineIcon(searchKeys, responseMessage[i], 2);
		addMarker(latlng, responseMessage[i], icon);
	}
}

// Add a marker to the map and push to the array.
function addMarker(location, responseMessageCurrent, iconName) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: responseMessageCurrent[2],
    icon: iconName
  });
  markers.push(marker);
}

function determineIcon(searchKeys, responseMessageCurrent, source) {
	var bienIcons = ["small_yellow","small_green","small_blue","small_purple","measle_turquoise"];
	var striIcons = ["square_yellow","square_green","square_blue","square_purple","square_turquoise"];
	var res = responseMessageCurrent[2].split(" ");
	var genusName = res[0];
	var def = "images/";
	var iconName = "images/";

	if(source == 1) {
		for(j = 0; j < searchKeys.length; j++) {
			if(searchKeys[j] == genusName) 
				iconName += bienIcons[j];
		}
	}
	else if(source == 2) {
		for(m = 0; m < searchKeys.length; m++) {
			if(searchKeys[m] == genusName) 
				iconName += striIcons[m];
		}
	}
	
	if(iconName == def)
		iconName = "images/measle_turquoise";
	
	return iconName;
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

function setMarkers(searchKeys, option) {
	var bienIcons = ["small_yellow","small_green","small_blue","small_purple","measle_turquoise"/*,"measle_brown","measle_grey","measle_white"*/];
	var striIcons = ["square_yellow","square_green","square_blue","square_purple","square_turquoise"];
	var styles = new Array();
	var rows = table.rows;

	if(option == 1) {
		for (i = 0; i<searchKeys.length; i++) {
			// set an icon for each query in the query table
			styles.push({
					where: "Genus = "+"'"+searchKeys[searchKeys.length-(i+1)]+"'", // color stays with query while adding more queries
					markerOptions: {
						iconName: bienIcons[i] // if greater than 5 it will default to red
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
				markerCell.innerHTML = "<img id='bien' src='images/"+bienIcons[i]+".png' alt='image not found'>";
			} else { // default to small_red
				markerCell.innerHTML = "<img id='bien' src='images/small_red.png' alt='image not found'>";
			}
		}
	}
	else if(option == 2) {
		for (i = 0; i<searchKeys.length; i++) {
			// set an icon for each query in the query table
			styles.push({
					where: "Genus = "+"'"+searchKeys[searchKeys.length-(i+1)]+"'", // color stays with query while adding more queries
					markerOptions: {
						iconName: striIcons[i] // if greater than 5 it will default to red
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
				markerCell.innerHTML = "<img id='stri' src='images/"+striIcons[i]+".jpg' alt='image not found'>";
			} else { // default to small_red
				markerCell.innerHTML = "<img id='stri' src='images/small_red.png' alt='image not found'>";
			}
		}
	}

	layer.set('styles',styles);
}

/*-------------------------------------------unused currently-------------------------------------*/
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
