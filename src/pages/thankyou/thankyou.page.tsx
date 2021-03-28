import { useEffect, useState } from "react"; 
import { setInterval, setTimeout, clearInterval } from "timers"; 
import { Redirection } from '../../components/redirector/redicrector.component'; 


export default function ThankYouPage() { 
  const [redirection, setRedirection] = useState(false); 

  useEffect(() => { 
    const timeout = setTimeout(() => setRedirection(true), 5000); 
  }, []); 

  return <div> 
    {redirection} 
    <h1>Thank you for completing this form</h1> 
    <Redirection {...{condition:redirection, destination:''}}/> 
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


/*
export function useTimeout(timeout:number, Callback:()=>void) { 
  let time:NodeJS.Timeout; 

  const _Callback = () => setTimer((prev:any) => prev+1); 
  useEffect(() => { 
    StartTimer(); 
  }, []) 

  function StartTimer () { 
    time = setInterval(_Callback, timeout); 
  }
  function StopTimer () { clearInterval(time) } 

  return {timer, StopTimer}; 
} 
*/


export function useTimer(interval:number) { 
  const [timer, setTimer] = useState(0); 
  let time:NodeJS.Timeout; 

  const Callback = () => setTimer((prev:any) => prev+1); 
  function StartTimer () { 
    time = setInterval(Callback, interval); 
  }
  
  function ResetTimer() { setTimer(0) } 
  function StopTimer () { clearInterval(time) } 

  return {timer, StartTimer, ResetTimer, StopTimer}; 
} 