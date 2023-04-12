import React, { useState, useEffect } from "react";
import "../styles/cityweather.css";
import { Typography, Container, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export const CityWeather = () => {
  const { loading, weatherData, error } = useSelector(
    (state: RootState) => state.weather
  );


  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);
  const today = time.toLocaleDateString();
  const ttime = time.toLocaleTimeString();
  const dayIndex = time.getDay();
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <Container sx={{ paddingTop: "50px" }}>
      {loading && <Typography align="center" variant="h5" sx={{color:'white'}}>Getting Info...</Typography>}
      {!loading && error?.length <=0 ?   null : <Typography align="center" variant="h5" sx={{color:'white'}}>{error}</Typography>}
      {!loading && error.length === 0 && (
        <>
        <Container className="citywrapper" sx={{ color: "black" }}>
          <Stack sx={{ color: "black" }} className="cityname">
            <LocationOnIcon sx={{ fontSize: "80px" }} />

            <Typography variant="h4">
              {weatherData.location?.name + ","}
            </Typography>
            <Typography variant="h4">{weatherData.location?.region}</Typography>
          </Stack>
          <Stack>
            <Typography variant="h3">
              {weatherData.current?.temp_c + "°C"}
            </Typography>
            <img
              src={weatherData.current?.condition.icon}
              alt={weatherData.current?.condition.text}
            />
            <Typography variant="h3">{`${weatherData.current?.condition.text}`}</Typography>
          </Stack>
          <Stack className="timewrap">
            <Typography sx={{ fontWeight: "bolder" }} variant="h4">
              {ttime}
            </Typography>
            <Typography variant="h4">{today + " " + day[dayIndex]}</Typography>
          </Stack>
        </Container>
          <Container sx={{marginTop:'50px'}} className="datawrapper">
            <Stack className="databox">
              <Typography variant="h5" sx={{fontWeight:'bold'}}>🍃 Wind</Typography>
              <Typography variant="h5">{ weatherData.current?.wind_kph+" "+"km/h"}</Typography>
              </Stack>
            <Stack className="databox">
              <Typography variant="h5" sx={{fontWeight:'bold'}}>☔ Humidity</Typography>
              <Typography variant="h5">{ weatherData.current?.humidity+"%"}</Typography>
              </Stack>
            <Stack className="databox">
              <Typography variant="h5" sx={{fontWeight:'bold'}}>🔆 UV Index</Typography>
              <Typography variant="h5">{ weatherData.current?.uv}</Typography>
              </Stack>
            <Stack className="databox">
              <Typography title='Air Quality Index' variant="h5" sx={{fontWeight:'bold'}}>⭐ AQI</Typography>
              <Typography variant="h5">{"PM 10 - "+ weatherData.current?.air_quality?.pm10.toFixed(2)}</Typography>
              </Stack>
            <Stack className="databox">
              <Typography title='Air Quality Index' variant="body1" sx={{fontWeight:'bold'}}>Sunrise - Sunset</Typography>
              <Typography variant="h5">{"🌅 "+weatherData.forecast?.forecastday[0].astro.sunrise}</Typography>
              <Typography variant="h5">{"🌆 "+weatherData.forecast?.forecastday[0].astro.sunset}</Typography>
              </Stack>
          </Container>
          <Typography align="center" sx={{color:'white', marginTop:'30px'}} variant="h5">Weather Thorughout the Day!</Typography>
          <Container className="timeweather">
            {weatherData.forecast?.forecastday[0].hour.map((item, index) => (
              <Stack className="timebox" key={index}>
                <Typography variant="h5" >{item.time.substring(11)}</Typography>
                <img src={item.condition.icon} alt={item.condition.text} />
                <Typography variant="h5" >{item.temp_c+"°C"}</Typography>

              </Stack>
            ))}

          </Container>
          <Typography align="center" sx={{color:'white', marginTop:'30px'}} variant="h5">Weekly Weather!</Typography>

          <Container className="weekweather">
            {weatherData.forecast?.forecastday.map((day, index) => (
              <Stack key={index} className="weekbox">
                <Typography variant="body1">{day.date}</Typography>
                <img  src={day.day.condition.icon} alt={day.day.condition.text} />
                <Typography variant="body1">{day.day.avgtemp_c+"°C"}</Typography>
                </Stack>
              ))}
          </Container>
        </>
      )}
    </Container>
  );
};
