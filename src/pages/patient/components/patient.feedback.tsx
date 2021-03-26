import React, { useRef } from 'react'; 
import { useRefGetSet, GetSet } from '../../../components/feedback/feedback.component'; 


export type PatientFeedBackRef = React.MutableRefObject<GetSet>; 
export function usePatientFeedbackRef() { 
  const getset = {Get:()=>{}, Set:(newValue:any)=>{}} as GetSet; 
  return useRef<GetSet>(getset as GetSet); 
} 

export function PatientFeedback({feedbackRef}:{feedbackRef:React.MutableRefObject<GetSet>}) { 
  const {Get, Set} = useRefGetSet(feedbackRef); 
  console.log(Get()); 
  return <div> 
    <em>Patient Feedback</em><br/> 
    {JSON.stringify(Get())} 
    <button onClick={() => Set('testFeedback')} > Feedback</button>
  </div> 
}
