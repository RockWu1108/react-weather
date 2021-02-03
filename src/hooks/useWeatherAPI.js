import fetch from "cross-fetch";
import {useState , useEffect , useCallback} from 'react';

const fetchCurrentWeather = ({authorizationKey , locationName}) =>{

    return fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}&locationName=${locationName}`)
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

const fetchWeatherForecast = ({authorizationKey , cityName})=>{

    return  fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizationKey}&locationName=${cityName}`)
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

const useWeatherAPI = ({locationName , cityName ,authorizationKey})=>{
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
            fetchCurrentWeather({authorizationKey ,locationName}),
            fetchWeatherForecast({authorizationKey,cityName})
        ]);

        setWeatherElement({
            ...currentWeather ,
            ...weatherForecast,
            isLoading: false
        });

    },[authorizationKey, cityName, locationName]);

    useEffect(()=>{
        fetchData();
    },[fetchData]);

    return [weatherElement , fetchData];
}
export default useWeatherAPI;
