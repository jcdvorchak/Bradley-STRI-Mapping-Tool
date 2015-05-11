var table;

// add content in the searchbox to the query table when 'Add' is clicked
function addToList(TreeText) {
    // Decide which country tab is in use
    // var activeTab = document.getElementsByClassName('tab-pane active')[0];
    // if(activeTab.id == "panama") {
    //     table = document.getElementById("listTablePanama");
    // }
    // else if(activeTab.id == "colombia") {
    //     table = document.getElementById("listTableColombia");
    // }

    //*** Above code would be for multiple country extension. default to Panama table for now.
    table = document.getElementById("listTablePanama");

    // create the row and all appropriate cells
    var row = table.insertRow(0);
    var textCell = row.insertCell(0); // holds the Latin name
    var btnCell = row.insertCell(1); // holds the delete button
    var dataTypeCell = row.insertCell(2); // holds the type of data (bien or stri)
    var treeText = document.getElementById('search_box').value;
    textCell.innerHTML = treeText;
    btnCell.innerHTML = "<button type='button' class='btn btn-success' data-toggle='button' aria-pressed='false' autocomplete='off' onclick='delRow(this)'>Delete</button>"; // delete button
    if (document.getElementById('bien').checked) {
        dataTypeCell.innerHTML = "<img id='bien' src=''/>"; // placeholder for the icon
    } else if (document.getElementById('stri').checked) {
        dataTypeCell.innerHTML = "<img id='stri' src=''/>"; // placeholder for the icon
    } else {
        dataTypeCell.innerHTML = "<?>";
    }
}

// delete a row 'o' in the table
function delRow(o) {
    var p = o.parentNode.parentNode;
    p.parentNode.removeChild(p);
}

// When something is clicked in a dropdown list, add it to the respective form
// list - name of dropdown
// inputForm - name of form to place content in
function dropdownToInput(list, inputForm) {
    var ul = document.getElementById(list);

    ul.addEventListener('click', function(e) {
        if(e.target.tagName === 'LI') {
            document.getElementById(inputForm).value = e.target.id;
        }
    });
}