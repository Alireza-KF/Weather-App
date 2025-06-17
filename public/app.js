const docID = document.getElementById.bind(document);

const APIKey = "41fb3c89d18c6ae47c264268701385dd";
const APIUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const search = docID("search");
const searchIcon = docID("SearchIcon");
const WeatherImage = docID("WeatherImage");
const Err = docID("Error");
const WeatherInfo = docID("WeatherInfo");

async function Weather(city) {
    const response = await fetch(APIUrl + city + `&appid=${APIKey}`, { method: "GET" });
    const data = await response.json();
    console.log(data);

    docID("City").innerText = data.name;
    docID("Temp").innerText = Math.round(data.main.temp) + "°C";
    const userLang = navigator.language || navigator.userLanguage || "en-US";
    docID("Date").innerHTML = new Date().toLocaleDateString(userLang, {
        weekday: "long", year: "numeric", month: "long",
        day: "numeric", minute: "2-digit", hour: "2-digit"
    });

    const emojiCodes = {
        "01d": "☀️",
        "01n": "🌙",
        "02d": "🌤️",
        "02n": "🌤️",
        "03d": "☁️",
        "03n": "☁️",
        "04d": "☁️",
        "04n": "☁️",
        "09d": "🌧️",
        "09n": "🌧️",
        "10d": "🌦️",
        "10n": "🌦️",
        "11d": "⛈️",
        "11n": "⛈️",
        "13d": "❄️",
        "13n": "❄️",
        "50d": "🌫️",
        "50n": "🌫️"
    };

    const iconCode = data.weather?.[0]?.icon;
    WeatherImage.textContent = emojiCodes[iconCode] || "❓";

    docID("Description").innerHTML = data.weather?.[0]?.description || "No description available";
    docID("MaxTemp").innerHTML = Math.round(data.main.temp_max) + "°C";
    docID("MinTemp").innerHTML = Math.round(data.main.temp_min) + "°C";
    docID("Humidity").innerHTML = data.main.humidity + "%";
    docID("Wind").innerHTML = data.wind.speed + "km/h";
    docID("Cloudy").innerHTML = data.clouds.all + "%";

}

Weather("tehran");

searchIcon.addEventListener("click", () => {
    checkWeather(searchBox.value);
});