import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { useGeoLocation } from "@/hooks/useGeoLocation"
import { useForecastQuery, useReverseGeoCodeCQuery, useWeatherQuery } from "@/hooks/useWeatherQuery";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react"


const WeatherDashboard = () => {
  const {cordinates,error,getLocation,isLoading} = useGeoLocation();

  const weatherQuery = useWeatherQuery(cordinates)
  const forecastQuery = useForecastQuery(cordinates)
  const geoLocation = useReverseGeoCodeCQuery(cordinates)
  
  const handleRefresh =()=>{
    getLocation()

    if(cordinates){
      weatherQuery.refetch()
      forecastQuery.refetch()
      geoLocation.refetch()
    }
  }

  if(isLoading){
    return <WeatherSkeleton/>
  }

  if(error){
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{error}</p>

          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4"/>Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }
  if(!cordinates){
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable your location to see the weather.</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4"/>Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  const locationName = geoLocation.data?.[0];
  
  if(weatherQuery.error || forecastQuery.error){
    return <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
              <p>Failed to fetch weather data. Please try again.</p>

              <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
                <RefreshCcw className="mr-2 h-4 w-4"/>Retry
              </Button>
            </AlertDescription>
          </Alert>
  }

  if(!weatherQuery.data || !forecastQuery.data){
    return <WeatherSkeleton/>
  }
  // console.log(weatherQuery);
  // // console.log(geoLocation.data);
  // // console.log(locationName);
  

  return (
    <div className="space-y-4">
      {/* Favourite City */}
      <div className="flex justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button 
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
          >
          <RefreshCcw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin": ""}`}/>
        </Button>
      </div>

      {/* Current , hourly Weather, details and forecast */}
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} locationName={locationName}/>
          <HourlyTemperature data={forecastQuery.data}/>
        </div>


        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* details */}
          <WeatherDetails data={weatherQuery.data}/>
          {/* forecast */}
          <WeatherForecast data={forecastQuery.data}/>
        </div>
      </div>

    </div>
  )
}

export default WeatherDashboard