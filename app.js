const appId = 'a12959532b4e5020f1a5510f4c0cc28e';
const unit = 'imperial';
let searchMethod = '';

function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
        searchMethod = 'zip';
    }else{
        searchMethod = 'q';
    }
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${unit}`)
    .then(function(result){
        return result.json();
    })
    .then(function(result){
        init(result);    
    }) 
}

function init(resultFromServer){
    const backgroundVideo = document.querySelector('.background-video');
    const title = document.querySelector('.title');
    title.style.display = 'none';
    const searchContainer = document.querySelector('.search-container');
    searchContainer.style.top = '120px';
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            backgroundVideo.src = 'clear.mp4';
            break;
        case 'Clouds':
            backgroundVideo.src = 'cloud.mp4';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            backgroundVideo.src = 'rain.mp4';
            break;
        case 'Thunderstorm':
            backgroundVideo.src = 'Storm.mp4';
            break;
        case 'Snow':
            backgroundVideo.src = 'Snowing.mp4';
            break;
        default:
            break;
    }
    const cityName = document.querySelector('#city-header');
    cityName.innerText = resultFromServer.name + ',';

    const country = document.querySelector('#country');
    country.innerText = resultFromServer.sys.country;

    const temperature = document.querySelector('#temperature');
    temperature.innerHTML = 'Temperature: ' + Math.floor(resultFromServer.main.temp) + '&#176';

    const weatherDescription = document.querySelector('#weather-description-header');
    weatherDescription.innerHTML = resultFromServer.weather[0].description;

    const weatherIcon = document.querySelector('#document-icon');
    weatherIcon.src = `http://openweathermap.org/img/wn/${resultFromServer.weather[0].icon}.png`;

    const windSpeed = document.querySelector('#wind-speed');
    windSpeed.innerHTML = `Winds at ${Math.floor(resultFromServer.wind.speed)} m/s`;

    const humidity = document.querySelector('#humidity');
    humidity.innerHTML = `Humidity levels at ${resultFromServer.main.humidity} %`;

    const weatherContainer = document.querySelector('.weather-container');
    weatherContainer.style.visibility = 'visible';
    
}

document.getElementById('search-btn').addEventListener('click', function(){
    const searchTerm = document.getElementById('search-input').value;
    if(searchTerm){
        searchWeather(searchTerm);
    }
})