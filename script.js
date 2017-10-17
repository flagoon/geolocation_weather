$(document).ready(function () {

  function getGeoLoc() {
    var coords = {};

    //check if browser can get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        //return lat ang lng as obj
        var lat = 14.57; //pos.coords.latitude;
        var lng = 53.43; //pos.coords.longitude;

        getData(lat, lng);
        //console.log when error happens
      }, function (error) {
        console.log('There was an error: ' + error.message);
      });
    }
  }

  function getData(x, y) {
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + x + '&lon=' + y;
    $.getJSON(url, function (data) {

    });
  }


  getGeoLoc();

  //bootstrap adding/removing active class on links
  $('.nav-link').on('click', function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
  })


  //function to find class that starts with and remove it
  // var classes = $('#sample').attr('class').split(' ');
  // $.each(classes, function (i, c) {
  //   if (c.indexOf('wi-omw-') == 0) {
  //     $('#sample').removeClass(c);
  //   }
  // });

});