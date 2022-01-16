/* eslint-disable no-unused-vars */
import './App.scss';
import {useState,useEffect} from "react";
import Trial from './Components/Trial';
import { RiSearchLine} from "react-icons/ri";
import DefaultLocation from './Components/DefaultLocation';
import WeatherLocationDetails from './Components/WeatherLocationDetails';
import { BallTriangle } from 'react-loading-icons';
import {gsap } from "gsap";
function App() {
  const [data,setData] = useState([]);
  const [location,setLocation] = useState('London');
  const [child,setChild] = useState('London');
  const [search,setSearch] = useState('london');
  const [enter,setEnter] = useState('london');
  const [menuClick,setMenuClick] = useState(false);
  const [menu,setMenu] = useState(false);
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
  function handleMenuClicked(){
    setMenuClick(!menuClick);
    setMenu(true)
  }
  useEffect(() =>{
    if(menuClick){
      gsap.fromTo('.location-appear',
    {
      x:-150,
      display:'block'
    },
    {
      x:0,
      width:"68%",
      ease:'power1.out',
      duration:0.7
    });
    }
    if(menu && menuClick === false){
      gsap.fromTo('.location-disappear',
        {
          display:'block',
          x:0,
        },
        {
          x:-300,
          duration:1
          
        }
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[menuClick])
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
  // further practice async`
  return (
    <div className='App'>
      <div className='detail'>
        {(typeof data.main != "undefined") ?(
          <div className='weather-container' style = {{backgroundImage:`url(Images/${data.weather[0].main}.webp)`,backgroundPosition:'center',backgroundSize:'cover'}}
          >
            <Trial weatherData={data} menuClickHandler = {handleMenuClicked}/>
            <div className={`location ${menuClick ? "location-appear" : "location-disappear"}`}>
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
          <div className='loading-animation'>
            <BallTriangle />
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
