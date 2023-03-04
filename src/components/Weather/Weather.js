import React, { useEffect, useState } from "react";
import {
  SET_TEMPERATURE_CELSIUS,
  SET_TEMPERATURE_FARHEINHEIT,
} from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import "./Weather.css";
import { useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const Weather = () => {
  const key = "25233a23135649168ca14343230403";

  const { city } = useParams();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const [weatherData, setWeatherData] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [unit, setUnit] = useState("C");

  const fetchWeatherData = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      setIsFetching(false);

      window.localStorage.setItem("C", data.current.temp_c);
      window.localStorage.setItem("F", data.current.temp_f);

      dispatch({
        type: SET_TEMPERATURE_CELSIUS,
        temperatureVaLueCelcius: data.current.temp_c,
      });
      dispatch({
        type: SET_TEMPERATURE_FARHEINHEIT,
        temperatureVaLueFarhenheit: data.current.temp_f,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    if (store.temperatureVaLueCelcius === 0 && localStorage.getItem("C")) {
      dispatch({
        type: SET_TEMPERATURE_CELSIUS,
        temperatureVaLueCelcius: localStorage.getItem("C"),
      });
      dispatch({
        type: SET_TEMPERATURE_FARHEINHEIT,
        temperatureVaLueFarhenheit: localStorage.getItem("F"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return (
      <div>
        <Spinner size="150px" />
      </div>
    );
  }
  const handleTemperature = (e) => {
    console.log(e.target.value);
    setUnit(e.target.value);
  };

  return (
    <div className="weather-container">
      <div className="title">
        <h1>Weather Data</h1>
      </div>

      <form className="form">
        <input
          type="radio"
          id="C"
          name="fav_language"
          value="C"
          onClick={handleTemperature}
        />
        <label htmlFor="C">Celcius</label>

        <input
          type="radio"
          id="F"
          name="fav_language"
          value="F"
          onClick={handleTemperature}
        />
        <label htmlFor="F">Farheinheit</label>
      </form>

      <div className="weather-details-container">
        <h1>Location: <span>{weatherData.location.name}</span></h1>
        <h2>
          Temperature:{" "}<span>
          {unit === "C"
            ? store.temperatureVaLueCelcius
            : store.temperatureVaLueFarhenheit}</span>
        </h2>
        <img src={weatherData.current.condition.icon} alt="weatherIcon" />
        <h4>Weather Condition : <span>{weatherData.current.condition.text}</span></h4>
        <h4>Humidity : <span>{weatherData.current.humidity}</span></h4>
        <h4>Latitude : <span>{weatherData.location.lat} deg</span></h4>
        <h4>Longitude : <span>{weatherData.location.lon} deg</span></h4>
        <h4>Region : <span>{weatherData.location.region}</span></h4>
      </div>
    </div>
  );
};

export default Weather;
