import React from 'react'; 
import { Filter, ToArray } from '../../libs/_arrayutils'; 
import { useRefGetSet, GetSet } from './feedback.component'; 
import { IsEmpty } from '../../libs/_utils'; 


/*export function FeedbackCruds() { 
  const {Get} = useContext(FeedbackContext); */

export function FeedbackCruds({feedbackRef}:{feedbackRef:React.MutableRefObject<GetSet>}) { 
  const {Get} = useRefGetSet(feedbackRef); 
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
  const [filtered] = Filter(errMsg, (e, i, a, msg) => !msg.includes(e)); 
  return filtered; 
} 