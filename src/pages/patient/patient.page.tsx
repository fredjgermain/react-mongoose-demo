import React from 'react'; 
import { usePatient, IUsePatient } from './hooks/usepatient.hook'; 
import { PatientProfile } from './components/patientprofile.component'; 
import { PatientFeedback } from './components/patient.feedback'; 
import { RedirectBtn } from '../../components/redirector/redirectbtn.component';

import '../../css/main.css'; 

import { SessionsDebug } from '../../components/sessiondebug/sessiondebug.component'; 

export const PatientContext = React.createContext({} as IUsePatient); 
export default function PatientPage() { 
  //console.log('patient page'); 
  const context = usePatient(); 
  const {feedbackRef, ready} = context; 

  return <PatientContext.Provider value={context}> 
    <h1>Patient section</h1> 

    <PatientFeedback {...{feedbackRef}}/> 
    <PatientProfile/> 
    <RedirectBtn {...{condition:!ready, target:"questionnaire"}} /> 
    <SessionsDebug {...{sessionNames:['profile', 'questionnaire']}} /> 
  </PatientContext.Provider> 
} 


