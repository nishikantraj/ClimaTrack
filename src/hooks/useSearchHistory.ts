import { useLocalStorage } from "./useLocalStorage";


interface searchHistoryItems{
    id:number;
    query:string;
    lat:number;
    lon:number;
    name:string;
    country:string;
    state?:string
    searchedAt:number;
}
// export function useSearchHistory(){
//     const [history, setHistory] = useLocalStorage<>("search-history", [])
// }