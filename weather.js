"use strict";

searchButton.addEventListener('click',searchWeather);

function searchWeather(){
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
    var cityName = searchCity.value;
    if(cityName.trim().length == 0){
        return alert('Please enter a City Name')
    }
    var http = new XMLHttpRequest();
    var apiKey ='40972db11eb2aa960d3c07e92c8dbed3';
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName.trim() + '&units=metric&appid=' + apiKey;
    var method ='GET';

http.open(method, url);
http.onreadystatechange= function (){
    if(http.readyState == XMLHttpRequest.DONE && http.status === 200){
        var data = JSON.parse(http.responseText);
        var WeatherData = new Weather(cityName,data.weather[0].description.toUpperCase());
        WeatherData.temperature = data.main.temp;
      updateWeather(WeatherData);
    }else if (http.readyState === XMLHttpRequest.DONE){
    alert('Something went wrong');

}
};
http.send();
}
function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;
    
    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}