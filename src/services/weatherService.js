import { DateTime } from "luxon";

const API_KEY = 'c6f700d381c7bb627b9dcbf86513057c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

// Fetch weather data from the API
const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    return fetch(url)
        .then((response) => response.json());
};

// Generate icon URL from icon code
const iconUrlFromCode = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

// Format time to local time based on timezone offset
const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | local time: 'hh:mm a") => 
    DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

// Format current weather data
const formatCurrent = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        wind: { speed },
        timezone,
        weather,
    } = data;
    const { main: details, icon } = weather[0];
    const formattedToLocalTime = formatToLocalTime(dt, timezone);

    return {
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        speed,
        details,
        icon: iconUrlFromCode(icon),
        formattedToLocalTime,
        dt,
        timezone,
        lat,
        lon,
    };
};

// Format forecast weather data
const formatForecastWeather = (secs, offset, data) => {
    const hourly = data.filter((f) => f.dt > secs)
        .map(f => ({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, "hh:mm a"),
            icon: iconUrlFromCode(f.weather[0].icon),
            date: f.dt_txt,
        })).slice(0, 5);

    const daily = data.filter((f) => f.dt_txt.includes("00:00:00"))
        .map(f => ({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, "hh:mm a"),
            icon: iconUrlFromCode(f.weather[0].icon),
            date: f.dt_txt,
        }));

    return { hourly, daily };
};

// Get formatted weather data for current and forecast
const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams)
        .then(formatCurrent);

    const { dt, lat, lon, timezone } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("forecast", {
        lat,
        lon,
        units: searchParams.units,
    }).then((d) => formatForecastWeather(dt, timezone, d.list));

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default getFormattedWeatherData;

