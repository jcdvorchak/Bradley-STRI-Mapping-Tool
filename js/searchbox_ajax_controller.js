/*
*Copyright 2014 Google Inc. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0

* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/*
*Author: Ouya Zhang
*Date: March 22, 2014
*Content: This file is used to implmente ajax function for the search box
*/

function SearchAJAX() {

}

/*
Search_AJAX.prototype.getSearchValue = function() {
  var searchValue = $("#search_box").val();
  this.searchValue = searchValue;
};
*/

SearchAJAX.prototype.searchAJAXHandler = function () {
    //$("#search_box").keyup(function () {
        //var searchValue = $("#search_box").val();
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

                    /*
                    if(dataArray1.length > 20) {
                      var dataArray2 = [];
                      for(var j = 0; j < 20; j++) {
                        var ele2 = dataArray1[j];
                        dataArray2.push(ele2);
                      }
                      $("#search_box").autocomplete({
                          source: dataArray2
                      });
                    } else {
                      */
                    $("#search_box").autocomplete({
                        source: dataArray1
                    });
                    //}
                }
            });
        })
    //});

};

(function() {
  var search = new SearchAJAX();
  search.searchAJAXHandler();
})();