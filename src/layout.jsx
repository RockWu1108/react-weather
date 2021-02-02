import styled from "@emotion/styled";
import {ReactComponent as CogIcon} from "../src/images/cog.svg";


 const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeatherCardWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;



const Refresh = styled.div`

  @keyframes rotate{
     from{
        transform : rotate(360deg);
     }
     to{
        transform : rotate(0deg);
     }
  }
  
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation : rotate infinite 1.5s linear; 
    animation-duration: ${({isLoading}) => (isLoading ? '1.5s':'0s')}
`;

const theme = {
 light: {
  backgroundColor: '#ededed',
  foregroundColor: '#f9f9f9',
  boxShadow: '0 1px 3px 0 #999999',
  titleColor: '#212121',
  temperatureColor: '#757575',
  textColor: '#828282',
 },
 dark: {
  backgroundColor: '#1F2022',
  foregroundColor: '#121416',
  boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
  titleColor: '#f9f9fa',
  temperatureColor: '#dddddd',
  textColor: '#cccccc',
 },
};

const Cog = styled(CogIcon)`
  position : absolute;
  top : 30px ;
  right : 30px;
  width : 30px;
  height : 30px;
  cursor : pointer;
`;

export  {
 theme,Refresh,Rain,AirFlow,Container,Celsius,WeatherCardWrapper,
 Location,Description,CurrentWeather,Temperature , Cog
}




