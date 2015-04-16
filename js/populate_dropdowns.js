var genusNames;
var speciesNames;
var latinNames;
// var latinNameSplit;

function getGenusNames() {
  console.log("loading genus names");
  var xmlhttp;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.open("GET", "php/query_for_list.php?query=genus", false); // post for security
  xmlhttp.send(); // send variable to php script to query mysql db
  genusNames = eval(xmlhttp.responseText); // get response from the query
}

function getLatinNames() {
  console.log("loading latin names");
  var xmlhttp;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.open("GET", "php/query_for_list.php?query=species", false); // post for security
  xmlhttp.send(); // send variable to php script to query mysql db
  latinNames = eval(xmlhttp.responseText); // get response from the query
}

function extractSpecies(latinNames) {
  speciesNames = new Array(latinNames.length);

  for (i=0; i<latinNames.length-1;i++) {
    var latin = latinNames[i][0];
    var latinSplit = latin.split(" ");
    speciesNames[i] = latinSplit;
  }
  // speciesNames.sort(); // put into alphabetical order
}

getGenusNames();
getLatinNames();
extractSpecies(latinNames);

$(function searchBoxAutoComplete () {
  var dataArray1 = [];
  for (i=0; i<genusNames.length-1;i++){
      var ele1 = genusNames[i][0];
      dataArray1.push(ele1);
  }

  $("#search_box").autocomplete({
      source: dataArray1
  });
});

function genusDropdown () {
  var ul = document.getElementById("genuslist");
  if (ul) {
      while(ul.firstChild){
          ul.removeChild(ul.firstChild);
      }
  }
            
  for (i=0; i<genusNames.length-1;i++) {
      var ele1 = genusNames[i][0];
      var node = document.createElement("li");
      var textnode = document.createTextNode(ele1);
      node.appendChild(textnode);
      node.setAttribute("id",ele1);
      ul.appendChild(node);
  }
}

function speciesDropdown () {
  var ul = document.getElementById("specieslist");
  if (ul) {
      while(ul.firstChild){
          ul.removeChild(ul.firstChild);
      }
  }
            
  for (i=0; i<speciesNames.length-1;i++) {
      var species = speciesNames[i][1];
      var genus = speciesNames[i][0];
      var node = document.createElement("li");
      var textnode = document.createTextNode(species);
      node.appendChild(textnode);
      node.setAttribute("id",genus+" "+species);
      ul.appendChild(node);
  }
}