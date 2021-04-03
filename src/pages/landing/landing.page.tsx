import { useEffect, useState, useMemo } from "react"; 
import { setInterval, clearInterval } from "timers"; 


export default function Landing() { 
  const [timer, setTimer] = useState(0); 
  
  /*const Callback = () => setTimer((prev:number) => prev+1); 
  useEffect(() => { 
    setInterval( Callback, 1000 ); 
  }, []); */

  return <div className={'landing'}> 
    {timer} 
    <LoadingDots {...{timer}}/> 
    {timer > 0 && <div> 
      <h1>Heroku is waking up</h1> 
      It should not take long  
    </div>} 
  </div> 
} 

function LoadingDots({timer}:{timer:number}) { 
  const nDots = (timer % 3); 
  return <div> 
    {nDots === 0 && '.'} 
    {nDots === 1 && '.'} 
    {nDots === 2 && '.'} 
  </div> 
}