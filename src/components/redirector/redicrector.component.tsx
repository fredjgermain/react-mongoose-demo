import  { Redirect } from 'react-router-dom'; 

interface IRedirection { 
  condition: boolean; 
  destination: string; 
} 

export function Redirection({condition, destination}:IRedirection) { 
  return <div> 
    {condition && <Redirect to={`/${destination}`} />} 
  </div> 
}