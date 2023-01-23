var weatherApi ='https://api.openweathermap.org/data/2.5/weather?q=CITYNAME&appid=1ff1b9e8930bbe84b844222ea3d5a398&units=imperial';
var fiveDay = 'https://api.openweathermap.org/data/2.5/forecast?q=CITYNAME&appid=1ff1b9e8930bbe84b844222ea3d5a398&units=imperial';
var searchBtn = document.getElementById('searchBtn');
var searchBar = document.getElementById('searchBar');
var searchHistory = document.getElementById('searchHistory');
// var todayDate = dayjs().format('MM~D~YYYY');
var todayDate = dayjs();
var locationEl = document.getElementById('location');
var dateEl = document.getElementById('date');
var tempEl = document.getElementById('temp');
var highEl = document.getElementById('high');
var lowEl = document.getElementById('low');
var weatherEl = document.getElementById('weather');
var iconEl = document.getElementById('icon');
var humidityEl = document.getElementById('humidity');
var cardEl = document.getElementById('card');


// puts the current date on the page
dateEl.textContent = todayDate.format('MM~D~YYYY');

// function to make the forecast cards
function makeCards() {
    for (let i = 0; i < 5; i++) {
        var card = document.createElement('div');
        card.setAttribute('class', 'card m-1');
        card.setAttribute('style', 'width: 15rem;');
        cardEl.appendChild(card);
        var ulEl = document.createElement('ul');
        ulEl.setAttribute('class', 'list-group list-group-flush')
        ulEl.innerHTML = 
        `   <li id="forecastDate" class="list-group-item"></li>
            <li id="forecastIcon" class="list-group-item"></li> 
            <li id="weatherType" class="list-group-item"></li>
            <li id="forecastTemp" class="list-group-item"></li> 
            <li id="forecastHumi" class="list-group-item"></li> `;
        card.appendChild(ulEl);
        // console.log
    }
}

// takes the value use typed and pushes that value to the next fuctions
function getCityName(event) {
    event.preventDefault();
    var city = searchBar.value;

    // makes sure an empty button isn't created if nothing in typed
    if (city == '') {
        return ;
    } else {
        cityWeather(city);
        cityForecast(city);
    }
};

// takes the value from getCityName and gets the data for that city
function cityWeather(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=1ff1b9e8930bbe84b844222ea3d5a398&units=imperial').then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data)
        var cityName = data.name;
        var previous = document.createElement('p');
        previous.setAttribute('class', 'btn col-12');
        previous.textContent =  cityName;
        searchHistory.appendChild(previous);
        
        var temp = data.main.temp;
        var high = data.main.temp_max;
        var low = data.main.temp_min;
        var humidity = data.main.humidity;
        var description = data.weather[0].description;
        var icon = data.weather[0].icon;
        
        // takes the data we targeted with vars and plugs it on the page
        locationEl.textContent = cityName;
        tempEl.textContent = 'Currently: ' + temp + '°F';
        highEl.textContent = high + '°F';
        lowEl.textContent = low + '°F';
        weatherEl.textContent = description;
        iconEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon + '@2x.png');
        iconEl.setAttribute('style', 'width: 40%')
        humidityEl.textContent = humidity + '%';
    })
};

// takes the value from getCityName and gets the forecast for that city
function cityForecast(city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=1ff1b9e8930bbe84b844222ea3d5a398&units=imperial').then(function(response){
        return response.json()
    }).then(function(data) {
        // console.log(data)
    })
}

// When the page loads, the location will auto set to Atlanta
function defaultWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=1ff1b9e8930bbe84b844222ea3d5a398&units=imperial').then(function(response) {
        return response.json()
    }).then(function(data) {
        var location = data.name;
        var temp = data.main.temp;
        var high = data.main.temp_max;
        var low = data.main.temp_min;
        var humidity = data.main.humidity;
        var description = data.weather[0].description;
        var icon = data.weather[0].icon;
        
        locationEl.textContent = location;
        tempEl.textContent = 'Currently: ' + temp + '°F';
        highEl.textContent = 'High: ' + high + '°F';
        lowEl.textContent = 'Low: ' + low + '°F';
        weatherEl.textContent = description;
        iconEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon + '@2x.png');
        iconEl.setAttribute('style', 'width: 40%')
        humidityEl.textContent = humidity + '%';
    })
}

// When the page loaded the forecast will be set to Atlanta
function defaultForecast() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Atlanta&appid=1ff1b9e8930bbe84b844222ea3d5a398&units=imperial').then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
        
        var forecastDateEl = document.getElementById('forecastDate');
        var forecastDate = todayDate.add(1, 'day').format('MM~D~YYYY');
        forecastDateEl.textContent = forecastDate;

        var forecastTempEL = document.getElementById('forecastTemp');
        var forecastTemp = data.list[6].main.temp;
        forecastTempEL.textContent = forecastTemp;

        
    })
}

searchBtn.addEventListener('click', getCityName);
defaultWeather();
defaultForecast();
makeCards();

// 0, 8, 16, 24, 32
// 6, 14, 22, 30, 38
// data.list[].main.temp