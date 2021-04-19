import { useState } from 'react';
import { Session } from '../../libs/_session'; 


export function SessionDebug({sessionName}:{sessionName:string}) {
  const [value, setValue] = useState(Session.Get(sessionName)); 
  const EndSession = () => { 
    Session.EndSession(sessionName); 
    setValue(Session.Get(sessionName)); 
  } 

  return <div> 
    {JSON.stringify(value)} <br/> 
    <button onClick={EndSession}>End Session</button> 
  </div> 
} 


export function SessionsDebug({sessionNames}:{sessionNames:string[]}) { 
  

  function Refresh() { 
    window.location.reload(false); 
  } 

  return <div> 
    {sessionNames.map( (s,i) => { 
      return <SessionDebug key={i} sessionName={s} /> 
    })} 
    <button onClick={Refresh} >Refresh</button> <br/> 
  </div> 
} 