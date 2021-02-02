import fetch from "cross-fetch";
import {useState , useEffect , useCallback} from 'react';
const useWeatherAPI = ()=>{

}

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

export default useWeatherAPI;
