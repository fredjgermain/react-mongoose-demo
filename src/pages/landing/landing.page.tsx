import { useEffect, useState, useMemo } from "react"
import { setInterval, setTimeout } from "timers"; 


export default function Landing() { 
  return <div> 
    <h1>Heroku is waking up</h1> 
    It should not take long ... 
  </div> 
} 


function TestTimer() { 
  const {timer, StartTimer, StopTimer, ResetTimer} = useTimer(1000); 
  return <div> 
    [ {timer} ] <br/> 
    <button onClick={StartTimer}>Start</button> <br/>
    <button onClick={StopTimer}>Stop</button> <br/>
    <button onClick={ResetTimer}>Reset</button> <br/>
  </div>
}


export function useTimer(interval:number) { 
  const [timer, setTimer] = useState(0); 
  let time:NodeJS.Timeout; 

  const Callback = () => setTimer((prev:any) => prev+1); 
  useEffect(() => { 
    //StartTimer(); 
  }, []) 

  function StartTimer () { 
    time = setInterval(Callback, interval); 
  }
  
  function ResetTimer() { setTimer(0) } 
  function StopTimer () { clearInterval(time) } 

  return {timer, StartTimer, ResetTimer, StopTimer}; 
} 