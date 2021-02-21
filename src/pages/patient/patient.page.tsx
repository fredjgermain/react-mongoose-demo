import React, { useContext } from 'react'; 
import {PatientId} from './components/patientid.component'; 
import {PatientProfile} from './components/patientprofile.component'; 
import {Questionnaire} from '../questionnaire/questionnaire.page'; 
import {Session} from '../../reusable/_session'; 

import {IUsePatient, usePatient} from './usepatient.hook'; 
import {IsEmpty} from '../../reusable/_utils';



export const PatientContext = React.createContext({} as IUsePatient); 
// PATIENT PAGE =================================
export default function Patient() { 
  const context = usePatient(); 
  const {ready, patientSession, patientProfile, questionnaire} = context; 

  return <PatientContext.Provider value={context}> 
    {JSON.stringify(Session.Get('patientSession', ['patientProfile']))} <br/> 
    {JSON.stringify(Session.Get('patientSession', ['questionnaire']))} <br/> 


    <button onClick={() => patientSession.End()}>Clear Session</button> <br/> 
    {ready && IsEmpty(patientProfile) && <PatientId/>} 
    {ready && !IsEmpty(patientProfile) && IsEmpty(questionnaire) && <PatientProfile/>} 
    {ready && !IsEmpty(questionnaire) && <Questionnaire/>} 
  </PatientContext.Provider> 
} 
