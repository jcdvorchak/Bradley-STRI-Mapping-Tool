// var ul = document.getElementById("genus");
// var li = document.createElement("li");



// //loop or somethign through the table
// li.appendChild(document.createTextNode("Four"));
// ul.appendChild(li);



function SearchAJA() {

}


SearchAJA.prototype.searchAJAHandler = function () {
//WILL PROBABLY USE SOMETHING LIKE THIS VVVVVVVVV

     $(function () { 
            var query = "SELECT 'Genus' FROM " +
                '1EtC8wMoso-d59wgiTgXaGFTovW2-wcgdb25jNV8p' +
                //" WHERE 'Genus' LIKE " + "'" + searchValue + "%'" +
                " GROUP BY 'Genus'";
            var encodedQuery = encodeURIComponent(query);

            // Construct the URL
            var url = ['https://www.googleapis.com/fusiontables/v1/query'];
            url.push('?sql=' + encodedQuery);
            url.push('&key=AIzaSyCnxStZYPcxJNBjAa7V96g__7lpv80jIMY');
            url.push('&callback=?');

            $.ajax({
                url: url.join(''),
                dataType: 'jsonp',
                success: function (data) {
                    var rows = data['rows'];
                    var dataArray1 = [];
                    for (i in rows) {
                        var ele1 = rows[i][0]
                        dataArray1.push(ele1);
                    }

                      */
                    $("#genuslist").menu({   //CHANGED TO GENUS,
                        source: dataArray1
                    });
                    //}
                }
            });
        })
    });
};

(function() {
  var search = new SearchAJA();
  search.searchAJAHandler();
})();