var markers = [];

function plotAll() {
    var table;

    var activeTab = document.getElementsByClassName('tab-pane active')[0];
    if(activeTab.id === "panama") {
        table = document.getElementById("listTablePanama");
    } else if(activeTab.id === "colombia") {
        table = document.getElementById("listTableColombia");
    }

    if (table.rows.length > 0) {
        deleteMarkers();

        var bienSearchKeys = new Array();
        var striSearchKeys = new Array();
        var searchKey;
        for (var i=0; i<table.rows.length;i++) {
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
        }
        if (striSearchKeys.length>0) {
            plotStriData(striSearchKeys);
        }    
    }
}

function plotBienData(searchKeys) {
    // get all genus in the list
    var whereClause = "";
    for (var i=0;i<searchKeys.length;i++) {
        whereClause += "Latin LIKE '" + searchKeys[i] + "%'";
        if (i<searchKeys.length-1) {
            whereClause += " OR ";
        }   
    }
    console.log("BIEN where clause: \n"+whereClause); // comma separated genus list

    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET", "php/query_for_location.php?where="+whereClause+"&type=bien", false); // post for security
    xmlhttp.send(); // send variable to php script to query mysql db
    var responseMessage = eval(xmlhttp.responseText); // get response from the query

    for (var i=0; i<responseMessage.length;i++) {
        var latlng = new google.maps.LatLng(responseMessage[i][0], responseMessage[i][1]); 
        var icon = determineIcon(searchKeys, responseMessage[i], 1);
        addMarker(latlng, responseMessage[i], icon);
    }
}

function plotStriData(searchKeys) {
    var status = "%";
    var dbhMin = "0";
    var dbhMax = "3500";
    var censusId = "-1";
    //var plot; //IMPLEMENT

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
    console.log("STRI where clause: \n"+whereClause); // comma separated genus list

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

/*
 * source == 1 is bien : source == 2 is stri
 */
function determineIcon(searchKeys, responseMessageCurrent, source) {
    var bienIcons = ["small_yellow","small_green","small_blue","small_purple","measle_turquoise"];
    var striIcons = ["square_yellow","square_green","square_blue","square_purple","square_turquoise"];
    var def = "images/";
    var iconName = "images/";

    if(source == 1) { // bien
        for(var i = 0; i < searchKeys.length; i++) { // for each search key
            if (responseMessageCurrent[2].indexOf(searchKeys[i]) > -1) { // match responseMessage to searchKey
                var iconIndex = getIconIndex(searchKeys[i],"bien");
                deleteTableIcon(searchKeys[i]);
                iconName += bienIcons[iconIndex];
                setTableIcon(searchKeys[i], iconIndex, "bien", bienIcons);
            }
        }
    } else if(source == 2) { // stri
        for(var i = 0; i < searchKeys.length; i++) { // for each search key
            if (responseMessageCurrent[2].indexOf(searchKeys[i]) > -1) { // match responseMessage to searchKey
                var iconIndex = getIconIndex(searchKeys[i],"stri");
                deleteTableIcon(searchKeys[i]);
                iconName += striIcons[iconIndex];
                setTableIcon(searchKeys[i], iconIndex, "stri", striIcons);
            }
        }
    }
    
    if(iconName == def)
        iconName = "images/measle_turquoise";
    
    return iconName;
}

// determines the index to use to get the icon from bienIcons or striIcons array
// it will give the first icon in the icons array to the last item in the query table
// it will give the second icon in the icons array to the second to last item in the query table
function getIconIndex(searchKey,type) {
    var rows = table.rows;
    var totalCount = 0;
    var index = 0;
    for (var i = 0; i<rows.length; i++) {
        var row = rows[i];

        if (row.cells[2].innerHTML.indexOf(type) > -1) { // if it is bien, add to the count
            totalCount++;
        }
        
        if (row.cells[0].innerHTML == searchKey) {
            // return rows.length-1-count;
            index = totalCount;
        }
    }

    iconIndex = totalCount-index;
    if (iconIndex>5) {
        return iconIndex%5;
    } else {
        return iconIndex;
    }
    return -1;
}

function deleteTableIcon(searchKey) {
    var rows = table.rows;
    for (var i = 0; i<rows.length; i++) {
        var row = rows[i];
        if (row.cells[0].innerHTML.indexOf(searchKey) > -1) {
            row.deleteCell(2);
        }
    }
}

function setTableIcon(searchKey, iconIndex, type, icons) {
    var rows = table.rows;
    for (var i = 0; i<rows.length; i++) {
        var row = rows[i];
        if (row.cells[0].innerHTML == searchKey) {
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
