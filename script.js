
const button = document.getElementById("get-weather");
const statusText = document.getElementById("status");
const temperature = document.getElementById("temperature");
const details = document.getElementById("details");

button.addEventListener("click", getWeather);

async function getWeather() {
  statusText.textContent = "Loading weather...";
  button.disabled = true;

  const url =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=27.7172&longitude=85.324" +
    "&current=temperature_2m,relative_humidity_2m," +
    "apparent_temperature,weather_code,wind_speed_10m";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("The weather service returned an error.");
    }

    const data = await response.json();
    const current = data.current;

    temperature.textContent =
      `${current.temperature_2m} °C`;

    details.textContent =
      `Feels like ${current.apparent_temperature} °C | ` +
      `Humidity ${current.relative_humidity_2m}% | ` +
      `Wind ${current.wind_speed_10m} km/h`;

    statusText.textContent = "Weather loaded successfully!";
  } catch (error) {
    statusText.textContent =
      "Could not load weather. Check your internet and try again.";

    console.error(error);
  } finally {
    button.disabled = false;
  }
}
