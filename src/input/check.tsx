import React from 'react'; 


type Props = { 
  ok:Boolean; 
} 
export default function Check({ok}:Props) { 
  if(ok) 
    return <span className={'feedback_green'} >&#x2714;</span> 
  return <span className={'feedback_red'}>&#x2716;</span> 
}

