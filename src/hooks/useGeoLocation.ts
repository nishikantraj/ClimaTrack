import { Cordinates } from "@/api/types"
import { useEffect, useState } from "react";

interface GeoLocationState{
    cordinates: Cordinates | null;
    error: string| null;
    isLoading: boolean;
}
export function useGeoLocation(){
    const [locationData, setlocationData] = useState<GeoLocationState>({
        cordinates: null,
        error: null,
        isLoading: true
    });

    const getLocation = ()=>{
        setlocationData((prev)=>({
            ...prev,
            isLoading: true,
            error: null
        }))

        if(!navigator.geolocation){
            setlocationData({
                cordinates: null,
                error: "Geolocation is not supported by your browser.",
                isLoading:false,
            })
            return
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            setlocationData({
                cordinates:{
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                },
                error:null,
                isLoading:false,
            })
        }, (error)=>{
            let errorMessage: string;

            switch(error.code){
                case error.PERMISSION_DENIED:
                    errorMessage = "Location permission denied. Please give access to the location.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    errorMessage = "Locaton request time out.";
                    break;
                default:
                    errorMessage = "An unknown error occured.";
            }
            setlocationData({
                cordinates: null,
                error: errorMessage,
                isLoading: false,
            })
        },{
            enableHighAccuracy: true,
            timeout:5000,
            maximumAge:0,
        });
    }

    useEffect(() => {
        getLocation()
    }, [])
    
    return {
        ...locationData,
        getLocation,
    }
}