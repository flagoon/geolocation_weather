$(document).ready(function () {

  //function to add eventListeners to not existing (yet) elements
  document.querySelector('body').addEventListener('click', function (e) {
    if (e.target.classList.contains('city-result')) {

      //regex to match every latitude and longitude value and asign it to array
      var arr = e.target.innerHTML.match(/(\d\d\.\d\d*)/g);

      //get data from weather api
      getData(arr[0], arr[1]);
    }
  });

  getGeoLoc();

  function getGeoLoc() {

    //check if browser can get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        //return lat ang lng as obj
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;

        getData(lat, lng);
        //alert when error happens
      }, function (error) {
        alert('There was an error: ' + error.message);
      });
    }
  }

  function getData(x, y) {
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + x + '&lon=' + y;
    $.getJSON(url, function (data) {
      console.log(data);
    });
  }

  //bootstrap adding/removing active class on links
  $('.nav-link').on('click', function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
  })


  /*
  this function sends input value to find-city.php page and looks for similar word
  if found, creates list of cities user can press. If result from database is 0 or 
  too big (more than 10), it returns a warning text.
  */

  function showCities(city) {
    if (city == '') {
      document.getElementById('data').innerHTML = '';
      return;
    }
    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      var xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
      var xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById('data').innerHTML = this.responseText;
      }
    }
    xmlhttp.open('GET', 'find_city.php?city=' + city, true);
    xmlhttp.send();
  }

  //added event to submit button
  $('#city-button').click(function (e) {
    e.preventDefault();
    //check if input is empty, if so, location is set by navigator.geolocation
    if ($('#city-input').val() === '') {
      getGeoLoc();
    } else {
      showCities($('#city-input').val());
    }
  });

  //function to find class that starts with and remove it
  // var classes = $('#sample').attr('class').split(' ');
  // $.each(classes, function (i, c) {
  //   if (c.indexOf('wi-omw-') == 0) {
  //     $('#sample').removeClass(c);
  //   }
  // });

});