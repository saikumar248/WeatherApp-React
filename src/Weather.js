import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const API_KEY = "rwl0GTkCWVEoTRdxviq6QnvoDt39gZmQ";

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&apikey=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <h2>Weather App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={handleLatitudeChange}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={handleLongitudeChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          {/* Display weather     data */}
          <h3>
            {weatherData.data.location.name},{" "}
            {weatherData.data.location.country}
          </h3>
          <p>Temperature: {weatherData.data.temperature}</p>
          <p>Description: {weatherData.data.weather.description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
