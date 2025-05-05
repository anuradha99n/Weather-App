import React, { useState } from "react";
import {
  background,
  clear_icon,
  wind_icon,
  humidity_icon,
  cloud_icon,
  drizzle_icon,
  rain_icon,
  snow_icon,
} from "./assets/assets";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {

    if(!city) {
      alert('enter a city')
    }

    try {
      const url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_Weather_API
        }`
      );
      const data = await url.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      console.log(data);
      setWeatherData({
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error(`error occurred: ${error}`, error);
    }
  };

  const handleSearch = () => {
    search(city);
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{ 
        // backgroundImage: `url(${background})` 
        backgroundImage: `linear-gradient(to bottom right,rgb(1, 28, 37),rgb(40, 185, 253))`
      }}
    >
      <div className="h-[650px] w-[500px] bg-white/5 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-6">
        <div className="w-[500px] mt-7 flex flex-row justify-center gap-8">
          <input
            onChange={(e) => setCity(e.target.value)}
            className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-2xl outline-none placeholder-white"
            type="text"
            placeholder="Search..."
          />
          <button
            id="search-button"
            data-testid="search-button"
            onClick={handleSearch}
            className="border py-1.5 px-5 rounded-3xl bg-transparent text-white font-bold hover:text-black hover:bg-white hover:border-0 cursor-pointer duration-100 ease-in"
          >
            Search
          </button>
        </div>
        {weatherData ? (
          <>
            <div className="flex items-center justify-center flex-col mt-10 h-[300px]">
              <img src={weatherData.icon} alt="" />
              <h1 className="text-[50px] text-white font-bold">
                {weatherData.description}
              </h1>
              <p className="text-[30px] text-white">{city}</p>
              <p className="text-[30px] text-white">
                {weatherData.temperature}°C
              </p>
            </div>
            <div className="flex items-center flex-row justify-between px-8 mt-15">
              <div className="flex flex-col items-center gap-2">
                <img src={wind_icon} alt="" />
                <h3 className="text-bold text-white text-2xl font-bold">
                  Wind
                </h3>
                <p className="text-white text-[18px]">
                  {weatherData.windSpeed} kmp/h
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <img src={humidity_icon} alt="" />
                <h3 className="text-bold text-white text-2xl font-bold">
                  Humidity
                </h3>
                <p className="text-white text-[18px]">
                  {weatherData.humidity}%
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-white text-center mt-10">
            Enter a city and click Search
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
