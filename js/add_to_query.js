function addToList(TreeText) 
{
var table = document.getElementById("listTable");
var row = table.insertRow(0);
var textCell = row.insertCell(0);
var btnCell = row.insertCell(1);
textCell.innerHTML = "<p>TreeText</p>";
btnCell.innerHTML = "<button onclick='delRow(this)'>X</button>";//Delete Button

}

function delRow(o) {
	var p=o.parentNode.parentNode;
         p.parentNode.removeChild(p);
}
