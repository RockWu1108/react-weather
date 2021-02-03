import React , {useState , useEffect,useCallback,useMemo} from 'react';
import {ThemeProvider} from '@emotion/react'; //處理UI畫面
import fetch from "cross-fetch";
import {Container,theme} from "./layout";
import {getMoment ,findLocation} from "./utils/helpers";
import WeatherCard from './views/WeatherCard';
import WeatherSetting from  './views/WeatherSetting';
import useWeatherAPI from "./hooks/useWeatherAPI";

const AUTHORIZATION_KEY = "CWB-28B26F3B-AAE9-4D5B-8AED-A89A17B8E92A";
// const LOCATION_NAME = "臺北";
// const LOCATION_NAME_FORECAST = "臺北市";



function App() {

    //Theme狀態設定
    const [Theme ,setTheme ] = useState('light');
    const storageCity = localStorage.getItem('cityName') || '臺北市';
    const [currentPage , setCurrentPage] = useState("WeatherCard");
    const [currentCity , setCurrentCity] = useState(storageCity);
    //氣象資料設定

    const handleCurrentPage = (currentPage)=>{
        setCurrentPage(currentPage);
    }

    const handleCurrentCity = (currentCity)=>{
        setCurrentCity(currentCity);
    }


    const currentLocation = useMemo(()=> findLocation(currentCity) ,[currentCity] );

    console.log("currentLocation",currentLocation);
    const{cityName , locationName , sunriseCityName} = currentLocation;


    const moment = useMemo(() =>getMoment(sunriseCityName),[sunriseCityName]);


    const [weatherElement ,fetchData] = useWeatherAPI({
        locationName  ,
        cityName  ,
        authorizationKey : AUTHORIZATION_KEY
    });
    console.log("weatherElement: ",weatherElement)

    useEffect(() => {
        setTheme(moment === 'day' ? 'light' : 'dark');
    }, [moment]);

    //使用解構賦值簡化程式碼
    return (
        <ThemeProvider theme={theme[Theme]}>
            <Container>
                {
                    currentPage ==='WeatherCard' &&
                    <WeatherCard cityName={cityName} weatherElement={weatherElement} moment={moment} fetchData={fetchData}  handleCurrentPage ={handleCurrentPage}
                    />
                }

                {
                    currentPage ==='WeatherSetting' && <WeatherSetting cityName={cityName} handleCurrentCity={handleCurrentCity} handleCurrentPage={handleCurrentPage}/>
                }
            </Container>
        </ThemeProvider>
    );
}

export default App;
