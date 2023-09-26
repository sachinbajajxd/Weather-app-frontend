import React, {useState} from "react";
import axios from "axios";
import { FaCloud } from "react-icons/fa";
import hotBg from '../assets/WeatherCold.jpg';

const Home = () => {

    const [weatherData, setWeatherData] = useState('');
    const [city, setCity] = useState('');
    

    const fetchWeatherData = () => {
        axios
            .get(`https://weather-app-2nid.onrender.com/get-info/${city}`)
            .then((response) => {
                setWeatherData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
    };

    const handleClick = () => {
        fetchWeatherData();
    };
    
    return (
        <div className="min-h-screen bg-cover flex items-center justify-center" style={{ backgroundImage: `url(${hotBg})` }}>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                    {city.length>0 || Object.keys(weatherData).length === 0 ? (
                        <button onClick={handleClick} className="mt-2 bg-indigo-100 p-1 rounded">Search</button>
                    ): <div></div>}
                </div>
                {weatherData && (
                    <>
                        <h2 className="text-3xl m-4">
                        {weatherData.name}, {weatherData.sys.country}
                        </h2>

                        <div className="flex flex-row items-center justify-center text-4xl">
                        <FaCloud className="text-blue-500" /> {/* Use a blue color for the cloud icon */}
                        <h2 className="ml-2">{Math.round(weatherData.main.temp)-273}°C</h2>
                        </div>

                        <div className="mt-4">{weatherData.weather[0].main}</div>

                        <div className="text-sm mt-4">
                            Min Temp: {Math.round(weatherData.main.temp_min)-273}°C
                        </div>
                        <div className="text-sm mt-4">
                            Max Temp: {Math.round(weatherData.main.temp_max)-273}°C
                        </div>
                        <div className="text-sm mt-4">
                            Feels like: {Math.round(weatherData.main.feels_like)-273}°C
                        </div>
                        <div className="text-sm mt-4">
                            Humidity: {weatherData.main.humidity}%
                        </div>
                        <div className="text-sm mt-4">
                            Pressure: {weatherData.main.pressure} hPa
                        </div>
                    </>
                )}

            </div>
        </div>
    )
} 

export default Home;