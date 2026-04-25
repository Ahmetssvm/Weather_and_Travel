import axios from 'axios';

const API_KEY = '97c97e3b8f0905287498f237dc98ebb1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches the 5-day forecast for a given city.
 * @param {string} city - The name of the city.
 * @returns {Promise<Object>} The weather forecast data.
 */
export const fetchWeatherForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Use Celsius
        lang: 'tr', // Turkish language for description
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Gets the closest forecast for a specific date from the 5-day forecast data.
 * @param {Object} forecastData - The data returned by fetchWeatherForecast.
 * @param {string} targetDate - The target date in YYYY-MM-DD format.
 * @returns {Object|null} The closest forecast item or null if not found.
 */
export const getForecastForDate = (forecastData, targetDate) => {
  if (!forecastData || !forecastData.list) return null;

  // Find all forecasts that match the target date
  const forecastsForDate = forecastData.list.filter(item => {
    // item.dt_txt format is "YYYY-MM-DD HH:MM:SS"
    return item.dt_txt.startsWith(targetDate);
  });

  if (forecastsForDate.length === 0) {
    return null; // Date not found in 5-day forecast
  }

  // Ideally, pick the forecast around noon (12:00:00)
  const noonForecast = forecastsForDate.find(item => item.dt_txt.includes('12:00:00'));
  
  return noonForecast || forecastsForDate[0]; // Fallback to the first available time of that day
};
