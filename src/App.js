// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;
var pos;

function find() {

 // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(show); 
        } else {
          window.alert("Browser doesn't support Geolocation")
          }
          function show(position){
              pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
             map = new google.maps.Map(document.getElementById('map'), {
    					center: pos,
    					zoom: 16,
              });  
              
//icon for home loction
  var hmarker = new google.maps.Marker({
    map: map,
    icon: {
                  url: 'https://vignette.wikia.nocookie.net/howtoprogram/images/9/9a/Home.png',
                  anchor: new google.maps.Point(10, 10),
                  scaledSize: new google.maps.Size(50, 50)
              },
    position: pos
  });
  
    infowindow = new google.maps.InfoWindow();
  
     //google.maps.event.addListener(hmarker, 'click', function() { 
 infowindow.setPosition(pos);
  infowindow.setContent( '<div><strong>'+ "Your Location" +'</strong></br>');
  infowindow.open(map);
  }}
function findR() {
  // creating an object for infoWindow
  if (pos === undefined) {window.alert("Couldn't get the current location, use default");
  pos = {lat: 1.346648 , lng: 103.84991200}
   map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 15
  });
  }

  // creating an object for infoWindow
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);//accessing the PlaceService class to use the function nearbysearch with location values passed as parameters
  service.nearbySearch({
    location: bishan,
    radius: 500,
    type: ['restaurant']
  }, callback);
 



//The result contains an array of 20 restaurants located nearby home and the results are passed to callbackfunction to check for the status
function callback(results, status) {
service = new google.maps.places.PlacesService(map);
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < 20; i++) {
      createMarker(results[i]);
      
    }
  }
}


//A marker is created for each place result
function createMarker(place) {
  var placeLoc = place.geometry.location;
   //window.alert (place.id);
  var marker = new google.maps.Marker({
    map: map,
    position: placeLoc
  });

//The infopane displays the restaurants name and address
  google.maps.event.addListener(marker, 'click', function() { 
  infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
              place.vicinity+ '<br>');
  infowindow.open(map, this);
  });
  
 
 }}
