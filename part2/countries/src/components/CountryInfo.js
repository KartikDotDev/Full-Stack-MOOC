import React, { useState, useEffect } from "react";
import weatherService from "../services/weather";

const CountryInfo = ({ country }) => {

  // console.log(country);
  const style = {
    fontSize: "200px",
    width: "200px",
    height: "200px",
    border: "solid black 1px"

  };

  const [weather, setWeather] = useState({
    cod: 0,
    temperature: "",
    wind_speed: "",
    wind_dir: "",
    weather_icon: ""
  });


  useEffect(() => {
    weatherService.getWeather(country.capital, country.cca2).then((initialWeather) => {
      console.log(initialWeather);

      const temp = {
        temperature: initialWeather.main.temp,
        wind_speed: initialWeather.wind.speed,
        wind_dir: initialWeather.wind.deg,
        weather_description: initialWeather.weather[0].description,
        weather_icon_src: `https://openweathermap.org/img/wn/${initialWeather.weather[0].icon}@4x.png`
      };
      // console.log(temp);
      setWeather(temp);

    });
  }, [country.capital, country.cca2]);



  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language, idx) => <li key={idx}>{language}</li>)}
      </ul>
      <h3>Flag</h3>
      <span style={style}>{country.flag}</span>

      <h3>Weather in {country.capital}</h3>
      <p>Description: {weather.weather_description}</p>
      <p>Temperature: {weather.temperature}</p>
      <p>Wind: {weather.wind_speed} m/s direction {weather.wind_dir} deg.</p>
      <img style={style} src={weather.weather_icon_src} alt="weather icon" />
    </>
  )
}


export default CountryInfo;