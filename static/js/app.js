const LOCATION_DISPLAY = "locationDisplay";
const WEATHER_DISPLAY = "weatherDisplay";

let weatherData;
const displayElements = {};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locationObtained);
  } else {
    console.error("Browser does not support Geolocation")
  }
}

function locationObtained(position) {
  console.log("Current location", position);

  let data = {
    lat: position.coords.latitude,
    lon: position.coords.longitude
  }

  console.log(`Calling Ajax POST /api/weather`);
  $.ajax({
    url: "/api/weather",
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (res) {
      console.log("Server response", res);
      weatherData = res;
      displayWeatherData();
    },
    error: function (details) {
      console.error("Error ", details);
    }
  })
}

function displayWeatherData() {
  console.log("displaying weather data");
  const locationDisplay = displayElements[LOCATION_DISPLAY];
  const weatherDisplay = displayElements[WEATHER_DISPLAY];
  const longitude = weatherData.lon;
  const latitude = weatherData.lat;
  const timezone = weatherData.timezone;
  const clouds = weatherData.current.clouds;
  const temp = weatherData.current.temp;
  const humidity = weatherData.current.humidity;
  const pressure = weatherData.current.pressure;
  const description = weatherData.current.weather[0].description;

  locationDisplay.innerHTML = `
    <h2>Location</h2>
    <p>Longtitude : ${longitude}</p>
    <p>Latitude : ${latitude}</p>
    <p>Timezone : ${timezone}
  `;

  weatherDisplay.innerHTML = `
    <h2>${description}</h2>
    <p>🌡️ ${temp} &#8451;</p>
    <p>☁️ ${clouds} %</h2>
    <p>Humidity : ${humidity} %</p>
    <p>Pressure: ${pressure} mb</p>
  `;
}

function init() {
  console.log("Flask page");
  getLocation();
  displayElements[LOCATION_DISPLAY] = document.getElementById(LOCATION_DISPLAY);
  displayElements[WEATHER_DISPLAY] = document.getElementById(WEATHER_DISPLAY);
}

window.onload = init;