import { Link } from "react-router-dom"
import { useTheme } from "@/context/DarkTheme"
import { Moon, Sun } from "lucide-react";


const Header = () => {
    const {theme, setTheme} = useTheme();
    const isDark = theme==="dark";
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
        <div className="flex container mx-auto h-16 items-center justify-between">
            <Link to="/">
                <img src={isDark? '/vite.svg': '/vite.svg'} alt="log" className="h-14" />
            </Link>

            <div>
                {/* Search */}
                {/* theme toggle */}
                <div onClick={()=>setTheme(isDark? "light": "dark")} className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark? "rotate-180": "rotate-0"}`}>
                    {isDark? (<Sun className="h-6 w-6 rotate-0 transition-all text-yellow-500"/>):
                        (<Moon className="h-6 w-6 rotate-0 transition-all text-blue-500"/>)}
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header