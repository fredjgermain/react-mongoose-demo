import React, {useContext} from 'react'; 
import {CrudContext} from '../../reusable/_crud'; 
import {Arrx} from '../../reusable/_arrx'; 

import '../../css/feedback.css'; 


// Feedback =====================================
export function FeedBack() { 
  const {state} = useContext(CrudContext); 

  return <div> 
    {!state.ready && <span>LOADING ... </span>} 
    {state.ready && <span>Ready </span>} 
    {state.ready && !state.success && 'an errors occured'} 
  </div> 
} 

function CrudFeedBack() { 
  const {state} = useContext(CrudContext); 
  // assumes state is ready and successful 
  const responses = state.response as ICrudResponse[]; // ICrudResponse[] 
  
  return <div> 
    #Responses : {responses.length} 
  </div> 
  /*{actionType, success, data, err} 
  
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

  const className = success ? 'success' : 'failure'; 

  return <div className={className}> 
    <div>{success ? successMsg[actionType] : errorMsg[actionType]}</div> 
    {!success && <Arrx {...{values:(err)}} />} 
    </div> */
} 