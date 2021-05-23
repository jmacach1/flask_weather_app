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
      weather_data = res;
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
  const data = weatherData;
  locationDisplay.innerHTML = `
  <pre>${data}</pre>
  `;
}

function init() {
  console.log("Flask page");
  getLocation();
  displayElements[LOCATION_DISPLAY] = document.getElementById(LOCATION_DISPLAY);
  displayElements[WEATHER_DISPLAY] = document.getElementById(WEATHER_DISPLAY);
}

window.onload = init;