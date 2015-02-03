function plotAll() {
	var table;

	var activeTab = document.getElementsByClassName('tab-pane active')[0];
	if(activeTab.id == "panama") {
		table = document.getElementById("listTablePanama");
	} else if(activeTab.id == "colombia") {
		table = document.getElementById("listTableColombia");
	}

	if (table.rows.length>0) {
		var search_keys = new Array();
		for (i=0; i<table.rows.length;i++) {
			var search_key = table.rows[i].cells[0].innerHTML; // row value in the query table
			search_keys.push(search_key.trim());
		}

		// get all genus in the list
		// var whereClause = "Genus IN ('Aa','Merremia')";
		var whereClause = "Genus IN (";
		for (i=0;i<search_keys.length;i++) {
			whereClause += "'" + search_keys[i] + "'"; 
			if (i<search_keys.length-1) {
				whereClause += ",";
			}
		}
		whereClause += ")";
		console.log(whereClause); // print to chrome console

		layer.setOptions({ // set the options of the already created layer (in map_loader)
			map: map,
			query: {
		      select: 'Latitude',
		      from: '1EtC8wMoso-d59wgiTgXaGFTovW2-wcgdb25jNV8p', // new table
		      where: whereClause
		    }
		});

		layer.disableMapTips(); // wipe previous map tips
		layer.enableMapTips({
		    select: "'Latin','CountryStd'", // list of columns for the map tip
		    from: '1EtC8wMoso-d59wgiTgXaGFTovW2-wcgdb25jNV8p', // fusion table name
		    where: whereClause, // filter on more than just geometryColumn
		    geometryColumn: 'Latitude', // geometry column names
		    suppressMapTips: false, // optional, whether to show map tips. default false
		    delay: 200, // milliseconds mouse pause before send a server query. default 300.
		    tolerance: 8, // tolerance in pixel around mouse. default is 6.
		    googleApiKey: "AIzaSyCnxStZYPcxJNBjAa7V96g__7lpv80jIMY" // generated with google developer console
	   	});

		layer.setMap(map);
	} else {
		layer.setMap(null);
	}
}