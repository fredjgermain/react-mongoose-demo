import React from 'react'; 
import { IsEmpty } from '../../reusable/_utils'; 
import { usePatient, IUsePatient } from './usepatient.hook'; 

import { PatientIdentification } from './components/patientidentification.component'; 
import { PatientProfile } from './components/patientprofile.component'; 
import { Questionnaire } from '../questionnaire2/questionnaire.page'; 
import { EActionType } from '../../reusable/_dao'; 


/* 
if profile and questionnaire are empty; display patientId page. 
if questionnaire is empty; display patientProfile page to createUpdate profile. 
if questionnaire is not empty; display questionnaire. 
*/ 

export const PatientContext = React.createContext({} as IUsePatient); 
export default function PatientPage() { 
  console.log('patient page'); 
  const context = usePatient(); 
  const {profile, appointment} = context; 

  const crudResponseTest = [{ 
    actionType:EActionType.CREATE, 
    success: true, 
    data: {}, 
    err: [] 
  } as ICrudResponse]; 
  
  return <PatientContext.Provider value={context}> 
    <div>Profile : {JSON.stringify(profile)}</div> 
    <div>Appointment : {JSON.stringify(appointment)}</div> 
    {IsEmpty(profile) && <PatientIdentification/> } 
    {!IsEmpty(profile) && IsEmpty(appointment) && <PatientProfile/> } 
    {!IsEmpty(profile) && !IsEmpty(appointment) && <Questionnaire/> } 
  </PatientContext.Provider> 
} 



