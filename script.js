const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

const location_not_found = document.querySelector(".location-not-found");

const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
  const api_key = "API_KEY_HERE";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    return;
  }

  location_not_found.style.display = "none";
  weather_body.style.display = "flex";
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;

  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

  if (weather_data.weather[0].main === "Clouds") {
    weather_img.src = "/Weather App/images/cloud.png";
  } else if (weather_data.weather[0].main === "Clear") {
    weather_img.src = "/Weather App/images/clear.png";
  } else if (weather_data.weather[0].main === "Rain") {
    weather_img.src = "/Weather App/images/rain.png";
  } else if (weather_data.weather[0].main === "Mist") {
    weather_img.src = "/Weather App/images/mist.png";
  } else if (weather_data.weather[0].main === "Snow") {
    weather_img.src = "/Weather App/images/snow.png";
  } 

  console.log(weather_data);
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
