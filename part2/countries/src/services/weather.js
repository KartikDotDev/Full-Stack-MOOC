import axios from "axios";

// Link for testing format in browser
// http://api.openweathermap.org/data/2.5/weather?q=New%20Delhi&units=metric&appid=API_KEY


const getWeather = (city, countryShort) => {
    const request = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${countryShort}&units=metric&appid=${process.env.REACT_APP_KEY}`);
    return request.then(response => response.data);
};

const weatherService = { getWeather };

export default weatherService;