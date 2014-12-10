function addToList(TreeText) {
	var table = document.getElementById("listTable");
	var row = table.insertRow(0);
	var textCell = row.insertCell(0);
	var btnCell = row.insertCell(1);
	textCell.innerHTML = "<p>TreeText</p>";
	btnCell.innerHTML = "<button type='button' class='btn btn-primary' data-toggle='button' aria-pressed='false' autocomplete='off' onclick='delRow(this)'>Delete</button>";//Delete Button
}

function delRow(o) {
	var p = o.parentNode.parentNode;
	p.parentNode.removeChild(p);
}