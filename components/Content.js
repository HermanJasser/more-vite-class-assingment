import { fetchCountries } from '../api/countries.js';
import { fetchWeather } from '../api/weather.js';

export async function createContent() {
  const content = document.createElement('main');
  content.classList.add('content');

  // Fetch and display country data
  const countries = await fetchCountries();
  console.log(countries);

  const countryList = document.createElement('ul');

  // Use for...of loop for asynchronous operations
  for (const country of countries.slice(175, 185)) {
    const li = document.createElement('li');
    const countryDiv = document.createElement('div');
    const tempDiv = document.createElement('div');

    countryDiv.id = "countryDiv";
    tempDiv.id ="tempDiv";

    li.appendChild(countryDiv);
    li.appendChild(tempDiv);
    countryDiv.textContent = country.name.common;

    // Check if the country has capital information with lat/lon
    if (country.capitalInfo && country.capitalInfo.latlng) {
      const [lat, lon] = country.capitalInfo.latlng;

      try {
        // Fetch weather using latitude and longitude
        const weather = await fetchWeather(lat, lon);
        tempDiv.textContent = `Weather: ${
          weather.current_weather.temperature
        }°C`;
      } catch (error) {
        tempDiv.textContent = 'Weather data not available';
      }
    } else {
      tempDiv.textContent = 'Weather data not available for this country.';
    }

    countryList.appendChild(li);
  }

  content.appendChild(countryList);
  return content;
}
