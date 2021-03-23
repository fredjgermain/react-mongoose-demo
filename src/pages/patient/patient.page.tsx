import React from 'react'; 
import { IsEmpty } from '../../reusable/_utils'; 
import { usePatient, IUsePatient } from './hooks/usepatient.hook'; 

import { PatientIdentification } from './components/patientidentification.component'; 
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
  const {profile, feedbackRef} = context; 

  return <PatientContext.Provider value={context}> 
    <PatientFeedback {...{feedbackRef}}/> 
    {IsEmpty(profile) && <PatientIdentification/> } 
    {!IsEmpty(profile) && <PatientProfile/> } 
  </PatientContext.Provider> 
   
  /*return <PatientContext.Provider value={context}> 
    {IsEmpty(profile) && <PatientIdentification/> } 
    {!IsEmpty(profile) && IsEmpty(appointment) && <PatientProfile/> } 
    {!IsEmpty(profile) && !IsEmpty(appointment) && <QuestionnairePage/> }
  </PatientContext.Provider> */
  // 
  //
} 



