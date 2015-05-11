var markers = [];

// Main function that is called when the "Plot all" button is pressed
function plotAll() {
    // Determine country tab in use
    // var activeTab = document.getElementsByClassName('tab-pane active')[0];
    // if(activeTab.id === "panama") {
    //     table = document.getElementById("listTablePanama");
    // } else if(activeTab.id === "colombia") {
    //     table = document.getElementById("listTableColombia");
    // }

    //*** Above code would be for multiple country extension. default to Panama table for now.
    table = document.getElementById("listTablePanama");

    // add query table entries to bien and stri arrays
    if (table.rows.length > 0) { // if there are entries in the query table
        deleteMarkers();

        var bienSearchKeys = new Array();
        var striSearchKeys = new Array();
        var searchKey;
        for (var i=0; i<table.rows.length;i++) { // loop through entries in the query table
            if (table.rows[i].cells[2].innerHTML.indexOf('bien')!=-1) { // if it is bien (index of returns -1 if string is not found)
                searchKey = table.rows[i].cells[0].innerHTML; // set searchKey to the Genus or Latin name
                bienSearchKeys.push(searchKey.trim()); // add searchKey to the bienSearchKeys array
                //console.log("bien keys: " + bienSearchKeys);  // debugging
            } else if (table.rows[i].cells[2].innerHTML.indexOf('stri')!=-1) { // if it is stri (index of returns -1 if string is not found)
                searchKey = table.rows[i].cells[0].innerHTML; // set searchKey to the Genus or Latin name
                striSearchKeys.push(searchKey.trim()); // add searchKey to the striSearchKeys array
                //console.log("stri keys: " + striSearchKeys); // debugging
            }
        }

        // pass to separate functions for each type
        if (bienSearchKeys.length>0) {
            plotBienData(bienSearchKeys);
        }
        if (striSearchKeys.length>0) {
            plotStriData(striSearchKeys);
        }    
    } else {
        deleteMarkers();
    }
}

// Main function for plotting BIEN data
// searchKeys - array of Genus or Latin names that need to be plotted
function plotBienData(searchKeys) {
    // get all genus in the list
    var whereClause = "";
    for (var i=0;i<searchKeys.length;i++) {
        whereClause += "Latin LIKE '" + searchKeys[i] + "%'";
        if (i<searchKeys.length-1) {
            whereClause += " OR ";
        }   
    }
    console.log("BIEN where clause: \n"+whereClause); // debugging

    // send whereClause and type to query_for_location.php information from the database
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "php/query_for_location.php?where="+whereClause+"&type=bien", false);
    xmlhttp.send(); // send variable to php script to query mysql db
    var responseMessage = eval(xmlhttp.responseText); // get response from the query

    // for each responseMessage, create a marker
    for (var i=0; i<responseMessage.length;i++) {
        var latlng = new google.maps.LatLng(responseMessage[i][0], responseMessage[i][1]); // create a latlng object
        var icon = determineIcon(searchKeys, responseMessage[i], 1); // get the appropriate icon
        addMarker(latlng, responseMessage[i], icon); // actually plot the marker
    }
}

// Main function for plotting STRI BCI plot data. There are extra filters for this type
// searchKeys - array of Genus or Latin names that need to be plotted
function plotStriData(searchKeys) {
    // extra stri filters
    var status = "%";
    var dbhMin = "0";
    var dbhMax = "3500";
    var censusId = "-1";
    //var plot;

    // If dead is checked show trees of all Status
    if (document.getElementById('dead').checked) {
        showDead = "%";
    } else { // If dead is not check only show trees that are alive
        showDead = "alive";
    }

    // set the dbh if there is input in the boxes
    if (document.getElementById('dbhmininput').value !== "") {
        dbhMin = document.getElementById('dbhmininput').value;
    }
    if (document.getElementById('dbhmaxinput').value !== "") {
        dbhMax = document.getElementById('dbhmaxinput').value;
    }

    // set the censusId if there is one in the box
    if (document.getElementById('censusinput').value !== "") {
        censusId = document.getElementById('censusinput').value;        
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
    whereClause += " AND DBH > "+dbhMin.toString()+" AND DBH < "+dbhMax.toString(); // filter based on DBH
    if (censusId != "-1") { // filter by CensusId if there is one in the censusinput
        whereClause += " AND CensusID = "+censusId;
    }
    console.log("STRI where clause: \n"+whereClause); // debugging

    // send whereClause and type to query_for_location.php information from the database
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "php/query_for_location.php?where="+whereClause+"&type=stri", false); // post for security
    xmlhttp.send(); // send variable to php script to query mysql db
    var responseMessage = eval(xmlhttp.responseText); // get response from the query

    // for each responseMessage, create a marker
    for (i=0; i<responseMessage.length-1;i++) {
        var latlng = new google.maps.LatLng(responseMessage[i][1], responseMessage[i][0]); // create a latlng object
        var icon = determineIcon(searchKeys, responseMessage[i], 2); // get the appropriate icon
        addMarker(latlng, responseMessage[i], icon); // actually plot the marker
    }
}

// Add a marker to the map and push to the array.
// location - google.maps.LatLng object
// responseMessageCurrent - responseMessage we are currently using
function addMarker(location, responseMessageCurrent, iconName) {
    // create html content to be shown when a marker is clicked
    var contentString = "<p><b>Latin name:</b> " + responseMessageCurrent[2] +"</p>"
                        + "<p><b>Latitude:</b> " + responseMessageCurrent[0] +"</p>"
                        + "<p><b>Longitude:</b> " + responseMessageCurrent[1] +"</p>"
    var infoWindow = new google.maps.InfoWindow({ // create the infowindow with the generated content
        content: contentString
    });

    // create the marker
    var marker = new google.maps.Marker({
        position: location, // latlng
        map: map,
        title: responseMessageCurrent[2], // Latin name
        icon: iconName // name of icon to get from the images/ directory
    });

    google.maps.event.addListener(marker, 'click', function() { // when marker is clicked, show infoWindow
        infoWindow.open(map,marker);
    });
    google.maps.event.addListener(map, 'click', function() {
        infoWindow.close(map,marker);
    });

    markers.push(marker);
}

// Decides and sets the icon to use for the query table and the map marker
// searchKeys - array of Genus or Latin names
// responseMessageCurrent - responseMessage we are currently setting Icons for
// source - 1 is bien, 2 is stri
function determineIcon(searchKeys, responseMessageCurrent, source) {
    var bienIcons = ["small_yellow","small_green","small_blue","small_purple","measle_turquoise"];
    var striIcons = ["square_yellow","square_green","square_blue","square_purple","square_turquoise"];
    var def = "images/"; // default icon name
    var iconName = "images/";

    if(source == 1) { // bien
        for(var i = 0; i < searchKeys.length; i++) { // for each search key
            if (responseMessageCurrent[2].indexOf(searchKeys[i]) > -1) { // match responseMessage to searchKey
                var iconIndex = getIconIndex(searchKeys[i],"bien"); // generate index
                deleteTableIcon(searchKeys[i]); // remove previous icon
                iconName += bienIcons[iconIndex];
                setTableIcon(searchKeys[i], iconIndex, "bien", bienIcons); // set new icon
                break;
            }
        }
    } else if(source == 2) { // stri
        for(var i = 0; i < searchKeys.length; i++) { // for each search key
            if (responseMessageCurrent[2].indexOf(searchKeys[i]) > -1) { // match responseMessage to searchKey
                var iconIndex = getIconIndex(searchKeys[i],"stri"); // generate index
                deleteTableIcon(searchKeys[i]); // remove previous icon
                iconName += striIcons[iconIndex];
                setTableIcon(searchKeys[i], iconIndex, "stri", striIcons); // set new icon
                break;
            }
        }
    }
    
    // if iconName is still default, set icon to turquoise circle as a default
    if(iconName == def) { 
        iconName = "images/measle_turquoise";
    }
    
    return iconName;
}

// Determines the index to use to get the icon from bienIcons or striIcons array
// It will give the first icon in the icons array to the last item in the query table
// It will give the second icon in the icons array to the second to last item in the query table
// searchKey - Genus or Latin name
// type - bien or stri
function getIconIndex(searchKey,type) {
    var rows = table.rows;
    var totalCount = 0;
    var index = 0;
    for (var i = 0; i<rows.length; i++) { // for each row in the query table
        var row = rows[i];

        if (row.cells[2].innerHTML.indexOf(type) > -1) { // if it is of passed type, add to the count
            totalCount++;
        }
        
        if (row.cells[0].innerHTML == searchKey) { // if it is the same Genus or Latin as searchKey
            index = totalCount; // save current spot
        }
    }
    
    iconIndex = totalCount-index; // return modified index
    var maxIcons = 5;
    if (iconIndex>=maxIcons) { // if it is more than five, repeat icons
        return iconIndex%maxIcons;
    } else {
        return iconIndex;
    }
}

// Remove the query table icon for the specified searchKey
// searchKey - Genus or Latin name
function deleteTableIcon(searchKey) {
    var rows = table.rows;
    for (var i = 0; i<rows.length; i++) {
        var row = rows[i];
        if (row.cells[0].innerHTML.indexOf(searchKey) > -1) {
            row.deleteCell(2); // delete cell that contains the icon
        }
    }
}

// Sets the query table icon for the specified searchKey
// searchKey - Genus or Latin name
// iconIndex - index to use in the icons array
// type - bien or stri
// icons - array of icons to choose from
function setTableIcon(searchKey, iconIndex, type, icons) {
    var rows = table.rows;
    for (var i = 0; i<rows.length; i++) {
        var row = rows[i];
        if (row.cells[0].innerHTML == searchKey) { // create a cell and set the image
            var markerCell = row.insertCell(2);
            markerCell.innerHTML = "<img id='"+type+"' src='images/"+icons[iconIndex]+".png' alt='image not found' >";
        }
    }
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