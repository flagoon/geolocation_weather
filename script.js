$(document).ready(function () {

  //function to add eventListeners to not existing (yet) elements
  document.querySelector('body').addEventListener('click', function (e) {
    if (e.target.classList.contains('city-result')) {

      //regex to extract city name, regex matches all polish signs, (), space and -
      var cityName = e.target.innerHTML.match(/[a-ząęćśźżłóń()\- ]+(?=\<)/gi);
      $('#city-name').text(cityName[0]);

      //regex to match every latitude and longitude value and asign it to array
      var arr = e.target.innerHTML.match(/(\d\d\.\d\d*)/g);

      //get data from weather api
      getData(arr[0], arr[1], cityName);
    }
  });

  //get starting location for weather
  getGeoLoc();

  //this function gets longitude and latitude from browser, quite inaccurate
  function getGeoLoc() {

    //check if browser can get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (pos) {
        //get lat ang lng as obj
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;

        getData(lat, lng);
        //alert when error happens
      }, function (error) {
        alert('There was an error: ' + error.message);
      });
    }
  }


  /*
  this function gets data from weather api. value name is optional. If not given, 
  it's taken automaticly from api. It was inaccurate, and when choosing cities manualy,
  values were different (ie. choosing Krakow gave value Srodmiescie). That's why when
  choose from city list, it change name correctly.
  */
  function getData(x, y, name) {

    //creating url to api
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + x + '&lon=' + y;
    var dayOrNight = '',
      sunrise = '',
      sunset = '',
      timeNow = '';

    $.getJSON(url, function (data) {
      
      //if name is not given in atributes
      if (!name) {
        $('#city-name').text(data.name);
      }

      //decide if the icon will be day or night variety
      //added '000' because api is giving timestamp without miliseconds and current time is with it, 
      //therefore it's always bigger, always night time :)
      sunrise = data.sys.sunrise + '000';
      sunset = data.sys.sunset + '000';
      timeNow = new Date().getTime();

      if ((timeNow > sunrise) && (timeNow < sunset)) {
        dayOrNight = 'day';
      } else {
        dayOrNight = 'night';
      }

      //removing icon class
      removeIcon();
      //creating icon class and adding it
      $('.main-weather-icon').addClass('wi-owm-' + dayOrNight + '-' + data.weather[0].id);
      $('#temp').text(data.main.temp + '°');
      $('#humidity').text(data.main.humidity + '%');
      $('#pressure').text(data.main.pressure);
    });
  }

  /*
  this function selects element's class list, and then, thanks to foreach(), check for the 
  specific string and then deletes the class. It's doing more, than needed, removing all classes
  */
  function removeIcon() {
    var classes = document.querySelector('.main-weather-icon').classList;
    classes.forEach(function (value) {
      if (value.indexOf('wi-owm-') == 0) {
        classes.remove(value);
      }
    });
  }

  //bootstrap adding/removing active class on links, somehow it didn't work
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
      //send city name to function that is looking for specific string in database
      showCities($('#city-input').val());
    }
  });
});