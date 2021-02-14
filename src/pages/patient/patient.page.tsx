import React from 'react'; 
import {PatientId} from './components/patientid.component'; 
import {PatientProfile} from './components/patientprofile.component'; 
import {Questionnaire} from '../questionnaire/questionnaire.page'; 

import {IUsePatient, usePatient, EPatientSteps} from './usepatient.hook'; 

//import {} from '' 
//import {RamqIdentification} from './components/ramqidentitication.component'; 



export const PatientContext = React.createContext({} as IUsePatient); 
// PATIENT PAGE =================================
export default function Patient() { 
  const context = usePatient(); 
  const {ready, patientStep} = context; 

  return <PatientContext.Provider value={context}> 
    {ready && patientStep === EPatientSteps.IDENTIFICATION && <PatientId/>} 
    {ready && patientStep === EPatientSteps.PROFILING && <PatientProfile/>} 
    {ready && patientStep === EPatientSteps.QUESTIONNAIRE && <Questionnaire/>} <br/>
  </PatientContext.Provider> 
} 

/*
{!IsEmpty(activeCollection) && IsEmpty(patientProfile) && <PatientProfile/>} 
      
*/