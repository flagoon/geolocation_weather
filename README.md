This is a challenge from Free Code Camp you can find here: https://www.freecodecamp.org/challenges/show-the-local-weather

The API we were going to use was placed here: https://fcc-weather-api.glitch.me/

Unfortunately I had to made some improvements, because using navigator.geolocation puts me 400km away from my computer, in Warsaw. To make it better, I found list of bigger Polish cities with latitude and longitude, convert coords from degrees/minutes/seconds to decimal degrees, put it in mysql and write easy PHP script to get this data on my website using AJAX.

Now, after entering the website, user has his 'local' weather, but if he is not pleased, he can put name in input, and choose city from list.

I used:
Bootstrap
Weather Icons: https://erikflowers.github.io/weather-icons/
SASS
JS, JQUERY, PHP, HTML

Working project here: http://flagoon.ayz.pl/programowanie/geolocation/

DISCLAIMER: as I don't have server with SSL, geolocation is not working. As a fast workaround I made default location to Szczecin Poland. Rest of functionality works as intendet.
