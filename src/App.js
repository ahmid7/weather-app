import './App.scss';
import {useState,useEffect} from "react";
import Trial from './Components/Trial';
import { RiSearchLine} from "react-icons/ri";
import DefaultLocation from './Components/DefaultLocation';
import WeatherLocationDetails from './Components/WeatherLocationDetails';
function App() {
  const [data,setData] = useState([]);
  const [location,setLocation] = useState('London');
  const [child,setChild] = useState('London');
  const [search,setSearch] = useState('london');
  const [enter,setEnter] = useState('london');
  let image = 'Clouds';
  const updateEnter = (e) =>{
    if(e.charCode === 13){
      setData([])
      e.preventDefault();
      setEnter(e.target.value);
      setLocation(e.target.value);
    }
  }
  const updateSearch = (e) =>{
    setSearch(e.target.value);
  }

  const updateLocation = (e) =>{
    setLocation(search);
    setData([])
  }

  function handleChildComponent(value){
    setData([]);
    setChild(value);
    setSearch(value);
    setLocation(value);
  }

  useEffect(() =>{
    async function requestData(){
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/weather/?q=${location}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
      );
      const json = await res.json();
      setData(json);
    }
    requestData();
  },[location])


  // learn how to process .env files for api
  // recap what you learn with changing of parent state from child component
  //further practice async 
  return (
    <div className='App'>
      <div className='detail'>

        {(typeof data.main != "undefined") ?(
          <div className='weather-container' style = {{backgroundImage:`url(Images/${data.weather[0].main}.jpg)`,backgroundPosition:'center',backgroundSize:'cover'}}
          >
            <Trial weatherData={data}/>
            <div className='location'>

              <form>

                <label htmlFor='location-search'>
                  <input 
                    id='search-location'
                    value = {search}
                    onChange={updateSearch}
                    onKeyPress={updateEnter}
                  />
                </label>
                <div className='search-icon' onClick={updateLocation}>
                  <RiSearchLine className='s-icon'/>
                </div>

              </form>

              <DefaultLocation onChange={handleChildComponent}/>

              <div className='line-seperator'>

              </div>

              <WeatherLocationDetails details= {data}/>

            </div>
          </div>
        ):(
          <div> Loading...</div>
        )}
      </div>
    </div>
  );
}

export default App;
