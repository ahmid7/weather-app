import {useState,useEffect} from "react";
import { HiMenuAlt3 } from "react-icons/hi";
const Trial = (props) =>{
    const current = new Date();
    const arrDays = ['Sun','Mon','Tues','Wednes','Thurs','Fri','Sat'];
    const arrMont = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const [time,setTime] = useState(new Date());
    const temp = Math.round(props.weatherData.main.temp);
    const year = (current.getFullYear()).toString();
    const yearSplice = year.substring(2);
    useEffect(() =>{
        const timer = setTimeout(()=> setTime(new Date()),1000);
        return() => clearTimeout(timer);
    });
    return(
        <section className="trial">
            <div className="weather-header">
                <h2>WeatherApp</h2>
                <div className="hamburger-container">
                    <HiMenuAlt3 className="hamburger" onClick={() => {props.menuClickHandler()}}/>
                </div>
            </div>
            <div className="weather-details">
                <div className="weather-temp">
                    <p>{temp}&deg;c</p>
                </div>
                <div className="weather-city-date">
                    <div className="city">
                        {props.weatherData.name}
                    </div>
                    <div className="date">
                        <p>{time.toLocaleTimeString()}</p>
                        <p className="hypen">-</p>
                        <p>{`${arrDays[current.getDay()]}, ${current.getDate()} ${arrMont[current.getMonth()]}. '${yearSplice}`}</p>
                    </div>
                </div>
                <div className="weather-icon">
                    <div className="icon">
                        <img src={`http://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}.png`} alt="weather-icon"/>
                    </div>
                    <div className="icon-descr">
                        <p>{props.weatherData.weather[0].main}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default Trial;