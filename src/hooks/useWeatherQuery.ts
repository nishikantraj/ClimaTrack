import { Cordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
    weather: (cords:Cordinates)=>["weather",cords] as const,
    forecast: (cords:Cordinates)=>["forecast",cords] as const,
    location: (cords:Cordinates)=>["location",cords] as const,
    serach: (query:string)=>["locatioin-search",query] as const,
} as const;

export const useWeatherQuery = (cordinates:Cordinates|null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(cordinates??{lat:0, lon:0}),
    queryFn:()=> cordinates ? weatherAPI.getCurrentWeather(cordinates) : null,
    enabled: !!cordinates
  });
}

export const useForecastQuery = (cordinates:Cordinates|null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(cordinates??{lat:0, lon:0}),
    queryFn:()=> cordinates ? weatherAPI.getForecast(cordinates) : null,
    enabled: !!cordinates
  });
}

export const useReverseGeoCodeCQuery = (cordinates:Cordinates|null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.location(cordinates??{lat:0, lon:0}),
    queryFn:()=> cordinates ? weatherAPI.reverseGeoCode(cordinates) : null,
    enabled: !!cordinates
  });
}

export const useLocations = (query:string)=>{
  return useQuery({
    queryKey: WEATHER_KEYS.serach(query),
    queryFn:()=> weatherAPI.searchLocations(query),
    enabled: query.length>=3
  });
}