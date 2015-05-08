var bienGenusNames;
var bienSpeciesNames;
var bienLatinNames;
var striGenusNames;
var striSpeciesNames;
var striLatinNames;
var striCensusIds;

// get genus names from the bien_panama table
function getBienGenusNames() {
  console.log("loading bien genus names");
  var xmlhttp;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.open("GET", "php/query_for_list.php?query=genus&type=bien", false); // post for security
  xmlhttp.send(); // send variable to php script to query mysql db
  bienGenusNames = eval(xmlhttp.responseText); // get response from the query
}

// get genus names from the stri_bci table
function getStriGenusNames() {
  console.log("loading stri genus names");
  var xmlhttp;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.open("GET", "php/query_for_list.php?query=genus&type=stri", false); // post for security
  xmlhttp.send(); // send variable to php script to query mysql db
  striGenusNames = eval(xmlhttp.responseText); // get response from the query
}

// get latin names from the bien_panama table
function getBienLatinNames() {
  console.log("loading bien latin names");
  var xmlhttp;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.open("GET", "php/query_for_list.php?query=latin&type=bien", false); // post for security
  xmlhttp.send(); // send variable to php script to query mysql db
  bienLatinNames = eval(xmlhttp.responseText); // get response from the query
}

// get latin names from the stri_bci table
function getStriLatinNames() {
  console.log("loading stri latin names");
  var xmlhttp;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.open("GET", "php/query_for_list.php?query=latin&type=stri", false); // post for security
  xmlhttp.send(); // send variable to php script to query mysql db
  striLatinNames = eval(xmlhttp.responseText); // get response from the query
}

// get census ids from the stri_bci table
function getStriCensusIds() {
  console.log("loading census ids");
  var xmlhttp;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.open("GET", "php/query_for_list.php?query=census&type=stri", false); // post for security
  xmlhttp.send(); // send variable to php script to query mysql db
  striCensusIds = eval(xmlhttp.responseText); // get response from the query
}

// separate species from genus in LatinNames from the bien_panama table
function extractBienSpecies(bienLatinNames) {
  bienSpeciesNames = new Array();

  var validNameCount = 0;
  for (i=0; i<bienLatinNames.length; i++) {
    var currLatin = bienLatinNames[i][0].split(" ");
    if (isFirstSpecies(bienSpeciesNames, currLatin[1])) {
      bienSpeciesNames[validNameCount] = new Array(2);
      bienSpeciesNames[validNameCount][0] = currLatin[1];
      bienSpeciesNames[validNameCount][1] = currLatin[0];
      validNameCount++;
    }
  }
  bienSpeciesNames.sort();
}

// separate species from genus in LatinNames from the bien_panama table
function extractStriSpecies(striLatinNames) {
  striSpeciesNames = new Array();

  var validNameCount = 0;
  for (i=0; i<striLatinNames.length; i++) {
    var currLatin = striLatinNames[i][0].split(" ");
    if (isFirstSpecies(striSpeciesNames, currLatin[1])) {
      striSpeciesNames[validNameCount] = new Array(2);
      striSpeciesNames[validNameCount][0] = currLatin[1];
      striSpeciesNames[validNameCount][1] = currLatin[0];
      validNameCount++;
    }
  }
  striSpeciesNames.sort();
}

function isFirstSpecies(speciesNames,name) {
  var exists = true;
  for (var j = 0; j<speciesNames.length-1; j++) {
    if (speciesNames.length>1 && speciesNames[j][0]!=null) {
      if (speciesNames[j][0]==name) {
        exists = false;
      }
    }
  }
  return exists;
}

getBienGenusNames();
getBienLatinNames();
extractBienSpecies(bienLatinNames);
getStriGenusNames();
getStriLatinNames();
extractStriSpecies(striLatinNames);
getStriCensusIds();

// populate search box autocomplete
function loadAutocomplete() {
  var dataArray1 = [];

  if (document.getElementById('bien').checked) {
    for (i=0; i<bienLatinNames.length-1;i++){
        var ele1 = bienLatinNames[i][0];
        dataArray1.push(ele1);
    }
  } else if (document.getElementById('stri').checked) {
    for (i=0; i<striLatinNames.length-1;i++){
        var ele1 = striLatinNames[i][0];
        dataArray1.push(ele1);
    }
  }

  $("#search_box").autocomplete({
      source: dataArray1
  });
}

// populate genusDropdown
function genusDropdown () {
  var ul = document.getElementById("genuslist");
  if (ul) {
      while(ul.firstChild){
          ul.removeChild(ul.firstChild);
      }
  }
  
  if (document.getElementById('bien').checked) {
    for (i=0; i<bienGenusNames.length-1;i++) {
        var ele1 = bienGenusNames[i][0];
        var node = document.createElement("li");
        var textnode = document.createTextNode(ele1);
        node.appendChild(textnode);
        node.setAttribute("id",ele1);
        ul.appendChild(node);
    }
  } else if (document.getElementById('stri').checked) {
    for (i=0; i<striGenusNames.length-1;i++) {
        var ele1 = striGenusNames[i][0];
        var node = document.createElement("li");
        var textnode = document.createTextNode(ele1);
        node.appendChild(textnode);
        node.setAttribute("id",ele1);
        ul.appendChild(node);
    }
  }
}

// populate species dropdown
function speciesDropdown () {
  var ul = document.getElementById("specieslist");
  if (ul) {
      while(ul.firstChild){
          ul.removeChild(ul.firstChild);
      }
  }
  
  if (document.getElementById('bien').checked) {
    for (i=0; i<bienSpeciesNames.length-1;i++) {
        var species = bienSpeciesNames[i][0];
        var genus = bienSpeciesNames[i][1];
        var node = document.createElement("li");
        var textnode = document.createTextNode(species); // what to show in the drop down
        node.appendChild(textnode);
        node.setAttribute("id",genus+" "+species); // what to add the search box when a species is clicked
        ul.appendChild(node);
    }
  } else if (document.getElementById('stri').checked) {
    for (i=0; i<striSpeciesNames.length-1;i++) {
        var species = striSpeciesNames[i][0];
        var genus = striSpeciesNames[i][1];
        var node = document.createElement("li");
        var textnode = document.createTextNode(species); // what to show in the drop down
        node.appendChild(textnode);
        node.setAttribute("id",genus+" "+species); // what to add the search box when a species is clicked
        ul.appendChild(node);
    }
  }
}

// populate dbh min dropdown
function dbhMinDropdown() {
  var dbhminlist = document.getElementById("dbhminlist");
  if (dbhminlist) {
      while(dbhminlist.firstChild){
          dbhminlist.removeChild(dbhminlist.firstChild);
      }
  }
  
  addEmptyNode(dbhminlist);

  for (i = 0; i<36; i++) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(i*100);
    node.appendChild(textnode);
    node.setAttribute("id",i*100);
    dbhminlist.appendChild(node);
  }
}

// populate dbh max dropdown
function dbhMaxDropdown() {
  var dbhmaxlist = document.getElementById("dbhmaxlist");
  if (dbhmaxlist) {
      while(dbhmaxlist.firstChild){
          dbhmaxlist.removeChild(dbhmaxlist.firstChild);
      }
  }

  addEmptyNode(dbhmaxlist);

  for (i = 0; i<36; i++) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(i*100);
    node.appendChild(textnode);
    node.setAttribute("id",i*100);
    dbhmaxlist.appendChild(node);
  }
}

// populate census dropdown with CensusID
function censusDropdown() {
  var ul = document.getElementById("censuslist");
  if (ul) {
      while(ul.firstChild){
          ul.removeChild(ul.firstChild);
      }
  }

  addEmptyNode(ul);

  for (i=0; i<striCensusIds.length-1;i++) {
        var node = document.createElement("li");
        var textnode = document.createTextNode(striCensusIds[i]); // what to show in the drop down
        node.appendChild(textnode);
        node.setAttribute("id",striCensusIds[i]); // what to add the search box when a species is clicked
        ul.appendChild(node);
    }
}

function addEmptyNode(list) {
  var node = document.createElement("li");
  var textnode = document.createTextNode("(empty)"); // what to show in the drop down
  node.appendChild(textnode);
  node.setAttribute("id",""); // what to add the search box when a species is clicked
  list.appendChild(node);
}