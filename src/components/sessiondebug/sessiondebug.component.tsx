import {IUseSession, Session} from '../../reusable/_session'; 

export function SessionDebug({sessionNames}:{sessionNames:string[]}) { 
  
  function Refresh() { 
    window.location.reload(false); 
  } 

  return <div> 
    {sessionNames.map( s => { 
      return <div>
        {s} :  
        {JSON.stringify(Session.Get(s))} <br/>
        <button onClick={() => Session.EndSession(s)} >End Session</button> 
      </div> 
    })} 
    
    <button onClick={Refresh} >Refresh</button> <br/> 
  </div> 
} 