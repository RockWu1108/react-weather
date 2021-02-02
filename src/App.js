import React , {useState , useEffect,useCallback,useMemo} from 'react';
import {ThemeProvider} from '@emotion/react'; //處理UI畫面
import fetch from "cross-fetch";
import {Container,theme} from "./layout";
import {getMoment} from "./utils/helpers";
import WeatherCard from './views/WeatherCard'


const AUTHORIZATION_KEY = "CWB-28B26F3B-AAE9-4D5B-8AED-A89A17B8E92A";
const LOCATION_NAME = "臺北";
const LOCATION_NAME_FORECAST = "臺北市";

const fetchCurrentWeather = () =>{

    return fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME}`)
        .then((response) => response.json())
        .then((data) => {
            const locationData = data.records.location[0];

            //用來取得陣列中特定之欄位內容
            const weatherElements = locationData.weatherElement.reduce(
                (needElements , item) =>{
                    if(['WDSD','TEMP'].includes(item.elementName)){
                        needElements[item.elementName] = item.elementValue;
                    }
                    return needElements;
                },{}
            )

            return{
                locationName: locationData.locationName,
                temperature: weatherElements.TEMP,
                windSpeed: weatherElements.WDSD,
                observationTime: locationData.time.obsTime
            }
        })
        .catch((error)=> console.log(error))
}

const fetchWeatherForecast = ()=>{

   return  fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${AUTHORIZATION_KEY}&locationName=${LOCATION_NAME_FORECAST}`)
        .then((response) => response.json())
        .then((data) => {
            const LocationData = data.records.location[0];
            const weatherElements = LocationData.weatherElement.reduce(
                (needElement , item) =>{
                    if(['Wx','PoP','CI'].includes(item.elementName)){
                        needElement[item.elementName] = item.time[0].parameter;
                    }
                    return needElement;
                } ,{}
            );
            return {
                description: weatherElements.Wx.parameterName,
                weatherCode: weatherElements.Wx.parameterValue,
                rainPossibility: weatherElements.PoP.parameterName,
                comfortAbility: weatherElements.CI.parameterName
            }
        });
}

function App() {
    //Theme狀態設定
    const [Theme ,setTheme ] = useState('light');
    const moment = useMemo(() =>getMoment(LOCATION_NAME_FORECAST),[]);
    //氣象資料設定
    const[weatherElement , setWeatherElement] = useState({
        locationName : '',
        description : '',
        temperature : 0 ,
        windSpeed : 0,
        rainPossibility : 0,
        weatherCode : 0,
        observationTime : new Date(),
        comfortAbility :'',
        isLoading : true
    })

    const  fetchData = useCallback(async () =>{
        setWeatherElement((prevState) =>({
            ...prevState,
            isLoading: true
        }));

        const [currentWeather , weatherForecast] = await Promise.all([
            fetchCurrentWeather(),
            fetchWeatherForecast()
        ]);

        setWeatherElement({
            ...currentWeather ,
            ...weatherForecast,
            isLoading: false
        });

    },[]);

    //第二個參數[] ， 避免產生無限迴圈

    useEffect(()=>{
        fetchData();
        setTheme(moment ==='day' ?'light' : 'dark');
    },[moment]);

    //使用解構賦值簡化程式碼
    return (
        <ThemeProvider theme={theme[Theme]}>
            <Container>
             <WeatherCard weatherElement={weatherElement} moment={moment} fetchData={fetchData}/>
            </Container>
        </ThemeProvider>
    );
}

export default App;
