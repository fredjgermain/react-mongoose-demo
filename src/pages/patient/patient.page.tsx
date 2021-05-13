import React from 'react'; 
import { usePatient, IUsePatient } from './hooks/usepatient.hook'; 
import { PatientProfile } from './components/patientprofile.component'; 
//import { PatientFeedback } from './components/patient.feedback'; 
import { RedirectBtn } from '../../components/redirector/redirectbtn.component';
import { SessionsDebug } from '../../components/sessiondebug/sessiondebug.component'; 


import '../../css/main.css'; 

export const PatientContext = React.createContext({} as IUsePatient); 
export default function PatientPage() { 
  const context = usePatient(); 
  const {ready} = context; 

  return <PatientContext.Provider value={context}> 
    <h1>Patient section</h1> 

    {JSON.stringify(ready)} 
    <PatientProfile/> 
    <RedirectBtn {...{condition:!ready, target:"questionnaire"}} /> 
  </PatientContext.Provider> 
} 
// <SessionsDebug {...{sessionNames:['profile', 'questionnaire']}} /> 

