var table;

function addToList(TreeText) {
	var activeTab = document.getElementsByClassName('tab-pane active')[0];
	if(activeTab.id == "panama") {
		table = document.getElementById("listTablePanama");
	}
	else if(activeTab.id == "colombia") {
		table = document.getElementById("listTableColombia");
	}

	var row = table.insertRow(0);
	var textCell = row.insertCell(0); // holds the Latin name
	var btnCell = row.insertCell(1); // holds the delete button
	var dataTypeCell = row.insertCell(2); // holds the type of data (bien or stri)
	var treeText = document.getElementById('search_box').value;
	textCell.innerHTML = treeText;
	btnCell.innerHTML = "<button type='button' class='btn btn-success' data-toggle='button' aria-pressed='false' autocomplete='off' onclick='delRow(this)'>Delete</button>";//Delete Button
	if (document.getElementById('bien').checked) {
		dataTypeCell.innerHTML = "<img id='bien' alt='bien' src='images/small_red.png'>";
	} else if (document.getElementById('stri').checked) {
		dataTypeCell.innerHTML = "<img id='stri' alt='stri' src='images/small_green.png'>";
	} else {
		dataTypeCell.innerHTML = "<?>";
	}
}

function addDropDownToList(treeText) {
	console.log(treeText);
	document.getElementById('search_box').value = treeText;
}

function delRow(o) {
	var p = o.parentNode.parentNode;
	p.parentNode.removeChild(p);
}
