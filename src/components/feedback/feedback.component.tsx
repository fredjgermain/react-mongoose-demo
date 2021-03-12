import React, { useEffect, useState } from 'react'; 
import { Filter } from '../../reusable/_arrayutils'; 

import '../../css/feedback.css'; 

/* 
Type: 
- 0: Success (green) 
- 1: Misc (blue) 
- 2: Warning (yellow) 
- 3: Failure (red) 
*/ 
type FeedbackLine = {type:number, msg:string} 
type FeedbackHook = { 
  getFeedbacks: () => FeedbackLine[], 
  setFeedbacks: React.Dispatch<React.SetStateAction<FeedbackLine[]>> 
} 

export function FeedbackObj({_ref}:{_ref:React.MutableRefObject<FeedbackHook>}) { 
  const [feedbacks, setFeedbacks] = useState([] as FeedbackLine[]); 
  const classNames = ['success', 'note', 'warning', 'failure']; 
  
  useEffect(() => { 
    _ref.current = {getFeedbacks: () => feedbacks, setFeedbacks} as FeedbackHook; 
  }, []); 

  return <ul> 
    {feedbacks.map( (feedback,i) => { 
      return <li key={i} className={classNames[feedback.type]}>{feedback.msg}</li> 
    })} 
  </ul> 
} 




export const feedback = { 
  value: () => [] as ICrudResponse[], 
  setValue:(responses:ICrudResponse[]) => console.log(responses), 
}; 

export function Feedback() { 
  const [value, setValue] = useState([] as ICrudResponse[]); 
  feedback.value = () => value; 
  feedback.setValue = (responses:ICrudResponse[]) => setValue(responses); 

  // Feedback !! : {JSON.stringify(value)} <br/> 
  // <button onClick={() => feedback.setValue([] as ICrudResponse[]) }>Reset Feedback</button> 
  return <DisplayFeedBack responses={value} /> 
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
