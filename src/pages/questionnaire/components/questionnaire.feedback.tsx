import React, { useRef } from 'react'; 
import { useRefGetSet, GetSet } from '../../../components/feedback/feedback.component'; 
import { IsEmpty } from '../../../reusable/_utils';


export type QuestionnaireFeedBackRef = React.MutableRefObject<GetSet>; 
export function useQuestionnaireFeedbackRef() { 
  const getset = {Get:()=>{}, Set:(newValue:any)=>{}} as GetSet; 
  return useRef<GetSet>(getset as GetSet); 
} 

export function QuestionnaireFeedback({feedbackRef}:{feedbackRef:React.MutableRefObject<GetSet>}) { 
  const {Get, Set} = useRefGetSet(feedbackRef); 
  const responses = Get() as ICrudResponse[]; 

  // {responses.every( r => r.success) ? <Success /> : <Error />} 
  return <div> 
    <em>Questionnaire Feedback</em><br/> 
    {!IsEmpty(responses) && <SubmittedResponses {...{responses}} />} 
    <button onClick={() => Set('testFeedback')} >Feedback</button> 
  </div> 
} 

function SubmittedResponses({responses}:{responses:ICrudResponse[]}) { 
  return <div> 
    {responses.every( r => r.success) ? 
      <div className={'success'}> Thank you for completing this form. </div> : 
      <div className={'failure'}> An errors happened. </div> } 
  </div> 
} 
