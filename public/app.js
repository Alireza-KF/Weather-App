const $ = id => document.getElementById(id);

const APIKey = "41fb3c89d18c6ae47c264268701385dd";
const APIUrl = city => `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURIComponent(city)}&appid=${APIKey}`;

const emoji = {
    "01d": "☀️", "01n": "🌙", "02d": "🌤️", "02n": "🌤️",
    "03d": "☁️", "03n": "☁️", "04d": "☁️", "04n": "☁️",
    "09d": "🌧️", "09n": "🌧️", "10d": "🌦️", "10n": "🌦️",
    "11d": "⛈️", "11n": "⛈️", "13d": "❄️", "13n": "❄️",
    "50d": "🌫️", "50n": "🌫️"
};

function setUnknown() {
    ["City", "Temp", "Description", "MaxTemp", "MinTemp", "Humidity", "Wind", "Cloudy"].forEach(id => $(id).innerText = "unknown");
    $("Date").innerText = new Date().toLocaleDateString();
    $("WeatherImage").textContent = "❓";
}

async function Weather(city = "Tehran") {
    try {
        const res = await fetch(APIUrl(city));
        if (!res.ok) throw new Error("City not found");
        const d = await res.json();
        const { name, main, wind, clouds, weather } = d;
        const icon = weather?.[0]?.icon ?? "";
        const desc = weather?.[0]?.description ?? "No description";
        const userLang = navigator.language || "en-US";
        $("City").innerText = name ?? "unknown";
        $("Temp").innerText = main?.temp != null ? Math.round(main.temp) + "°C" : "unknown";
        $("Date").innerText = new Date().toLocaleDateString(userLang, {
            weekday: "long", year: "numeric", month: "long",
            day: "numeric", minute: "2-digit", hour: "2-digit"
        });
        $("WeatherImage").textContent = emoji[icon] ?? "❓";
        $("Description").innerText = desc;
        $("MaxTemp").innerText = main?.temp_max != null ? Math.round(main.temp_max) + "°C" : "unknown";
        $("MinTemp").innerText = main?.temp_min != null ? Math.round(main.temp_min) + "°C" : "unknown";
        $("Humidity").innerText = main?.humidity != null ? main.humidity + "%" : "unknown";
        $("Wind").innerText = wind?.speed != null ? wind.speed + "km/h" : "unknown";
        $("Cloudy").innerText = clouds?.all != null ? clouds.all + "%" : "unknown";
    } catch {
        setUnknown();
    }
}

Weather();

$("SearchIcon").onclick = () => Weather($("SearchBox").value.trim());
$("SearchBox").onkeypress = e => {
    if (e.key === "Enter") Weather(e.target.value.trim());
};
