import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Weather: React.FC = () => {
  const [zipCode, setZipCode] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=4cc34f97f9374a11bdf153533242409&q=${zipCode}&aqi=no`);
      setWeatherData(response.data);
      console.log("Weather Data", response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Weather Forecast</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            placeholder="Enter City Name"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-300"
          >
            Get Weather
          </button>
        </form>

        {loading && <p className="text-center">Loading...</p>}

        {weatherData && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Weather for {weatherData.location.name}</h2>
            <div className="mb-6">
              <p>Temperature: {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F</p>
              <p>Condition: {weatherData.current.condition.text}</p>
              <img src={weatherData.current.condition.icon} alt="Weather Icon" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Temperature Trend</h3>
                <Line
                  data={{
                    labels: ['Temperature'],
                    datasets: [
                      {
                        label: 'Temperature (°C)',
                        data: [weatherData.current.temp_c],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      },
                      {
                        label: 'Feels Like (°C)',
                        data: [weatherData.current.feelslike_c],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Weather Metrics</h3>
                <Pie
                  data={{
                    labels: ['Humidity', 'Wind', 'Pressure'],
                    datasets: [
                      {
                        data: [weatherData.current.humidity, weatherData.current.wind_kph, weatherData.current.pressure_mb],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                      },
                    ],
                  }}
                />
              </div>
            </div>

            <table className="w-full mt-6">
              <thead>
                <tr>
                  <th className="border p-2">Metric</th>
                  <th className="border p-2">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Wind Speed (kph)</td>
                  <td className="border p-2">{weatherData.current.wind_kph}</td>
                </tr>
                <tr>
                  <td className="border p-2">Humidity (%)</td>
                  <td className="border p-2">{weatherData.current.humidity}</td>
                </tr>
                <tr>
                  <td className="border p-2">Visibility (km)</td>
                  <td className="border p-2">{weatherData.current.vis_km}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;