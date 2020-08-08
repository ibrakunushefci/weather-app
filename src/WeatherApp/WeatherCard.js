import React from 'react';

const WeatherCard = ({items}) => {
   const condition = items.current.condition.text;

   const convert = dateRange =>
   dateRange.split()
      .map(date => new Intl.DateTimeFormat('en-GB').format(new Date(date)))
      .join()
   
   return (
      <>
         {/* It shows rain, cloud, sun animations based on the weather condition */}
         {condition === "Sunny"
            ? <div id="sun"></div>
            : null
         }

         {condition === "Patchy rain possible" || condition === "Patchy light rain with thunder" || condition === "Patchy light drizzle" || condition === "Blizzard" || condition === "Light drizzle" || condition === "Patchy light rain" || condition === "Light rain" || condition === "Moderate rain at times" || condition === "Moderate rain" || condition === "Heavy rain at times" || condition === "Heavy rain" || condition === "Light freezing rain" || condition === "Moderate or heavy freezing rain" || condition === "Light sleet" || condition === "Light rain shower" || condition === "Moderate or heavy rain shower" || condition === "Torrential rain shower" || condition === "Light sleet showers" || condition === "Moderate or heavy sleet showers" || condition === "Mist"
            ? [...new Array(40).keys()].map(i => <i key={i} className="rain"></i>)
            : null
         }

         {condition === "Partly cloudy" || condition === "Cloudy" || condition === "Clear" || condition === "Overcast" 
            ? <div id="background-wrap"><div className="x1"><div className="cloud"></div></div><div className="x2"><div className="cloud"></div></div><div className="x3"><div className="cloud"></div></div><div className="x4"><div className="cloud"></div></div></div>
            : null
         }
         
         {/* Weather Card */}
         <div className="container" data-aos='fade-up'>
            <div className="weather-side">
               <div className="weather-gradient"></div>
               <div className="date-container">
                  <h2 className="date-dayname">Today</h2>
                  <span className="location">{items.location.country}</span>
               </div>
               <div className="weather-container">
                  <img src={items.current.condition.icon} className="weather-icon" alt="Current Condition" />
                  <h1 className="weather-temp">{items.current.temp_c}°C</h1>
                  <h3 className="weather-desc">{items.current.condition.text}</h3>
               </div>
            </div>

            <div className="info-side">
               <div className="today-info-container">
                  <div className="today-info">
                     <div className="wind"> <span className="title">WIND</span><span className="value">{items.current.wind_kph} km/h</span>
                        <div className="clear"></div>
                     </div>
                     <div className="humidity"> <span className="title">HUMIDITY</span><span className="value">{items.current.humidity}%</span>
                        <div className="clear"></div>
                     </div>
                     <div className="precipitation"> <span className="title">WIND DIRECTION</span><span className="value">{items.current.wind_dir}</span>
                        <div className="clear"></div>
                     </div>
                  </div>
               </div>
               <div className="week-container">
                  <ul className="week-list">
                     <li className="active">
                        <img src={items.forecast.forecastday[0].day.condition.icon} className="day-icon" alt="day-icon" />
                        <span className="day-name">{(convert(items.forecast.forecastday[0].date))}</span>
                        <span className="day-temp">{items.forecast.forecastday[0].day.maxtemp_c}°C</span>
                     </li>
                     <li className="active">
                        <img src={items.forecast.forecastday[1].day.condition.icon} className="day-icon" alt="day-icon" />
                        <span className="day-name">{(convert(items.forecast.forecastday[1].date))}</span>
                        <span className="day-temp">{items.forecast.forecastday[1].day.maxtemp_c}°C</span>
                     </li>
                     <li className="active">
                        <img src={items.forecast.forecastday[2].day.condition.icon} className="day-icon" alt="day-icon" />
                        <span className="day-name">{(convert(items.forecast.forecastday[2].date))}</span>
                        <span className="day-temp">{items.forecast.forecastday[2].day.maxtemp_c}°C</span>
                     </li>
                     <div className="clear"></div>
                  </ul>
               </div>
               <div className="location-container">
                  <button className="location-button">
                     <span>{items.location.country}</span>
                  </button>
               </div>
            </div>
         </div>
      </>
   );
}
 
export default WeatherCard;