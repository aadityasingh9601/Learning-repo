import { useState } from "react";
import SearchBox from "./SearchBox";
import DisplayBox from "./DisplayBox";

function WeatherApp() {
  const [info, setInfo] = useState({
    city: "Modinagar",
    humidity: 63,
    temp: 33,
    temp_max: 34,
    temp_min: 26,
    feels_like: 42,
    weather: "Cloudy",
  });
  let updateInfo = (weatherInfo) => {
    setInfo(weatherInfo);
  };
  return (
    <div className="weatherApp">
      <SearchBox updateInfo={updateInfo} />
      <DisplayBox finalData={info} />
    </div>
  );
}

export default WeatherApp;
