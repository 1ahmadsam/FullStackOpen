import React, { useState, useEffect } from 'react';
import axios from 'axios';
//Define component imports
const Button = (props) => {
  const handleClick = () => {
    props.setFilter(props.country[0].name);
  };
  return <button onClick={handleClick}>show</button>;
};
const Countries = ({ handleFilter, setFilter }) => {
  const filterCountries = () => {
    if (handleFilter.length === 1) {
      return <Country country={handleFilter} />;
    } else if (handleFilter.length < 10 && handleFilter.length > 1) {
      return handleFilter.map((country) => (
        <div key={country.name}>
          {country.name}
          <Button country={[country]} setFilter={setFilter} />
        </div>
      ));
    } else if (handleFilter.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
  };

  return <div>{filterCountries()}</div>;
};

const Country = (props) => {
  const [weather, setWeather] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;
  const currentCountry = props.country[0];

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${currentCountry.capital}`
      )
      .then((response) => {
        setWeather([response.data.current]);
      });
  }, [api_key, currentCountry]);
  console.log(weather);
  return (
    <div>
      <h1>{currentCountry.name}</h1>
      <p>capital {currentCountry.capital}</p>
      <p>population {currentCountry.population}</p>
      <h3>spoken languages</h3>
      <ul>
        {currentCountry.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={currentCountry.flag}
        alt='flag'
        style={{ width: 200, height: 200 }}
      ></img>
      <h3>Weather in {currentCountry.capital}</h3>
      <p>
        <b>temperature:</b>
        {weather.length === 1 ? weather[0].temperature : 'loading...'} celcius
      </p>
      <img
        src={weather.length === 1 ? weather[0].weather_icons[0] : 'loading...'}
        alt='flag'
        style={{ width: 100, height: 100 }}
      ></img>
      <p>
        <b>wind: </b>
        {weather.length === 1 ? weather[0].wind_speed : 'loading...'} mph
        direction {weather.length === 1 ? weather[0].wind_dir : 'loading...'}
      </p>
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [newFilter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilter = newFilter
    ? countries.filter((country) =>
        country.name.toUpperCase().includes(newFilter.toUpperCase())
      )
    : [];

  return (
    <div>
      <p>
        find countries
        <input onChange={(e) => setFilter(e.target.value)}></input>
      </p>
      <Countries handleFilter={handleFilter} setFilter={setFilter} />
    </div>
  );
}

export default App;
