function plotAll() {
	var table = document.getElementById("listTable");

	var search_key = table.rows[0].cells[0].innerHTML; // text in the first cell

	var whereClause = "'Genus' = '" + search_key + "'";

	layer.setOptions({ // set the options of the already created layer (in map_loader)
		query: {
	      select: 'Latitude',
	      from: '1EtC8wMoso-d59wgiTgXaGFTovW2-wcgdb25jNV8p', // new table
	      where: whereClause
	    }
	});
	
    layer.setMap(map);
}



// // FOR MORE THAN ONE GENUS NAME (creating a longer where clause)

// function plotAll() {
// 	var table = document.getElementById("listTable");
// 	var search_keys = new Array();

// 	for (i=0; i<table.rows.length;i++) {
// 		var search_key = table.rows[i].cells[0].innerHTML; // row value in the query table
// 		search_keys.push(search_key);
// 	}

// 	var whereClause = "'Genus' = " + "'" + search_keys[0] + "'"; // add the first genus
// 	if (search_keys.length>1) { // if there are more than one, add them with correct syntax
// 		for (i=1;i<search_keys.length;i++) {
// 			whereClause = whereClause + " OR 'Genus' = '" + search_keys[i] + "'";
// 		}
// 	}

// 	var layer = new google.maps.FusionTablesLayer({
// 	    query: {
// 	      select: 'Latitude',
// 	      from: '1EtC8wMoso-d59wgiTgXaGFTovW2-wcgdb25jNV8p', // new table
// 	      // from: '1BwwBtlnE-JoVHbGXiBe4FJqNn1_or59a7aV4osk', // old table
// 	      where: whereClause
// 	    }
// 	});
// 	layer.setMap(map);
// }