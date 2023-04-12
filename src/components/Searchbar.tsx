import React, { useState, useEffect, useRef } from "react";
import "../styles/searchbar.css";
import date from 'date-and-time';

import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Typography,
  Stack
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import type {AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux/es/exports";
import { fetchWeatherData } from "../redux/weatherSlice";

export const Searchbar = () => {
  const [query, setquery] = useState("srivi");
  const queryRef = useRef<HTMLInputElement>(null!);


  const dispatch = useDispatch<AppDispatch>();

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);
  const dayIndex = time.getDay();
  const tday = time.toLocaleDateString();
  const ttime = time.toLocaleTimeString();
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  useEffect(() => {
    dispatch(fetchWeatherData(query));
  }, []);

  const handleSearch = () => {
    dispatch(fetchWeatherData(query));
    queryRef.current.value = "";
  };


  return (
    <AppBar position="static" color="transparent">
      <Toolbar sx={{ p: 3 }}>
        <TextField
          autoFocus
          className="searchbar"
          inputRef={queryRef}
          placeholder="Enter city name..."
          sx={{ marginLeft: "auto",marginRight: "auto" }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch} sx={{ color: "white" }}>
                <SearchIcon />
              </IconButton>
            ),
            style: { color: "#ffb703", fontWeight: "bolder", },
          }}
          onChange={(e) => setquery(e.target.value)}
        />
      </Toolbar>
    </AppBar>
  );
};
