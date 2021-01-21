import React, {useContext} from 'react'; 
import {DaoContext, EActionType} from '../reusable/_dao'; 


// Feedback =====================================
// detect if action is crud. 

function GetCrudAction() { 
  const {state} = useContext(DaoContext); 
  if(!(state.ready && state.success)) 
    return ''; 
  return state.response['actionType']; 
} 


export function FeedBack() { 
  const {state} = useContext(DaoContext); 

  return <div> 
    {!state.ready && <span>LOADING ... </span>} 
    {state.ready && <span>Ready </span>} 
    {state.ready && state.success && <CrudFeedBack />}
    {state.ready && !state.success && 'an errors occured'} 
  </div> 
} 

function CrudFeedBack() { 
  const {state} = useContext(DaoContext); 
  // assumes state is ready and successful
  const {actionType, success, data, err} = state.response as IResponse; 
  
  const successMsg:any = { 
    create:'Creation succeed', 
    update:'Update succeed', 
    delete:'Deletion succeed', 
  } 
  const errorMsg:any = { 
    create:'Creation failed ', 
    update:'Update failed', 
    delete:'Deletion failed', 
  } 

  return <span>{successMsg[actionType]}</span>
  

  /*if(success) { 
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
  </span> */
} 