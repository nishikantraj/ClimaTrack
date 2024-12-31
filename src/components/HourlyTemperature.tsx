import { ForeCastData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import {format} from 'date-fns'

interface HourlyTemperatureProps{
    data:ForeCastData;
}

const HourlyTemperature = ({data}:HourlyTemperatureProps) => {
    const chartData = data.list.slice(0,8).map((item)=>({
       time: format(new Date(item.dt *1000),"ha"),
       temp: Math.round(item.main.temp),
       feels_like: Math.round(item.main.feels_like),
    }))
  return (
    <Card className="flex-1">
        <CardHeader>
            <CardTitle>Today's Temperature</CardTitle>        
        </CardHeader>

        <CardContent>
            <div className="h-[200px] w-full">
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <LineChart data={chartData}>
                        <XAxis
                            dataKey="time"
                            fontSize={12}
                            stroke="#888888"
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            fontSize={12}
                            stroke="#888888"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value)=>`${value}°`}
                        />
                        {/* ToolTip */}
                        <Tooltip
                            content={({active, payload})=>{
                                if(active && payload && payload.length){
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">Temperature</span>
                                                    <span>{payload[0].value}°</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">Feels Like</span>
                                                    <span>{payload[1].value}°</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }}
                        />

                        <Line type="monotone" dataKey="temp" stroke="#2563eb" dot={false} />
                        <Line type="monotone" dataKey="feels_like" stroke="#64748b" dot={false} strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
  )
}

export default HourlyTemperature