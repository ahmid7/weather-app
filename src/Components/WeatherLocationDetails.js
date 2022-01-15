
const WeatherLocationDetails = ({details}) =>{
    return(
        <div className="wld">
            <h2>Weather Details</h2>
            <div className="wld-details">
                <div className="indiv-details">
                    <span>Temp</span>
                    <span>{details.main.temp}&deg;C</span>
                </div>
                <div className="indiv-details">
                    <span>Cloudiness</span>
                    <span>{details.clouds.all}&#37;</span>
                </div>
                <div className="indiv-details">
                    <span>Humidity</span>
                    <span>{details.main.humidity}&#37;</span>
                </div>
                <div className="indiv-details">
                    <span>Wind</span>
                    <span>{details.wind.speed}km/h</span>
                </div>
            </div>
        </div>
    );
}


export default WeatherLocationDetails;

