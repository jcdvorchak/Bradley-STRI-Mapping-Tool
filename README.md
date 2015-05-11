Bradley-STRI-Mapping-Tool
=========================

STRI Mapping Tool for CS 490 Capstone

Mapping Tool Documentation
Bradley University, Department of Computer Science and Information Systems
Joey Dvorchak, Vidya Achanta, Anthony Giangiulio
May 10, 2015
============
The application can currently be accessed at the link below. Google Chrome will provide the best experience.
https://capstone.bradley.edu/~capstoneclass/Bradley-STRI-Mapping-Tool/index.html

Document Roster
---------------
The following provides a listing of all the files contained in the mapping tool.  These include all source and resource files.

index.html
The main webpage. It creates all elements of the webpage and imports all other components including our custom Javascript and PHP files, Google Maps API, and other styling components.

css/style.css
This is the primary style-sheet for the application. It contains custom styles and positions for elements created in index.html.

js/map_loader.js
This file initializes the map using Google Maps API. Custom settings for the overall map are set here including default starting location, default zoom, and which Google Maps interface objects to use. We chose to use Google Maps zoom control, pan control, and map type control.

js/add_to_query.js
This file contains the function addToList() that is responsible for populating the query table on the left hand side of the interface. Whenever the ‘Add’ button is pressed, the addToList() function will add the contents of the search box next to it to the query table. This file also contains the function that adds the species selected in the dropdown menus into their appropriate form.

js/plot_all_button.js
This is the file responsible for plotting the trees. When the ‘Plot All’ button is pressed, the plotAll() function in this file will be called. This function gathers all content added to the query table and then sends the data to it’s respective data source functions. For example, BIEN data will be plotted with plotBienData() and STRI data will be plotted with plotStriData(). These functions create a MySQL WHERE clause based on the data that needs to be plotted and queries the respective tables using query_for_location.php. This information includes Latitude and Longitude. After the information is received from query_for_location.php, Google Maps markers are created for every tree. During marker creation the icon used to distinguish the tree is chosen. This icon is also added to the query table next to its respective row.

js/populate_dropdowns.js
When the webpage is loaded the application will load Genus names and Latin names from the bien_panama and stri_bci tables. It also loads CensusID’s from the stri_bci table. This will cause a small initial load time. The information is received from query_for_list.php in a JSON format. The other functions in the file populate the search box autocomplete as well as all drop down menus when those elements are clicked.

js/toggle_layers.js
This file determines which layer(s) to show. These layers are Rivers, Protected Areas, and Administrative areas. The data for each layer is loaded into a Google Maps Fusion Table Layer from a Google Maps Fusion Table. Whenever a layer is selected or deselected all layers will be refreshed based on what is selected by the changeLayer() function.

js/UIToggle.js
This file contains the function that is executed when the ‘Toggle UI’ button is pressed. It fades out all user interface objects except for the ‘Toggle UI’ button and the Google Maps API interface objects.

php/connect.php
This file creates a connection to the specified MySQL database using the specified user credentials. Information on changing these credentials is included in the Installation Instructions section.

php/query_for_list.php
This file is used to get data for the drop down menus and search box autocomplete from the database. It is called in populate_dropdown.js. When it is called it is passed two parameters, ‘query’ and ‘type’. The ‘query’ parameter specifies which query to execute, this could be a query for Genus names, Latin names, or CensusID’s. The ‘type’ parameter specifies which table to use for the query, this could be BIEN or STRI. Query responses are returned to populate_dropdown.js in JSON.

php/query_for_location.php
This file is used to get data to plot the trees on the map. It is called in plot_all_button.js. When it is called it is passed two parameters, ‘where’ and ‘type’. The ‘where’ parameter contains the MySQL WHERE clause that was generated in plot_all_button.js. The ‘type’ parameter specifies the table to query, this could be BIEN or STRI. Query responses are returned to plot_all_button.js in JSON. These responses include the Latitude, Longitude, and the full Latin name of the tree.

images/
This directory contains the images used for icons plotted in the mapping application. There are circle images for BIEN data, and square images for STRI data. Information on updating or changing these images is included in the Image Customization section.

lib/
This directory contains imported components Bootstrap and jQuery. Bootstrap is the framework we used to create the user-friendly interface. We used the JavaScript library jQuery for easier document traversal and Ajax calls. 


Installation Instructions
-------------------------
Copy the entire file structure into the desired location which will serve as your root directory. All files mentioned in Document Roster must be included in the same directory structure. Assume directories include files listed in the Document Roster.

The file php/connect.php must be changed to connect to the database that is in use.

Any changes made to database names, or column names will need to be updated in query_for_list.php and query_for_location.php.

The application should load whenever index.html is opened and work as expected.


Image Customization
-------------------
To add or change images the following steps must be followed:
-Add or remove desired images to the images/ directory
-Update the image names to the bienIcons and striIcons arrays in the function determineIcon() in plot_all_button.js.
-Edit the maxIcons variable in getIconIndex() in plot_all_button.js. In this case it is 5 because there are only 5 icons.

Additional notes:
-Be sure both striIcons and bienIcons have the same number of icons.
-Be sure that the images are type .png or the code in setTableIcon() in plot_all_button.js must be changed.
-All other functions should work as expected after these changes with the new image icons.


Remaining Tasks
---------------
The following is a list of tasks that have yet to be completed, but were outlined as desired elements, features, or functions:
Multiple Plots - 
Add functionality to filter tree Genus and species by plot. 
Multiple Countries - 
Add functionality to see tree Genus and species in more than one country. Currently there is a Colombia tab in the query table, but it has no functionality. It is there to show a way the tool could expand to feature more than one country in the future.


Tool Interface Usage Guide
--------------------------

Search box:
The contents of this box are used to add content to the query table. A Genus name or a full Latin name can be entered into the search box. There is an autocomplete feature for the search box if entering a Genus or Latin name manually. Alternatively the Genus dropdown and species dropdown can be used.

Add button:
Pressing this button will add the Genus or Latin name entered into the search box as an entry in the query table.

Genus dropdown:
This dropdown will load all Genus names of the data type selected in the BIEN / STRI checkbox. If a Genus is clicked, it will be added to the search box.

Species dropdown:
This dropdown will load all species names of the data type selected in the BIEN / STRI checkbox. If a species is clicked, it’s full Latin name will be added to the search box.

Rivers/Administrative Areas/Protected Areas checkbox:
Any number of these layers can be selected at the same time. When one is selected the map will update and display all layers that are checked.


BIEN / STRI checkbox:
Only one can be checked at a time. This determines which datasource to use to populate Genus and species dropdowns as well as the search box autocomplete. When the ‘Add’ button is pressed, the content in the search box will be added to the query table as the data type selected in this search box.

DEAD checkbox:
This is a filter for STRI data only. If it is checked, the ‘Plot All’ button will plot dead and alive STRI trees. If it is not checked, the ‘Plot All’ button will plot alive STRI trees only.

DBHMIN dropdown and DBHMAX dropdown:
These are a filter for STRI data only. They default to a min of 0 and a max of 3500. A value can be entered manually or selected automatically from the dropdown menus that will open when DBHMIN or DBHMAX are clicked.

CENSUS dropdown:
This is a filter for STRI data only. The default is every census. The dropdown is populated with every CensusID in the STRI BCI plot data. A value can be entered manually or selected automatically from the dropdown menu that will open when CENSUS is clicked.

Query table:
This holds rows of tree Genus or Latin names that will be plotted when ‘Plot All’ is pressed.

Panama / Colombia tabs

This tab shows the current country the data is for. This tool only supports Panama currently, but a Colombia tab is featured next to it. The Colombia tab has no functionality, but can be used for future expansion to multiple countries.

Query table entry:
Each entry consists of the Genus or Latin name, based on what was added, a Delete button, and the icon. The Delete button will remove the entry from the query table. It will stay on the map, but when the Plot All button is pressed again, it will be erased. The icon shows what the entry is plotted as on the map while also giving indication on the data source. A square is from the STRI BCI Plot table and a circle is for BIEN data.

Hide/Unhide button:
This button will collapse and expand the query table to show more of the map.

Plot All button:
When this button is pressed all existing map points will be cleared and all rows in the query table will be plotted. If there are no entries in query table ‘Plot All’ will clear any existing trees.

Toggle UI button:
This button is used to toggle the visibility of the user interface. User interface includes every button and form that is not the Toggle UI button or a Google Maps API interface object (pan control, zoom control, and map type control).

Pan control:
This is a default Google Maps tool used to move around the map.

Zoom control:
This is a default Google Maps tool used to change the zoom level.


Map type control:
This is a default Google Maps tool used to change the type of map shown.

Info Windows:
When a map marker is clicked, it will show an info window. Currently the info window includes the Latin name, Latitude, and Longitude. To remove the info window either click the ‘X’ in the top right or click anywhere else on the map. Multiple info windows can be opened at the same time.

Hover boxes:
When an icon is hovered over with the mouse, the Latin name with show after a short period. When the mouse moves off of the icon, the hover box will disappear. This is shown in the image as if the mouse was hovering over the encircled marker.