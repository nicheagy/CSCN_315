// OpenWeather API: https://openweathermap.org/api
// Endpoint: https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_key}&units=metric
// Fetches current weather data for a specified city (e.g., New York).
// Returns data like temperature, weather description, and icon.

//  OpenWeather API key
const API_KEY = '222ef64b6da54969d41d81d24aed4c22';
const CITY = 'Charlotte'; // You can change this to any city

// Function to display weather data in the UI
function displayWeather(data) {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = ''; // Clear previous content

    const weatherCard = document.createElement('div');
    weatherCard.className = 'weather-card';

    // Weather icon (provided by OpenWeather)
    const icon = document.createElement('img');
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    icon.alt = 'Weather icon';

    // City and temperature
    const city = document.createElement('h3');
    city.textContent = `${data.name}, ${data.sys.country}`;

    const temp = document.createElement('p');
    temp.textContent = `Temperature: ${data.main.temp}°C`;

    // Weather description
    const description = document.createElement('p');
    description.textContent = `Weather: ${data.weather[0].description}`;

    // Humidity
    const humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    // Append elements to card
    weatherCard.appendChild(icon);
    weatherCard.appendChild(city);
    weatherCard.appendChild(temp);
    weatherCard.appendChild(description);
    weatherCard.appendChild(humidity);
    weatherContainer.appendChild(weatherCard);
}

// Function to display error message
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Function to hide error message
function hideError() {
    const errorDiv = document.getElementById('error-message');
    errorDiv.classList.add('hidden');
}

// --- Fetch Request ---
// Modern, promise-based API for HTTP requests.
// Cleaner syntax, supports JSON parsing, and integrates with async/await.
function fetchWeather() {
    hideError(); // Clear any previous errors

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid API key. Please check your OpenWeather API key.');
                } else if (response.status === 404) {
                    throw new Error('City not found. Please try another city.');
                } else {
                    throw new Error('Failed to fetch weather data. Please try again later.');
                }
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            showError(error.message || 'An error occurred while fetching weather data.');
        });
}

// --- XMLHttpRequest Request ---
// Older, callback-based API for HTTP requests.
// More verbose, requires manual JSON parsing, but reliable for legacy use.
/*function fetchWeatherWithXHR() {
    hideError(); // Clear any previous errors

    const xhr = new XMLHttpRequest();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;
    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText);
                displayWeather(data);
            } catch (e) {
                showError('Error parsing weather data.');
            }
        } else {
            let message = 'Failed to fetch weather data. Please try again later.';
            if (xhr.status === 401) {
                message = 'Invalid API key. Please check your OpenWeather API key.';
            } else if (xhr.status === 404) {
                message = 'City not found. Please try another city.';
            }
            showError(message);
        }
    };

    xhr.onerror = function () {
        showError('An error occurred while fetching weather data.');
    };

    xhr.send();
}*/

// Initialize by calling fetchWeather (using Fetch API by default)
// Comment out and uncomment fetchWeatherWithXHR() to test XMLHttpRequest
document.addEventListener('DOMContentLoaded', fetchWeather);
// document.addEventListener('DOMContentLoaded', fetchWeatherWithXHR);

/*
Differences between Fetch and XMLHttpRequest:
1. **Syntax**:
   - Fetch uses Promises, enabling concise chaining (.then, .catch) and async/await.
   - XMLHttpRequest uses callbacks (onload, onerror), making it more verbose.
2. **Error Handling**:
   - Fetch only rejects on network errors; HTTP errors (e.g., 404, 401) require manual checks (response.ok).
   - XMLHttpRequest handles HTTP errors via status codes in the onload callback.
3. **JSON Parsing**:
   - Fetch provides a .json() method for easy parsing.
   - XMLHttpRequest requires manual JSON.parse().
4. **Modernity**:
   - Fetch is modern, widely adopted, and supports advanced features like streaming.
   - XMLHttpRequest is older, mainly used for legacy browser support.
5. **Features**:
   - Fetch supports AbortController for canceling requests.
   - XMLHttpRequest has broader compatibility with very old browsers.

For this project, Fetch is preferred due to its simplicity and modern features.
XMLHttpRequest is included to demonstrate the alternative as requested.
*/