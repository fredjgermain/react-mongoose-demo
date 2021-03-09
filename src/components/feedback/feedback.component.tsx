import { useState } from 'react'; 
import { Filter } from '../../reusable/_arrayutils';

import '../../css/feedback.css'; 
import { IsEmpty } from '../../reusable/_utils';

export const feedback = { 
  value: () => [] as ICrudResponse[], 
  setValue:(responses:ICrudResponse[]) => console.log(responses), 
}; 

export function Feedback() { 
  const [value, setValue] = useState([] as ICrudResponse[]); 
  feedback.value = () => value; 
  feedback.setValue = (responses:ICrudResponse[]) => setValue(responses); 

  return <div> 
    Feedback !! : {JSON.stringify(value)} <br/> 
    <DisplayFeedBack responses={value} /> 
    <button onClick={() => feedback.setValue([] as ICrudResponse[]) }>Reset Feedback</button> 
  </div> 
} 


function DisplayFeedBack({responses}:{responses:ICrudResponse[]}) { 
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
