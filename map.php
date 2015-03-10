<?php
  // include 'connect.php';
  $apikey = "AIzaSyCnxStZYPcxJNBjAa7V96g__7lpv80jIMY";
?>

<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport"
        content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map-canvas { height: 100% }
    </style>
    <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=
          <?php echo $apikey; ?>">
    </script>
    
    <?php include 'map_loader.php' ?>


    <title>Map of Species</title>

    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>

    <script type="text/javascript" src="js/fusiontips.js"></script>

    <script type="text/javascript" src="js/map_loader.js"></script>
    <script type="text/javascript" src="js/add_to_query.js"></script>
    <script type="text/javascript" src="js/UIToggle.js"></script>
    <script type="text/javascript" src="js/plot_all_button.js"></script>
    <script type="text/javascript" src="js/toggle_layers.js"></script>
    <link rel="stylesheet" type="text/css" href="css/style.css" />

    <!--BOOTSTRAP STUFF-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script type="text/javascript" src="lib/bootstrap/js/bootstrap.min.js"></script>
    <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
    <link rel="stylesheet" type="text/css" href="lib/bootstrap/css/bootstrap.css" />

    <!--AUTOCOMPLETE STUFF-->
    <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="lib/jquery/jquery-ui-1.10.4.custom.js"></script>
    <link rel="stylesheet" type="text/css" href="lib/jquery/jquery-ui-1.10.4.custom.css" />
    <script type="text/javascript" src="js/searchbox_ajax_controller.js"></script>
    <script type="text/javascript" src="js/populate_genus_dropdown.js"></script>

  </head>

  <body>
    <form class="form-inline" role="form" id="search_container">
      <div class="form-group">
        <div class="input-group">
          <input type="text" class="form-control" id="search_box" placeholder="Enter genus name">
        </div>
        <button type="button" class="btn btn-success" onclick="addToList('MyTree')">Add</button>
      </div>
      <div class="dropdown" id="genus">
        <button class="btn btn-success dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" onclick="genus_populate()">Genus
          <span class="caret"></span></button>
          <ul class="dropdown-menu" id="genuslist" role="menu" aria-labelledby="menu1">
            </ul>

            <script>
              function dosomething()
              {
                var ul = document.getElementById("genuslist");

                ul.addEventListener('click', function(e)
                {
                  if(e.target.tagName === 'LI')
                  {
                    addDropDownToList(e.target.id);
                  }
                });
              }
              dosomething();
            </script>
          </div>

          <div class="dropdown" id="species">
            <button class="btn btn-success dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Species
              <span class="caret"></span></button>
              <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                <!--<li role="presentation"><a role="menuitem" tabindex="-1" href="#">grandis</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" href="#">guajava</a></li>-->
              </ul>
          </div>
          
          <div class="btn-group" data-toggle="buttons" id="radio">
            <label class="btn btn-success active">
              <input type="radio" name="options" id="option1" autocomplete="off" checked>STRI
            </label>
            <label class="btn btn-success">
              <input type="radio" name="options" id="option2" autocomplete="off">BIEN
            </label>
          </div>
        </form>

        <div class="btn-group" data-toggle="buttons" id="layer_control_container">
          <label class="btn btn-success">
              <input type="checkbox" autocomplete="off" id="layer1" onchange="changeLayer()">Rivers
          </label>
          <label class="btn btn-success">
              <input type="checkbox" autocomplete="off" id="layer2" onchange="changeLayer()">Administrative Areas
          </label>
          <label class="btn btn-success">
              <input type="checkbox" autocomplete="off" id="layer3" onchange="changeLayer()">Protected Areas
          </label>
        </div>

        <div id="map-canvas"></div>

        <div id ="QueryListing">
          <div id="QueryTable">
            <!--For Testing purposes only. There will be JS in the search that will call addToList()-->
            <div class="tabbable">
              <ul class="nav nav-tabs" id="countryTab">
                <li class="active"><a class="tab-control" href="#panama" data-toggle="tab">Panama</a></li>
                <li><a class="tab-control" href="#colombia" data-toggle="tab">Colombia</a></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane active" id="panama">
                  <table id="listTablePanama" style="height: 1px"></table>
                </div>
                <div class="tab-pane" id="colombia">
                  <table id="listTableColombia" style="height: 1px"></table>
                </div>
              </div>

              <script>
                $('#countryTab').each(function() { //Find list of tabs
                    var $this = $(this); //Store this list
                    var $tab = $this.find('li.active'); //Get the active list item
                    var $link = $tab.find('a'); //Get link from active tab
                    var $panel = $($link.attr('href')); //Get active panel

                    $this.on('click', '.tab-control', function(e) { //When click on a tab
                        e.preventDefault(); //Prevent link behavior
                        var $link = $(this); //Store the current link
                        var id = this.hash; //Get href of clicked tab

                        if(id && !$link.is('active')) { //If not currently active
                            $panel.removeClass('active'); //Make panel inactive
                            $tab.removeClass('active'); //Make tab inactive

                            $panel = $(id).addClass('active'); //Make new panel active
                            $tab = $link.parent().addClass('active'); //Make new tab active
                        }
                    })
                })
              </script>

            </div>

          </div>
          <div id="HideButton">
            <button type="button" class="btn btn-success" id="hide">Hide/Unhide</button>
            <script>
                $("#hide").click(function() {
                    $("#QueryTable").slideToggle("fast");
                });
            </script>
          </div>
          <div id="PlotButton">
            <button type="button" class="btn btn-success" id="plot" onclick="plotAll()">Plot All</button>
          </div>
        </div>
        <button type="button" class="btn btn-success" id="ToggleUI" onclick="toggleAll()">Toggle UI</button>
  </body>
</html>