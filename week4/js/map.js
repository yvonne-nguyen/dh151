// Global variables
let map;
let lat = 37.3382;
let lon = -121.8863;
let zl = 10;
let path = "data/sjhousing.csv";

// global variables
let markers = L.featureGroup();

// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
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
	
	// loop through each entry
	data.data.forEach(function(item,index){
		// create marker
		let marker = L.marker([item.latitude,item.longitude])

		// add marker to featuregroup
		markers.addLayer(marker)
	})

	// add featuregroup to map
	markers.addTo(map)

	// fit markers to map
	map.fitBounds(markers.getBounds())
}
