import React from "react";
import "./weather.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsFillCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
  BsRainbow,
  BsCloudy,
  BsCloudDrizzleFill,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

//API KEY
const APIKey = "fb0ca108623a0b063c43610469a29a14";
//Date
const date = new Date();
export const Weather = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("cairo");
  var input = document.querySelector("input");
  const [inputValue, setInputValue] = useState("");
  const [shake, setShake] = useState(false);
  const [wrongMessage, setwrongMessage] = useState(false);
  let icon;
  const [notFoundCity, setNotFoundCity] = useState(null);

  const getWeatherApiData = async () => {
    try {
      let myResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&&units=metric&appid=${APIKey}`
      );
      setData(myResponse.data);
      console.log(myResponse.data.name);
      setNotFoundCity(null);
    } catch (error) {
      console.log(error);
      setNotFoundCity(error.response.data.message);
    }
  };
  useEffect(() => {
    getWeatherApiData();
  }, [location]);

  if (!data) {
    return (
      <div>
        <ImSpinner8 className="reloadingIcone" />
      </div>
    );
  }

  const getNewCityName = (e) => {
    notFoundCity !== null && setNotFoundCity(null);
    setInputValue(e.target.value);
  };

  const handleSearch = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
      e.preventDefault();
      if (input.value === "") {
        console.log("no place ");
      } else if (input.value !== location) {
        console.log("not");
      }
      input.value = "";
    } else {
      setNotFoundCity("City Name Not Valid To Be Empty");
    }
  };

  switch (
    data.weather[0].main //clear
  ) {
    case "Clouds":
      icon = <BsCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;

    case "Clear":
      icon = <IoMdSunny />;
      break;

    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;

    case "Snow":
      icon = <IoMdSnow />;
      break;

    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;

    default:
      break;
  }
  return (
    <div className="container">
      {notFoundCity !== null && (
        <div className="notFoundCity">
          <h1>{notFoundCity}</h1>
        </div>
      )}
      {/* form */}
      <>
        {/* <div className={`loading ${load ? "wrong" : null}`}>Loading....</div> */}

        <div className={`none ${wrongMessage ? "wrong" : null}`}>
          wrong country
        </div>
        <div className={`search ${shake ? "shake" : null} `}>
          <input
            placeholder="Search By City Or Country"
            onChange={(e) => getNewCityName(e)}
            type="text"
          />
          <button onClick={(e) => handleSearch(e)}>Search</button>
        </div>
      </>

      {/* Card */}
      <div className="card">
        {/* card Top */}
        <div className="cardTop">
          <div className="icon">{icon}</div>
          <div className="countryName">
            {data.name} ,{data.sys.country}
            <div className="date">
              {date.getUTCDate()}/ {date.getUTCMonth() + 1}/
              {date.getUTCFullYear()}
            </div>
          </div>
        </div>

        {/* card body */}
        <div className="cardBody">
          <div className="temp">{parseInt(data.main.temp)}</div>
          <TbTemperatureCelsius style={{ fontWeight: "bold" }} />
        </div>

        <div style={{ textAlign: "center" }}>{data.weather[0].description}</div>
        {/* card bottom */}
        <div className="cardBottom">
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <BsEye style={{ fontSize: "16px" }} />
            <div style={{ fontSize: "18px" }}>
              Visibility <span>{data.visibility / 1000} km</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1px", alignItems: "center" }}>
            <BsThermometer style={{ fontSize: "14px" }} />
            <div style={{ fontSize: "18px" }}>
              feels like{" "}
              <span>
                {data.main.feels_like}{" "}
                <TbTemperatureCelsius style={{ fontSize: "18px" }} />{" "}
              </span>
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              marginTop: "2rem",
              display: "flex",
              gap: "10px",
            }}
          >
            <BsWater style={{ fontSize: "18px" }} />
            <div style={{ fontSize: "18px" }}>
              Humidity <span>{data.main.humidity} %</span>
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              marginTop: "2rem",
              display: "flex",
              gap: "10px",
            }}
          >
            <BsWind style={{ fontSize: "17px" }} />
            <div style={{ fontSize: "18px" }}>
              Wind <span>{data.wind.speed} m/s </span>
            </div>
          </div>
        </div>
      </div>

      {/* <span className=' '>
                {icon}
            </span> */}
    </div>
  );
};
