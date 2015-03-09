function genus_populate ()
{
    var ul = document.getElementById("genuslist");
    if(ul){
        while(ul.firstChild){
            ul.removeChild(ul.firstChild);
        }
    }

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
        success: function (data) 
        {
            var rows = data['rows'];
            
            for (i in rows) 
            {
                var ele1 = rows[i][0]
                var node = document.createElement("li");
                var textnode = document.createTextNode(ele1);
                node.appendChild(textnode);
                node.setAttribute("id",ele1);
                ul.appendChild(node);
            }
        }
    });
}