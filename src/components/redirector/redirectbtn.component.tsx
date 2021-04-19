import  { useHistory } from 'react-router-dom'; 

export function RedirectBtn({condition, target}:{condition:boolean, target:string}) { 
  let history = useHistory(); 
  return <button onClick={() => history.push(`/${target}`)} disabled={condition}>Redirect</button> 
}


  