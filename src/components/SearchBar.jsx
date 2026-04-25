import React, { useState, useEffect } from 'react';
import { Search, Calendar } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    // Generate the next 5 dates for the dropdown
    const dates = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateString = d.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      let label = '';
      if (i === 0) label = `Bugün (${dateString})`;
      else if (i === 1) label = `Yarın (${dateString})`;
      else label = `${d.toLocaleDateString('tr-TR', { weekday: 'long' })} (${dateString})`;

      dates.push({ value: dateString, label });
    }
    setAvailableDates(dates);
    setDate(dates[0].value); // Default to today
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      triggerSearch();
    }
  };

  const triggerSearch = () => {
    if (city.trim() !== '') {
      onSearch(city, date);
    }
  };

  return (
    <div className="search-bar-container glass-panel animate-fade-in">
      <div className="input-group">
        <Search className="icon" size={20} />
        <input 
          type="text" 
          placeholder="Gideceğiniz şehri girin..." 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
      <div className="divider"></div>
      <div className="input-group">
        <Calendar className="icon" size={20} />
        <select 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          onKeyDown={handleKeyDown}
        >
          {availableDates.map(d => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>
      <button className="search-btn" onClick={triggerSearch}>
        Keşfet
      </button>
    </div>
  );
};

export default SearchBar;
