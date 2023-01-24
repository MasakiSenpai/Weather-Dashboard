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

function displayWeatherIcon(appendEl, iconCode){
    var imgEl = document.createElement("img");
    imgEl.src = `http://openweathermap.org/img/wn/${iconCode}.png`
    appendEl.appendChild(imgEl);
}

// function to make the forecast cards
function makeCards() {
    cardEl.innerHTML = '';
    // console.log(cardEl);
    for (let i = 0; i < 5; i++) {
        var card = document.createElement('div');
        // card.id = `card${i}`
        card.setAttribute('class', 'card m-1');
        card.setAttribute('style', 'width: 15rem;');
        cardEl.appendChild(card);
        var ulEl = document.createElement('ul');
        ulEl.setAttribute('class', 'list-group list-group-flush')
        ulEl.innerHTML = 
        `   <li id="forecastDate${i}" class="list-group-item"></li>
            <li id="forecastIcon${i}" class="list-group-item"></li> 
            <li id="weatherType${i}" class="list-group-item"></li>
            <li id="forecastTemp${i}" class="list-group-item"></li> 
            <li id="forecastHumi${i}" class="list-group-item"></li> `;
        card.appendChild(ulEl);
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
        console.log(data)
        makeCards();

        // var forecastDateEl = document.getElementById(`forecastDate${0}`);
        // var forecastDateEl1 = document.getElementById(`forecastDate${1}`);
        // var forecastDateEl2 = document.getElementById(`forecastDate${2}`);
        // var forecastDateEl3 = document.getElementById(`forecastDate${3}`);
        // var forecastDateEl4 = document.getElementById(`forecastDate${4}`);

        // var forecastDate = todayDate.add(1, 'day').format('MM~D~YYYY');
        // var forecastDate1 = todayDate.add(2, 'day').format('MM~D~YYYY');
        // var forecastDate2 = todayDate.add(3, 'day').format('MM~D~YYYY');
        // var forecastDate3 = todayDate.add(4, 'day').format('MM~D~YYYY');
        // var forecastDate4 = todayDate.add(5, 'day').format('MM~D~YYYY');

        // forecastDateEl.textContent = forecastDate;
        // forecastDateEl1.textContent = forecastDate1;
        // forecastDateEl2.textContent = forecastDate2;
        // forecastDateEl3.textContent = forecastDate3;
        // forecastDateEl4.textContent = forecastDate4;

        // // console.log(data.list[6].weather[0].icon);
        // displayWeatherIcon(forecastIcon0, data.list[6].weather[0].icon);
        // displayWeatherIcon(forecastIcon1, data.list[14].weather[0].icon);
        // displayWeatherIcon(forecastIcon2, data.list[22].weather[0].icon);
        // displayWeatherIcon(forecastIcon3, data.list[30].weather[0].icon);
        // displayWeatherIcon(forecastIcon4, data.list[38].weather[0].icon);
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
        makeCards();
        // filling in the date for each card in the forecast
        var forecastDateEl = document.getElementById(`forecastDate${0}`);
        var forecastDateEl1 = document.getElementById(`forecastDate${1}`);
        var forecastDateEl2 = document.getElementById(`forecastDate${2}`);
        var forecastDateEl3 = document.getElementById(`forecastDate${3}`);
        var forecastDateEl4 = document.getElementById(`forecastDate${4}`);

        var forecastDate = todayDate.add(1, 'day').format('MM~D~YYYY');
        var forecastDate1 = todayDate.add(2, 'day').format('MM~D~YYYY');
        var forecastDate2 = todayDate.add(3, 'day').format('MM~D~YYYY');
        var forecastDate3 = todayDate.add(4, 'day').format('MM~D~YYYY');
        var forecastDate4 = todayDate.add(5, 'day').format('MM~D~YYYY');

        forecastDateEl.textContent = forecastDate;
        forecastDateEl1.textContent = forecastDate1;
        forecastDateEl2.textContent = forecastDate2;
        forecastDateEl3.textContent = forecastDate3;
        forecastDateEl4.textContent = forecastDate4;

        // filling in the icon for the forecast
        displayWeatherIcon(forecastIcon0, data.list[6].weather[0].icon);
        displayWeatherIcon(forecastIcon1, data.list[14].weather[0].icon);
        displayWeatherIcon(forecastIcon2, data.list[22].weather[0].icon);
        displayWeatherIcon(forecastIcon3, data.list[30].weather[0].icon);
        displayWeatherIcon(forecastIcon4, data.list[38].weather[0].icon);

        // filling in the forecast weather type
        var weatherType = document.getElementById(`weatherType${0}`);
        var weatherType1 = document.getElementById(`weatherType${1}`);
        var weatherType2 = document.getElementById(`weatherType${2}`);
        var weatherType3 = document.getElementById(`weatherType${3}`);
        var weatherType4 = document.getElementById(`weatherType${4}`);

        weatherType.textContent = data.list[6].weather[0].description;
        weatherType1.textContent = data.list[14].weather[0].description;
        weatherType2.textContent = data.list[22].weather[0].description;
        weatherType3.textContent = data.list[30].weather[0].description;
        weatherType4.textContent = data.list[38].weather[0].description;
    

        // var num = 6;
        // for (let i = 0; i < 5; i++) {


        //     // var cardInfo = document.getElementById(`card${i}`)
        //     let forecastDateEl = document.getElementById(`forecastDate${i}`);
        //     let forecastDate = todayDate.add(i++, 'day').format('MM~D~YYYY');
        //     forecastDateEl.textContent = forecastDate;
        //     console.log(forecastDate);

        //     let forecastTempEL = document.getElementById(`forecastTemp${i}`);
        //     let forecastTemp = data.list[num].main.temp;
        //     forecastTempEL.textContent = forecastTemp;
            
        //     let forecastHumiEL = document.getElementById(`forecastHumi${i}`);
        //     let forecastHumi = data.list[num].main.humidity;
        //     forecastHumiEL.textContent = forecastHumi;
        //     num += 8;
        // }
    })
}

searchBtn.addEventListener('click', getCityName);
defaultWeather();
defaultForecast();
// makeCards();

// 0, 8, 16, 24, 32
// 6, 14, 22, 30, 38
// data.list[].main.temp