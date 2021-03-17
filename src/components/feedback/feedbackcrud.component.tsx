import React, { useContext } from 'react'; 
import { Filter, ToArray } from '../../reusable/_arrayutils'; 
import { FeedbackContext } from './feedback.component'; 
import { IsEmpty } from '../../reusable/_utils'; 


export function FeedbackCruds() { 
  const {Get} = useContext(FeedbackContext); 
  const responses:ICrudResponse[] = IsEmpty(Get()) ? []: ToArray(Get()); 
  const actionType = responses[0]?.actionType; 

  const [successes, failures] = Filter(responses, r => r.success); 
  const errMsgs = ListErrMsgs(failures); 

  return <div> 
    {successes.length > 0 && <h4 className={'success'}>{SuccessesFeedback(actionType, successes.length)}</h4>} <br/> 
    {failures.length > 0 && <div className={'failure'}>
      <h4>{FailuresFeedback(actionType, failures.length)}</h4>
      <ul>
        {errMsgs.map( e => { 
          return <li key={e}>{e}</li> 
        })} 
      </ul> 
    </div>}
  </div> 
}

function SuccessesFeedback(actionType:string, n:number) { 
  return n > 1 ? 
    `${n} items have been ${actionType}d`: 
    `${n} item has been ${actionType}d`; 
} 

function FailuresFeedback(actionType:string, n:number) { 
  return n > 1 ? 
    `${n} items have failed to ${actionType}d`: 
    `${n} item has failed to ${actionType}d`; 
} 

function ListErrMsgs(failures:ICrudResponse[]) {
  let errMsg:string[] = []; 
  failures.forEach( f => { 
    const errs = f.err.map(e => JSON.stringify(e)); 
    errMsg = [...errMsg, ...(errs ?? [])]; 
  }) 
  const [filtered] = Filter(errMsg, (e, msg) => !msg.includes(e)); 
  return filtered; 
} 