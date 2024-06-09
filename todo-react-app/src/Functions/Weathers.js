import { useState, useEffect } from "react";
import axios from "axios";
import searching from "../Icons/search.png";
import WEATHER_KEY from "../apikey";

function Weather() {
  const [location, setLocation] = useState("Bucheon");
  const [info, setInfo] = useState(null);
  const API_KEY = WEATHER_KEY;

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const fetchWeather = async (location) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
    try {
      const response = await axios.get(URL);
      setInfo(response.data);
      console.log(response.data);
    } catch (error) {
      alert("존재하지 않는 지역입니다.");
    }
  };

  const searchWeather = async (event) => {
    if (event.key === "Enter") {
      fetchWeather(location);
    }
  };

  const searchingWeather = async (event) => {
    fetchWeather(location);
  };

  useEffect(() => {
    fetchWeather("Bucheon");
  }, []);

  return (
    <div className="App">
      <div className="input_box">
        {info && info.main && info.weather && (
          <div className="weather_box">
            <div className="city_name">{info.name}</div>
            <div className="city_temperature">
              {Math.round(info.main.temp - 273.15)}°C
            </div>
            {/* <div className="city_state">{info.weather[0].main}</div> */}
            <img
              className="weather_icon"
              src={`http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
            <br />
            <input
              className="city"
              type="text"
              placeholder="도시를 입력하세요"
              value={location}
              onChange={handleLocation}
              onKeyDown={searchWeather}
            />
            <img src={searching} alt="돋보기" onClick={searchingWeather} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
