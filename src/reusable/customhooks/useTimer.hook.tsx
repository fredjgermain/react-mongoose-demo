import { useMemo, useState } from "react"; 
import { setInterval, clearInterval } from "timers"; 


export function useCountDown() { 
  /*const [timer, setTimer] = useState(0); 
  const Callback = () => setTimer((prev:any) => prev+1); 
  const timeout = setTimeout(Callback, 1000); */
} 

export function useAlarm() { 

}

export function useTimer(interval:number) { 
  const [timer, setTimer] = useState(0); 
  let timeout:NodeJS.Timeout = {} as NodeJS.Timeout; 

  function StartTimer () { 
    timeout = useMemo(() => setInterval(Callback, interval), []); 
  }
  
  function ResetTimer() { setTimer(0) } 
  function Callback() { setTimer((prev:number) => prev++) } 
  function StopTimer () { 
    clearInterval(timeout); 
  }

  return {timer, StartTimer, ResetTimer, StopTimer}; 
} 

/*export function useInterval(interval:number, Callback:()=>void) { 
  const [timer, setTimer] = useState(0); 
  const _Callback = () => { 
    setTimer((prev:number) => prev++); 
    Callback(); 
  } 
  const interval = setTimeout(_Callback, interval); 
} */