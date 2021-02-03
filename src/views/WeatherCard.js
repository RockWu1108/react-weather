import React from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import WeatherIcon from '../components/WeatherIcon';
import { ReactComponent as AirFlowIcon } from './../images/airFlow.svg';
import { ReactComponent as RainIcon } from './../images/rain.svg';
import { ReactComponent as RefreshIcon } from './../images/refresh.svg';
import { ReactComponent as LoadingIcon } from './../images/loading.svg';
import {Location,Description,CurrentWeather,Temperature,Celsius
    ,AirFlow ,Rain ,Refresh , WeatherCardWrapper ,Cog} from "../layout";
const WeatherCard = ({ cityName , weatherElement, moment, fetchData,handleCurrentPage}) => {
    //解構變數

    const {
        isLoading,
        locationName,
        description,
        temperature,
        windSpeed,
        rainPossibility,
        observationTime,
        comfortAbility,
        weatherCode,} = weatherElement;

    return (
        <WeatherCardWrapper>
            <Cog onClick={()=>handleCurrentPage('WeatherSetting')}/>
            <Location>{cityName}</Location>
            <Description>
                {description} {comfortAbility}
            </Description>
            <CurrentWeather>
                <Temperature>
                    {Math.round(temperature)} <Celsius>°C</Celsius>
                </Temperature>
                <WeatherIcon weatherCode={weatherCode} moment={moment} />
            </CurrentWeather>
            <AirFlow>
                <AirFlowIcon /> {windSpeed} m/h
            </AirFlow>
            <Rain>
                <RainIcon /> {rainPossibility}%
            </Rain>
            <Refresh onClick={fetchData} isLoading={isLoading}>
                最後觀測時間：
                {new Intl.DateTimeFormat('zh-TW', {
                    hour: 'numeric',
                    minute: 'numeric',
                }).format(dayjs(observationTime))}{' '}
                {isLoading ? <LoadingIcon /> : <RefreshIcon />}
            </Refresh>
        </WeatherCardWrapper>
    );
};

export default WeatherCard;
