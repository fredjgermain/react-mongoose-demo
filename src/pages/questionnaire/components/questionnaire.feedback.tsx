import React, { useRef } from 'react'; 
import { useRefGetSet, GetSet } from '../../../components/feedback/feedback.component'; 
import { IsEmpty } from '../../../libs/_utils'; 
import { Redirection } from '../../../components/redirector/redirector.component'; 


export type QuestionnaireFeedBackRef = React.MutableRefObject<GetSet>; 
export function useQuestionnaireFeedbackRef() { 
  const getset = {Get:()=>{}, Set:(newValue:any)=>{}} as GetSet; 
  return useRef<GetSet>(getset as GetSet); 
} 

export function QuestionnaireFeedback({feedbackRef}:{feedbackRef:React.MutableRefObject<GetSet>}) { 
  const {Get} = useRefGetSet(feedbackRef); 
  const responses = Get() as ICrudResponse[]; 

  // {responses.every( r => r.success) ? <Success /> : <Error />} 
  return <div> 
    {!IsEmpty(responses) && <SubmittedResponses {...{responses}} />} 
  </div> 
} 

function SubmittedResponses({responses}:{responses:ICrudResponse[]}) { 
  const completed = responses.every( r => r.success)

  return <div> 
    {completed ? 
      <div className={'success'}> 
        Thank you ... 
        <Redirection {...{condition:completed, destination:'thankyou'}}/> 
      </div> : 
      <div className={'failure'}> An errors happened. </div> } 
  </div> 
} 
