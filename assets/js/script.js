var weatherApi ='https://api.openweathermap.org/data/2.5/weather?q=CITYNAME&appid=1ff1b9e8930bbe84b844222ea3d5a398';
var fiveDay = 'https://api.openweathermap.org/data/2.5/forecast?q=CITYNAME&appid=1ff1b9e8930bbe84b844222ea3d5a398';
var searchBtn = document.getElementById('searchBtn');
var searchBar = document.getElementById('searchBar');
var searchHistory = document.getElementById('searchHistory')

function getCityName(event) {
    event.preventDefault();
    console.log('hi');
    var city = searchBar.value;
    curentWeather(city)
};

function curentWeather(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=1ff1b9e8930bbe84b844222ea3d5a398').then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
        var cityName = data.name;
        var previous = document.createElement('p');
        previous.setAttribute('class', 'btn col-12');
        previous.textContent =  cityName;
        searchHistory.appendChild(previous);
    })
};

function forecast(city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=1ff1b9e8930bbe84b844222ea3d5a398')
}

function defaultWeather(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Atlant&appid=1ff1b9e8930bbe84b844222ea3d5a398').then(function(response) {
        return response.json
    }).then(function(data) {
        console.log(data);
    })
}

searchBtn.addEventListener('click', getCityName);
defaultWeather();