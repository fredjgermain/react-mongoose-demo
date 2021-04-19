import { useEffect, useState } from "react"; 
import { setInterval, setTimeout, clearInterval } from "timers"; 
import { Redirection } from '../../components/redirector/redirector.component'; 


export default function ThankYouPage() { 
  const [redirection, setRedirection] = useState(false); 

  useEffect(() => { 
    const timeout = setTimeout(() => setRedirection(true), 7000); 
  }, []); 

  return <div> 
    {redirection} 
    <h3 className='thankyou success'>Thank you for your time and for completing this questionnaire!</h3> 
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