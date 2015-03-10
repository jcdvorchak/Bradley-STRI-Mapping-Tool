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
	var textCell = row.insertCell(0);
	var btnCell = row.insertCell(1);
	var treeText = document.getElementById('search_box').value;
	textCell.innerHTML = treeText;
	btnCell.innerHTML = "<button type='button' class='btn btn-success' data-toggle='button' aria-pressed='false' autocomplete='off' onclick='delRow(this)'>Delete</button>";//Delete Button
}

function addDropDownToList(treeText) {
	console.log(treeText);
	document.getElementById('search_box').value = treeText;
}

function delRow(o) {
	var p = o.parentNode.parentNode;
	p.parentNode.removeChild(p);
}
