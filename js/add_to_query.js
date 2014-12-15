function addToList(TreeText) {
	var activeTab = document.getElementsByClassName('tab-pane active'); //doesn't do anything yet

	var table = document.getElementById("listTable");
	var row = table.insertRow(0);
	var textCell = row.insertCell(0);
	var btnCell = row.insertCell(1);
	var treeText = document.getElementById('search_box').value;
	textCell.innerHTML = treeText;
	btnCell.innerHTML = "<button type='button' class='btn btn-primary' data-toggle='button' aria-pressed='false' autocomplete='off' onclick='delRow(this)'>Delete</button>";//Delete Button
}

function delRow(o) {
	var p = o.parentNode.parentNode;
	p.parentNode.removeChild(p);
}