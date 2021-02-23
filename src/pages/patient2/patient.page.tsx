import React, { useContext, useState } from 'react'; 
import { Editor, Reader } from '../../reusable/_input'; 
import { IsEmpty, GetValueAt } from '../../reusable/_utils'; 
import { usePatient, IUsePatient } from './usepatient.hook'; 

import { DaoContext } from '../../reusable/_dao2'; 
import { Objx, Fields, Field, FieldLabel, FieldValue, FieldEditor, FieldReader } from '../../reusable/_objx'; 
import {PatientIdentification} from './components/patientidentification.component'; 
import {PatientProfile} from './components/patientprofile.component'; 

/* 
if profile and questionnaire are empty; display patientId page. 
if questionnaire is empty; display patientProfile page to createUpdate profile. 
if questionnaire is not empty; display questionnaire. 
*/ 

export const PatientContext = React.createContext({} as IUsePatient); 
export default function PatientPage() { 
  console.log('patient page'); 
  const context = usePatient(); 
  const {profile, session, questionnaire} = context; 
  
  return <PatientContext.Provider value={context}> 
    <div>Profile : {JSON.stringify(profile)}</div> 
    <div>Session : {JSON.stringify(session)}</div> 
    <div>Questionnaire : {JSON.stringify(questionnaire)}</div> 
    {IsEmpty(profile) && <PatientIdentification/> } 
    {!IsEmpty(profile) && IsEmpty(questionnaire) && <PatientProfile/> } 
  </PatientContext.Provider> 
} 



