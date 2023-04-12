import React from 'react'
import './styles/app.css'
import { useSelector } from 'react-redux'
import type { RootState } from './redux/store'
import { Searchbar } from './components/Searchbar'
import { CityWeather } from './components/CityWeather'

export const App = () => {

 

  return (
    <main>
      <Searchbar />
      <CityWeather/>
    </main>
  )
}
