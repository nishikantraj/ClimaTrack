import { useState } from 'react'
import { Button } from './ui/button'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'
import { Loader2, Search } from 'lucide-react'
import { useLocations } from '@/hooks/useWeatherQuery'
import { useNavigate } from 'react-router-dom'

const CitySearch = () => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    const {data:locations, isLoading} = useLocations(query);

    const handleSelect= (cityData:string)=>{
        const [lat,lon,name, country] = cityData.split("|")
        //Add to Search History
        
        setOpen(false)
        navigate(`/city/${name}?lat=${lat}&&lon=${lon}`)    
    }
    
  return (
    <>
        <Button
            variant="outline"
            onClick={()=> setOpen(true)}
            className='relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
        >
            <Search className='mr-2 h-4 w-4'/>
            Search Cities...
        </Button>
        
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput 
                placeholder="Search cities..."
                value={query}
                onValueChange={setQuery}
             />
            <CommandList>
                {query.length>2 && !isLoading &&(<CommandEmpty>No cities found.</CommandEmpty>)}
                <CommandGroup heading="Favorites">
                    <CommandItem>Calendar</CommandItem>
                </CommandGroup>

                <CommandSeparator/>

                <CommandGroup heading="Recent Searches">
                    <CommandItem>Calendar</CommandItem>
                </CommandGroup>

                <CommandSeparator/>

                {locations && locations.length > 0 && (
                    <CommandGroup heading="Suggestions">
                        {isLoading && (
                            <div className='flex items-center justify-center p-4'>
                                <Loader2 className='h-4 w-4 animate-spin'/>
                            </div>
                        )}

                        {locations.map((location)=>{
                            return (
                                <CommandItem
                                    className='cursor-pointer'
                                    key={`${location.lat}-${location.lon}`}
                                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                    onSelect={handleSelect}
                                >
                                    <Search className='h-4 w-4 mr-2'/>
                                    <span>
                                        {location.name}
                                    </span>
                                    {location.state &&(
                                        <span className='text-sm text-muted-foreground'>
                                            , {location.state}
                                        </span>
                                    )}
                                    <span className='text-sm text-muted-foreground'>
                                        , {location.country}
                                    </span>
                                </CommandItem>
                            )
                        })}

                    </CommandGroup>
                )}
            </CommandList>
        </CommandDialog>

    </>
  )
}

export default CitySearch