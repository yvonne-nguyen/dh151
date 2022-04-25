// Global variables
let map;
let lat = 37.3382;
let lon = -121.8863;
let zl = 11;
let path = "data/sjhousing.csv";
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
		radius: 6,
		weight: 0.5,
		color: 'white',
		fillColor: '#ffffff',
		fillOpacity: 0.4
	}


	// loop through each entry
	data.data.forEach(function(item, index){
		// create marker
		let marker = L.circleMarker([item.Latitude,item.Longitude],circleOptions)
		.on('mouseover',function(){
			this.bindPopup(`${item.ZipCode}<br>${item.AverageCost}</br>`).openPopup()
		})

		$('.sidebar').append(`<div class="sidebar-item" onmouseover="panTo(${index})"> ${item.ZipCode}</div>`)
		
		// add marker to featuregroup		
		markers.addLayer(marker)
})


	// add featuregroup to map
	markers.addTo(map)

	// fit markers to map
	map.fitBounds(markers.getBounds())
}

function panTo(index){
	map.setZoom(14);
	map.panTo(markers.getLayers()[index]._latlng);
}
