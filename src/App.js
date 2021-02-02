import React , {useState , useEffect,useCallback,useMemo} from 'react';
import {ThemeProvider} from '@emotion/react'; //處理UI畫面
import fetch from "cross-fetch";
import {Container,theme} from "./layout";
import {getMoment} from "./utils/helpers";
import WeatherCard from './views/WeatherCard';
import WeatherSetting from  './views/WeatherSetting';
import useWeatherAPI from "./hooks/useWeatherAPI";

const AUTHORIZATION_KEY = "CWB-28B26F3B-AAE9-4D5B-8AED-A89A17B8E92A";
const LOCATION_NAME = "臺北";
const LOCATION_NAME_FORECAST = "臺北市";



function App() {
    //Theme狀態設定
    const [Theme ,setTheme ] = useState('light');
    const [currentPage , setCurrentPage] = useState("WeatherCard");
    const moment = useMemo(() =>getMoment(LOCATION_NAME_FORECAST),[]);
    //氣象資料設定
    const [weatherElement ,fetchData] = useWeatherAPI({
        locationName : LOCATION_NAME ,
        cityName : LOCATION_NAME_FORECAST ,
        authorizationKey : AUTHORIZATION_KEY
    });

    const handleCurrentPage = (currentPage)=>{
        setCurrentPage(currentPage);
    }

    //使用解構賦值簡化程式碼
    return (
        <ThemeProvider theme={theme[Theme]}>
            <Container>
                {
                    currentPage ==='WeatherCard' &&
                    <WeatherCard weatherElement={weatherElement} moment={moment} fetchData={fetchData} handleCurrentPage ={handleCurrentPage}
                    />
                }

                {
                    currentPage ==='WeatherSetting' && <WeatherSetting handleCurrentPage={handleCurrentPage}/>
                }
            </Container>
        </ThemeProvider>
    );
}

export default App;
