import "./DisplayBox.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import CloudIcon from "@mui/icons-material/Cloud";

function DisplayBox({ finalData }) {
  let HOT_URL =
    "https://media.istockphoto.com/id/1254065595/photo/hot-summer-or-heat-wave-background.webp?b=1&s=170667a&w=0&k=20&c=3pJ8IywW-9H-bcZ2XNGG0EaKwYiWD3XdMLC-mAC6dFI=";
  let COLD_URL =
    "https://plus.unsplash.com/premium_photo-1671462679356-15ed7a622434?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29sZHxlbnwwfHwwfHx8MA%3D%3D";
  let RAIN_URL =
    "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.webp?b=1&s=170667a&w=0&k=20&c=7nD_8127UoUACRboJelDa-h-g0afqyRP9h8jtJ5xvUo=";
  let CLOUDS_URL =
    "https://media.istockphoto.com/id/512218646/photo/storm-sky-rain.webp?b=1&s=170667a&w=0&k=20&c=A6scT875ZghoiQVKaqgRJu8W3bVagx84nc-96kO9AQc=";
  return (
    <div className="displayBox">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 200 }}
          image={
            finalData.humidity > 80
              ? RAIN_URL
              : finalData.weather == "Clouds"
              ? CLOUDS_URL
              : finalData.temp > 15
              ? HOT_URL
              : COLD_URL
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {finalData.city}&nbsp;
            {finalData.humidity > 75 ? (
              <ThunderstormIcon />
            ) : finalData.weather == "Clouds" ? (
              <CloudIcon />
            ) : finalData.temp > 15 ? (
              <WbSunnyIcon />
            ) : (
              <AcUnitIcon />
            )}
          </Typography>
          <Typography variant="body2" component={"span"}>
            <p>Humidity={finalData.humidity}&#37;</p>
            <p>Temperature={finalData.temp}&deg;C</p>
            <p>Max={finalData.temp_max}&deg;C</p>
            <p>Min={finalData.temp_min}&deg;C</p>
            <p>
              The weather is <b>{finalData.weather}</b> and feels like &nbsp;
              {finalData.feels_like}&deg;C.
            </p>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default DisplayBox;
