// create fusion tables layers
var riverLayer = new google.maps.FusionTablesLayer({
	query: {
		select: 'geometry',
		from: '1vCvnicNK4hdsgq5mP4CKuoeYQOouCOd0_VwH93Mx'
	},
	styleId:2
});

var adminLayer = new google.maps.FusionTablesLayer({
	query: {
		select: 'geometry',
		from: '15IjvsOUlWW0v2uRhCUbrEv2xNw2r0yBJ0t-1wO-Q'
	},
	styleId: 2
});

var protectedLayer = new google.maps.FusionTablesLayer({
	query: {
		select: 'geometry',
		from: '1c7CVWeo2XSA-SjzIIHtqtCtiPFU_fx64G3UtnBy2'
	},
	styleId: 2
});

// change / update layers when one is selected or deselected
function changeLayer() {
	var rLayer = document.getElementById("layer1").checked;
	var aLayer = document.getElementById("layer2").checked;
	var pLayer = document.getElementById("layer3").checked;
	
	if(rLayer == true) {
		riverLayer.setMap(map);
	} else if(rLayer == false) {
		riverLayer.setMap(null);
	} 

	if(aLayer == true) {
		adminLayer.setMap(map);
	} else if(aLayer == false) {
		adminLayer.setMap(null);
	} 

	if(pLayer == true) {
		protectedLayer.setMap(map);
	} else if(pLayer == false) {
		protectedLayer.setMap(null);
	}
}

google.maps.event.addDomListener(window, 'load', initialize);