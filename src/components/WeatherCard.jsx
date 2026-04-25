import React from 'react';
import { CloudRain, Wind, Droplets, Thermometer, MapPin, Calendar } from 'lucide-react';
import './WeatherCard.css';

const WeatherCard = ({ data, city, dateLabel }) => {
  if (!data) return null;

  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const humidity = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed * 3.6); // m/s to km/h

  return (
    <div className="weather-card glass-panel-dark animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="card-header">
        <div className="location">
          <MapPin size={24} />
          <h2>{city}</h2>
        </div>
        <div className="date-badge">
          <Calendar size={16} />
          <span>{dateLabel}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="main-weather">
          <img 
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`} 
            alt={description} 
            className="weather-icon"
          />
          <div className="temp-container">
            <h1 className="temperature">{temp}°</h1>
            <p className="description">{description.charAt(0).toUpperCase() + description.slice(1)}</p>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <Thermometer className="detail-icon" />
            <div className="detail-info">
              <span className="label">Hissedilen</span>
              <span className="value">{feelsLike}°C</span>
            </div>
          </div>
          <div className="detail-item">
            <Droplets className="detail-icon" />
            <div className="detail-info">
              <span className="label">Nem</span>
              <span className="value">%{humidity}</span>
            </div>
          </div>
          <div className="detail-item">
            <Wind className="detail-icon" />
            <div className="detail-info">
              <span className="label">Rüzgar</span>
              <span className="value">{windSpeed} km/s</span>
            </div>
          </div>
          <div className="detail-item">
            <CloudRain className="detail-icon" />
            <div className="detail-info">
              <span className="label">Olasılık</span>
              <span className="value">%{Math.round((data.pop || 0) * 100)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
