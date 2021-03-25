import React, { useContext } from 'react'; 
import  { Redirect } from 'react-router-dom'; 
import { usePatient, IUsePatient } from './hooks/usepatient.hook'; 

//import { PatientIdentification } from './components/patientidentification.component'; 
import { PatientProfile } from './components/patientprofile.component'; 
import { PatientFeedback } from './components/patient.feedback'; 


/* 
if profile and questionnaire are empty; display patientId page. 
if questionnaire is empty; display patientProfile page to createUpdate profile. 
if questionnaire is not empty; display questionnaire. 
*/ 

export const PatientContext = React.createContext({} as IUsePatient); 
export default function PatientPage() { 
  console.log('patient page'); 
  const context = usePatient(); 
  const {feedbackRef} = context; 

  return <PatientContext.Provider value={context}> 
    <ResetProfile/> 
    <PatientFeedback {...{feedbackRef}}/> 
    <PatientProfile/> 
    <QuestionnaireRedirection/> 
  </PatientContext.Provider> 

  /*return <PatientContext.Provider value={context}> 
    {IsEmpty(profile) && <PatientIdentification/> } 
    {!IsEmpty(profile) && IsEmpty(appointment) && <PatientProfile/> } 
    {!IsEmpty(profile) && !IsEmpty(appointment) && <QuestionnairePage/> }
  </PatientContext.Provider> */ 
  // 
  // 
} 


function ResetProfile() { 
  const {TestResetSession, profile} = useContext(PatientContext); 
  return <div> 
    <div>{JSON.stringify(profile)}</div> 
    <button onClick={TestResetSession} >Reset Profile</button> 
  </div> 
} 

function QuestionnaireRedirection() { 
  const {ready} = useContext(PatientContext); 
  // <Redirect to={'Questionnaire'}/> 
  if(ready) 
    return <div> redirecting to questionnaire ... </div>
  return <div>Questionnaire not ready</div>
}



