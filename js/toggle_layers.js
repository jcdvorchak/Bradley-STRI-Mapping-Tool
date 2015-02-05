function riverLayer() {
	var layer = new google.maps.FusionTablesLayer({
		query: {
			select: 'geometry',
			from: '1vCvnicNK4hdsgq5mP4CKuoeYQOouCOd0_VwH93Mx'
		},
		styles: [{
			polylineOptions: {
				strokeColor: '#0000ff',
				strokeWeight: '1'
			}
		}]
	});
	layer.setMap(map);
}

function adminLayer() {
	var layer = new google.maps.FusionTablesLayer({
		query: {
			select: 'geometry',
			from: '15IjvsOUlWW0v2uRhCUbrEv2xNw2r0yBJ0t-1wO-Q'
		},
		styles: [{
			polygonOptions: {
				fillColor: '#B2DFEE',
				fillOpacity: 0.2
			}
		}]
	});
	layer.setMap(map);
}

function protectedLayer() {
	var layer = new google.maps.FusionTablesLayer({
		query: {
			select: 'geometry',
			from: '1c7CVWeo2XSA-SjzIIHtqtCtiPFU_fx64G3UtnBy2'
		},
		styles: [{
			polygonOptions: {
				fillColor: '#4a777a',
				fillOpacity: 0.2
			}
		}]
	});
	layer.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);