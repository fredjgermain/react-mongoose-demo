import React, { useEffect, useState } from 'react'; 
import {PatientId} from './components/patientid.component'; 
import {PatientProfile} from './components/patientprofile.component'; 
import {Questionnaire} from '../questionnaire/questionnaire.page'; 
import {Session, useSession} from '../../reusable/_session'; 

import {IUsePatient, usePatient, EPatientSteps} from './usepatient.hook'; 
import { GetValueAt, SetValueAt } from '../../reusable/_utils';
import { Editor } from '../../reusable/_input';



export const PatientContext = React.createContext({} as IUsePatient); 
// PATIENT PAGE =================================
export default function Patient() { 
  const context = usePatient(); 
  const {ready, patientStep} = context; 
  const {Get, Set, End} = useSession('testSession', 'value'); 
  //End();

  {ready && patientStep === EPatientSteps.QUESTIONNAIRE && <Questionnaire/>} <br/> 

  return <PatientContext.Provider value={context}> 
    {JSON.stringify(Get())} 
    {JSON.stringify(Session.Get('testSession'))} 
    <br/> 
    <button onClick={() => Set('test')} >Test</button> <br/> 
    <button onClick={() => Set('caca')} >Caca</button> <br/> 

    {JSON.stringify(Session.GetSession('patientSession'))} 
    {ready && patientStep === EPatientSteps.IDENTIFICATION && <PatientId/>} 
    {ready && patientStep === EPatientSteps.PROFILING && <PatientProfile/>} 
    
    
    

    <button onClick={() => Session.EndSession('patientSession')}>Clear Session</button> 
  </PatientContext.Provider> 
} 
