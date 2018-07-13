
var map;
var infowindow;
var pos;
  
//finding current location using geoloaction
  function find() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(show); 
        } 
        else 
        {
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
              
               
       //Marker for current loction
       var hmarker = new google.maps.Marker({
       map: map,
       icon: {
                  url: 'https://vignette.wikia.nocookie.net/howtoprogram/images/9/9a/Home.png',
                  anchor: new google.maps.Point(11, 11),
                  scaledSize: new google.maps.Size(50, 50)
              },
       position: pos
     });
      infowindow = new google.maps.InfoWindow();
      infowindow.setPosition(pos);
      infowindow.setContent( '<div><strong>'+ "Your Location" +'</strong></br>');
      infowindow.open(map);
     }}

      function findR() {
        //if geolocation is not enabled it uses default location
        if (pos === undefined) {
        window.alert("Couldn't get the current location, use default");
        pos = {lat: 1.346648 , lng: 103.84991200}
        map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
        });
         }
       //the current-location co-ordinates are passed to find the restaurants nearby
       infowindow = new google.maps.InfoWindow();
       var service = new google.maps.places.PlacesService(map);
         service.nearbySearch({
       location: pos,
       radius: 500,
       type: ['restaurant']
       }, callback);
 
    //The result contains an array of 20 restaurants located nearby the current location 
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
        var marker = new google.maps.Marker({
        map: map,
        position: placeLoc
        });

     //The infowindow displays the restaurants name and address when clicked on it
      google.maps.event.addListener(marker, 'click', function() { 
      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
              place.vicinity+ '<br>');
       infowindow.open(map, this);
       });
 
       }}
 
 
 
