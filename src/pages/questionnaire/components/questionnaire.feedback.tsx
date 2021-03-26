import React, { useRef } from 'react'; 
import { useRefGetSet, GetSet } from '../../../components/feedback/feedback.component'; 


export type QuestionnaireFeedBackRef = React.MutableRefObject<GetSet>; 
export function useQuestionnaireFeedbackRef() { 
  const getset = {Get:()=>{}, Set:(newValue:any)=>{}} as GetSet; 
  return useRef<GetSet>(getset as GetSet); 
} 

export function QuestionnaireFeedback({feedbackRef}:{feedbackRef:React.MutableRefObject<GetSet>}) { 
  const {Get, Set} = useRefGetSet(feedbackRef); 
  return <div> 
    <em>Questionnaire Feedback</em><br/> 
    {JSON.stringify(Get())} 
    <button onClick={() => Set('testFeedback')} > Feedback</button>
  </div> 
}
