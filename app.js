window.addEventListener('load', () => {
    //After page loads, function runs

    //Variables for longitute and latitiude
    let long;
    let lat;

    //Varibles for HTML elements
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');




    /*If geolocation exists in the browser and the user accepts location services, then we can find the excat location of the user. Else display h1 message*/
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //Sets long and lat to the users longitute and latitude.
            
             const proxy = 'http://cors-anywhere.herokuapp.com/';
             //Allows API to work on localhost
             const api = `${proxy}https://api.darksky.net/forecast/dda58c2930ba4c04b8f1c4dc1c581d90/${lat},${long}?units=auto`;
            /*Forecast API from darksky.net. Removed the actual longitude and latitude from the end of the link and
            added in my long and lat variables*/


            /*GET request to get information from API url. Fetch api information, then take response and convert it to JSON. */
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {
                        temperature,
                        summary,
                        icon
                    } = data.currently;
                    //Pulls the data you want from currently (console)
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Set HTML DOM elements to the data you pulled from 'currently'
                    setIcons(icon, document.querySelector(".icon"));
                    //Set icons
                })
        });
    }

    //Set skycons icons
    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        /*Looks for evevry dash in the API icon naming, and replaces it with an underscore. So that the icons in API and skycon have consistent naming. Then uppercases it to match skycon e.g PARTLY_CLOUDY*/
        skycons.play();
        //Animates the icons
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
