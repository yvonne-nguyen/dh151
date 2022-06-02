// Global variables
let map;
let lat = 37.3382;
let lon = -121.8863;
let zl = 11;
let path = "data/week3data.csv";
let markers = L.featureGroup();


// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
	readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to read csv data
	function readCSV(path){
		Papa.parse(path, {
			header: true,
			download: true,
			complete: function(data) {
				console.log(data);
			
				// map the data
				mapCSV(data);

			}
		});
	}
function mapCSV(data){
	
	// circle options
	let circleOptions = {
		radius: 8,
		weight: 1,
		color: 'white',
		fillColor: 'red',
		fillOpacity: 0.5,
	}


	// loop through each entry
	data.data.forEach(function(item, index){
		// create marker
		let marker = L.circleMarker([item.Lat,item.Lon],circleOptions)
		.on('mouseover',function(){
			this.bindPopup(`${item.Place}<br><br>${item.Desc}<br><br>${item.Image}`).openPopup()
		})

		$('.sidebar').append(`<div class="sidebar-item" onmouseover="panTo(${index})"> ${item.Place}<br>${item.Image}</div>`)
		
		// add marker to featuregroup		
		markers.addLayer(marker)
})


	// add featuregroup to map
	markers.addTo(map)

	// fit markers to map
	map.fitBounds(markers.getBounds())
}

function panTo(index){
	map.setZoom(15);
	map.panTo(markers.getLayers()[index]._latlng);
}

