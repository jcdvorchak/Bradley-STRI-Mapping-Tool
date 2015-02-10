function plotAll() {
	var table;

	var activeTab = document.getElementsByClassName('tab-pane active')[0];
	if(activeTab.id == "panama") {
		table = document.getElementById("listTablePanama");
	} else if(activeTab.id == "colombia") {
		table = document.getElementById("listTableColombia");
	}

	if (table.rows.length>0) {
		var searchKeys = new Array();
		for (i=0; i<table.rows.length;i++) {
			var searchKey = table.rows[i].cells[0].innerHTML; // row value in the query table
			searchKeys.push(searchKey.trim());
		}

		// get all genus in the list
		var whereClause = "Genus IN ("; 		// var whereClause = "Genus IN ('Aa','Merremia')";
		for (i=0;i<searchKeys.length;i++) {
			whereClause += "'" + searchKeys[i] + "'";
			if (i<searchKeys.length-1) {
				whereClause += ",";
			}
		}
		whereClause += ")";
		console.log(whereClause); // print to google chrome console for testing

		layer.setOptions({ // set the options of the already created layer (in map_loader)
			map: map,
			query: {
		      select: 'Latitude',
		      from: '1EtC8wMoso-d59wgiTgXaGFTovW2-wcgdb25jNV8p', // new table
		      where: whereClause
		  }
		});

		setMarkers(searchKeys);
		setMapTips(whereClause);

		layer.setMap(map);
	} else {
		layer.setMap(null);
	}
}

function setMarkers(searchKeys) {
	// TODO: add our own images as icons
	var markerIcons = ["small_red","small_yellow","small_green","small_blue","small_purple","measle_brown","measle_grey","measle_white","measle_turquoise"];
	var styles = new Array();
	var rows = table.rows;

	for (i = 0; i<searchKeys.length; i++) {
		// set an icon for each query in the query table
		styles.push({
				where: "Genus = "+"'"+searchKeys[searchKeys.length-(i+1)]+"'", // color stays with query while adding more queries
				markerOptions: {
					iconName: markerIcons[i%9] // repeat colors if there are more than 9 searchKeys
					// icon: "images/" + markerIcons[i%9] + ".png"
				}
		});

		// add image of icon to query table
		var row = rows[rows.length-(i+1)];
		if (row.cells.length>=3) {
			row.deleteCell(2);
		}
		var markerCell = row.insertCell(2);
		console.log(markerCell.innerHTML);
		markerCell.innerHTML = "<img src='images/"+markerIcons[i%9]+".png' alt='image not found'>";
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
