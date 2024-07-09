document.getElementById('search-button').addEventListener('click', fetchWeatherData);

async function fetchWeatherData() {
  const location = document.getElementById('location-input').value;
  const apiKey = '5ca865b729e74d47891200141210410'; // Replace with your WeatherAPI key
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;

  const weatherDataContainer = document.getElementById('weather-data');
  weatherDataContainer.innerHTML = '<p>Loading...</p>';

  if (!location) {
    weatherDataContainer.innerHTML = '<p>Please enter a location.</p>';
    return;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    console.error('Fetch error:', error);
    weatherDataContainer.innerHTML = `<p>Failed to fetch data: ${error.message}</p>`;
  }
}

function displayWeatherData(data) {
  const weatherDataContainer = document.getElementById('weather-data');
  weatherDataContainer.innerHTML = `
    <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
    <div class="weather-item">
      <strong>Current Temperature:</strong> ${data.current.temp_c}°C
    </div>
    <div class="weather-item">
      <strong>Condition:</strong> ${data.current.condition.text}
      <img src="https:${data.current.condition.icon}" alt="weather icon">
    </div>
    <div class="weather-item">
      <strong>Humidity:</strong> ${data.current.humidity}%
    </div>
    <h3>3-Day Forecast:</h3>
  `;

  data.forecast.forecastday.forEach(day => {
    weatherDataContainer.innerHTML += `
      <div class="weather-item">
        <strong>Date:</strong> ${day.date}
      </div>
      <div class="weather-item">
        <strong>Max Temp:</strong> ${day.day.maxtemp_c}°C
      </div>
      <div class="weather-item">
        <strong>Min Temp:</strong> ${day.day.mintemp_c}°C
      </div>
      <div class="weather-item">
        <strong>Condition:</strong> ${day.day.condition.text}
        <img src="https:${day.day.condition.icon}" alt="weather icon">
      </div>
    `;
  });
}
