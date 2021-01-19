import React, {useContext} from 'react'; 
import {DaoContext} from '../reusable/dao/_dao'; 


// Feedback =====================================
export function FeedBack() { 
  const {state} = useContext(DaoContext); 

  return <div> 
    {!state.ready && <span>LOADING ... </span>} 
    {state.ready && <span>Ready </span>} 
    {state.ready && state.success && state.response['actionType'] === 'update'} 
    {state.ready && !state.success && 'an errors occured'} 
  </div> 
} 

function CrudFeedBack({response}:{response:IResponse}) { 
  const {actionType, success, data, err} = response; 

  if(success) { 
    return <span> 
      {actionType === 'create' && <span>Successful creation</span>} 
      {actionType === 'update' && <span>Successful update</span>} 
      {actionType === 'delete' && <span>Successful deletion</span>} 
    </span> 
  } 

  return <span> 
    {actionType === 'create' && <span>Failed creation</span>} 
    {actionType === 'update' && <span>Failed update</span>} 
    {actionType === 'delete' && <span>Failed deletion</span>} 
    {<div>{JSON.stringify(err)}</div>} 
  </span> 
} 