import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  let API_KEY = "bd22aa28797daf91efb0f51da1978ff0";
  let API_URL = "https://api.openweathermap.org/data/2.5/weather";

  let handleChange = (evt) => {
    setCity(evt.target.value);
  };

  let handleSearch = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();
      let weatherInfo = {
        city: city,
        humidity: jsonResponse.main.humidity,
        temp: jsonResponse.main.temp,
        temp_max: jsonResponse.main.temp_max,
        temp_min: jsonResponse.main.temp_min,
        feels_like: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].main,
      };
      console.log(weatherInfo);
      updateInfo(weatherInfo);
    } catch (err) {
      setError(true);
    }
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
    setCity("");
    setError(false);
  };
  return (
    <div>
      <h1>Weather forecast.</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="City name"
          variant="outlined"
          value={city}
          onChange={handleChange}
          required
        />
        {error ? <h3 style={{ color: "red" }}>Data not available!</h3> : ""}
        <br></br>
        <br></br>
        <Button variant="outlined" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
}

export default SearchBox;
