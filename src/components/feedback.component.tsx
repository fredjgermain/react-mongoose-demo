import React, {useContext} from 'react'; 
import {DaoContext} from '../reusable/dao/_dao'; 


// Feedback =====================================
export function FeedBack() { 
  const {state} = useContext(DaoContext); 

  return <div> 
    {!state.ready && <span>LOADING ... </span>} 
    {state.ready && <span>Ready </span>} 
    {state.ready && state.success && <span>{JSON.stringify(state.response['success'])} </span>} 
    {state.ready && !state.success && 'an errors occured'} 
  </div> 
}