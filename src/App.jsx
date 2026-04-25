import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import BackgroundManager from './components/BackgroundManager';
import { fetchWeatherForecast, getForecastForDate } from './services/weather';
import { Compass } from 'lucide-react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchCity, setSearchCity] = useState('');
  const [searchDateLabel, setSearchDateLabel] = useState('');

  const handleSearch = async (city, date) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const forecastData = await fetchWeatherForecast(city);
      const specificData = getForecastForDate(forecastData, date);

      if (specificData) {
        setWeatherData(specificData);
        setSearchCity(city);

        // Format date label for display
        const d = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffTime = Math.abs(d - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let label = d.toLocaleDateString('tr-TR');
        if (diffDays === 0) label = "Bugün";
        else if (diffDays === 1) label = "Yarın";

        setSearchDateLabel(label);
      } else {
        setError('Bu tarih için hava durumu verisi bulunamadı.');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Şehir bulunamadı. Lütfen geçerli bir şehir ismi girin.');
      } else {
        setError('Veri çekilirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  const weatherMain = weatherData ? weatherData.weather[0].main : null;

  return (
    <>
      <BackgroundManager weatherMain={weatherMain} />

      <div className="app-container">
        <header className="app-header animate-fade-in">
          <div className="logo-container">
            <Compass size={40} className="logo-icon" />
            <h1>Weather and Travel</h1>
          </div>
          <p className="subtitle">Bir sonraki maceranız için hava durumunu keşfedin</p>
        </header>

        <main className="app-main">
          <SearchBar onSearch={handleSearch} />

          {loading && (
            <div className="loading-state animate-fade-in">
              <div className="spinner"></div>
              <p>Hava durumu bilgileri getiriliyor...</p>
            </div>
          )}

          {error && (
            <div className="error-state glass-panel animate-fade-in">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && weatherData && (
            <WeatherCard
              data={weatherData}
              city={searchCity}
              dateLabel={searchDateLabel}
            />
          )}

          {!loading && !error && !weatherData && (
            <div className="empty-state animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Compass size={64} className="empty-icon" />
              <p>Hava durumunu öğrenmek için bir şehir arayın.</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
