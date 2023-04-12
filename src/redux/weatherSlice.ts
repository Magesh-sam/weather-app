import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Weather } from "./interface";

const API_KEY = '11c1a3c7a9cd406188923445231204'




interface weatherProps{
    loading: boolean;
    weatherData: Weather,
    error: string;
}

const initialState:weatherProps = {
    loading: false,
    weatherData: {} as Weather,
    error:''
}

export const fetchWeatherData = createAsyncThunk<Weather,string>('weather/fetchWeatherData', async (query) => {

    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=yes&alerts=no`)
    return response.data
})

const weatherSlice = createSlice(
    {
        name: 'weather',
        initialState,
        reducers: {},
        extraReducers(builder) {
            builder.addCase(fetchWeatherData.pending, (state) => {
                state.loading=true
            })
                .addCase(fetchWeatherData.fulfilled, (state,action:PayloadAction<Weather>) => {
                    state.loading = false,
                    state.weatherData = action.payload
                })
                .addCase(fetchWeatherData.rejected, (state,action) => {
                    state.loading = false,
                    state.error = action.error.message || 'Something went wrong! 😔'
            })
        },
    }
)

export default weatherSlice.reducer