
   let apiKey = "e018f708a463a6260bcf5f6e841f2e71";
   let units = "metric";
   let searchMethod;

    async function searchWeather(inputSearch){

       if(typeof parseInt(inputSearch) == "number" && parseInt(inputSearch) > 4){
           searchMethod = "zip"
       }else if (typeof inputSearch == "string") {
           searchMethod = "q";
       }

       let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${inputSearch}&appid=${apiKey}&units=${units}`);
       let data = await response.json();
       getWeather(data);
       console.log(data);
       //console.log(data.weather[0].main);

       // Fetch and use of .then, same thing with the above code
       // fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${apiKey}&units=${units}`)
       //     .then(result => {
       //          return result.json();
       //     }).then( result => {
       //        console.log(result);
       // })
   }

     document.getElementById("searchBtn").addEventListener("click", function(){
         let searchInput = document.getElementById("searchInput").value;

         if(searchInput.length > 0){
             let weatherContainer = document.getElementById("weatherContainer");
             weatherContainer.style.display = "block";
             searchWeather(searchInput);
         }
    });

    function getWeather(data){
        switch (data.weather[0].main){

            case 'Clear':
                document.body.style.backgroundImage = "url(img/clear.jpeg)"
                break;

            case 'Clouds'  :
                document.body.style.backgroundImage = "url(img/cloudy.jpeg)"
                break;

            case 'Rain':
            case 'Drizzle':
            case 'Mist':
                document.body.style.backgroundImage = "url(img/rain.jpg)"
                break;

            case 'Thunderstorm':
                document.body.style.backgroundImage = "url(img/thunderstorm.jpeg)"
                break;

            case 'Snow':
                document.body.style.backgroundImage = "url(img/snow.jpeg)"
                break;
        }

        let weatherDescription = document.getElementById("weatherDescription");
        let temperature = document.getElementById("temperature");
        let humidity = document.getElementById("humidity");
        let windSpeed = document.getElementById("windSpeed");
        let cityHeader = document.getElementById("cityHeader");
        let weatherIcon = document.getElementById("documentIconImg");
        let feelsLike = document.getElementById("feelsLike");
        let time = document.getElementById("time");

        weatherIcon.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';

        weatherDescription.innerText = capitalizeFirstLetter(data.weather[0].description);
        temperature.innerText = + Math.floor(data.main.temp) + '°';
        windSpeed.innerText = ' Winds at ' + Math.floor(data.wind.speed) + 'm/s';
        cityHeader.innerText = data.name;
        humidity.innerText = ' Humidity levels at ' + data.main.humidity + "%";
        feelsLike.innerText = 'Feels like ' + data.main.feels_like;
        time.innerText = currentTime();

    }

   function capitalizeFirstLetter(string) {
       return string.charAt(0).toUpperCase() + string.slice(1);
   }

   function currentTime(){
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        return hours + ":" + minutes;
   }







