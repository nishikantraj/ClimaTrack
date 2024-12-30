export interface Cordinates {
    lat:number;
    lon: number
}

export interface WeatherCondition{
    id: number,
    main:string,
    description:string,
    icon:string
}

export interface WeatherData{
    coord: Cordinates;
    weather: WeatherCondition;
    main:{
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    wind:{
        speed:number;
        degree: number
    };
    sys:{
        sunrise:number;
        sunset:number,
        country:string
    }
    name:string,
    date:number
}

export interface ForeCastData{
    list: Array<{
        dt: number;
        main: WeatherData["main"];
        weather: WeatherData["weather"];
        wind: WeatherData["wind"];
        dt_text:string;
    }>;
    city:{
        name:string;
        country:string;
        sunrise:number;
        sunset:number;
    }
}

export interface GeoCodingResponse{
    name: string;
    local_names?: Record<string, string>;
    lat:number;
    lon:number;
    country: string;
    state?: string; 
}