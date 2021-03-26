import React, { useRef } from 'react'; 
import { useRefGetSet, GetSet } from '../../../components/feedback/feedback.component'; 


export type PatientFeedBackRef = React.MutableRefObject<GetSet>; 
export function usePatientFeedbackRef() { 
  const getset = {Get:()=>{}, Set:(newValue:any)=>{}} as GetSet; 
  return useRef<GetSet>(getset as GetSet); 
} 

export function PatientFeedback({feedbackRef}:{feedbackRef:React.MutableRefObject<GetSet>}) { 
  const {Get, Set} = useRefGetSet(feedbackRef); 
  const response = Get() as ICrudResponse; 
  
  return <div> 
    <em>Patient Feedback</em><br/> 
    {response.success ? 
      <Success {...{response}} /> : 
      <ListErrMsgs {...{response}}/> } 
    <button onClick={() => Set('testFeedback')} > Feedback</button> 
  </div> 
} 

function Success({response}:{response:ICrudResponse}) { 
  const {firstName, lastName} = response?.data as IPatient; 
  return <div> 
    Welcome {firstName} {lastName}. 
  </div> 
} 

function ListErrMsgs({response}:{response:ICrudResponse}) { 
  const errMsg = response.err; 
  return <ul> 
    {errMsg?.map( e => { 
      return <li className={'failure'}>{e}</li> 
    })} 
  </ul> 
} 