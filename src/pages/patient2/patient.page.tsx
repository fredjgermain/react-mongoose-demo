import React, { useContext, useState } from 'react'; 
import { Editor, Reader } from '../../reusable/_input'; 
import { IsEmpty, GetValueAt } from '../../reusable/_utils'; 
import { usePatient, IUsePatient } from './usepatient.hook'; 

import { DaoContext } from '../../reusable/_dao2'; 
import { Objx, Fields, Field, FieldLabel, FieldValue, FieldEditor, FieldReader } from '../../reusable/_objx';

/* 
if profile and questionnaire are empty; display patientId page. 
if questionnaire is empty; display patientProfile page to createUpdate profile. 
if questionnaire is not empty; display questionnaire. 
*/ 

export const PatientContext = React.createContext({} as IUsePatient); 
export default function PatientPage() { 
  console.log('patient page'); 
  const context = usePatient(); 
  const {profile, questionnaire} = context; 

  //
  return <PatientContext.Provider value={context}> 
    <div>Profile : {JSON.stringify(profile)}</div> 
    <div>Questionnaire : {JSON.stringify(questionnaire)}</div> 
    {IsEmpty(profile) && <PatientIdentification/> } 
    {!IsEmpty(profile) && IsEmpty(questionnaire) && <PatientProfile/> } 
  </PatientContext.Provider> 
} 




export function PatientIdentification() { 
  const {GetIFields, GetDefaultIEntry} = useContext(DaoContext); 
  const {RamqIsValid, IdentifyPatient} = useContext(PatientContext); 
  const [ramqIField] = GetIFields('patients', ['ramq']); 

  const [value, setValue] = useState(GetDefaultIEntry('patients')); 
  const ramq = GetValueAt(value, [ramqIField.accessor]); 

  return <div> 
    <h2>Patient identification</h2> 
    {JSON.stringify(value)} 
    <Objx {...{value, ifields:[ramqIField]}} > 
      <Field {...{ifield:ramqIField}}>
        <div> 
          <FieldLabel/><FieldEditor {...{setValue, editorFunc:Editor}} /> 
          <span>{RamqIsValid(ramq) ? '✓' : 'x'}</span> 
        </div>
      </Field> 
    </Objx> 
    <button onClick={() => IdentifyPatient(ramq)}>Identify</button> 
  </div> 
}


export function PatientProfile() { 
  console.log('patient profile'); 
  const {GetIFields} = useContext(DaoContext); 
  const {profile, CreateUpdateProfile} = useContext(PatientContext); 
  const [ramqIField, ...ifields] = GetIFields('patients', ['ramq', 'firstName', 'lastName']); 

  const [value, setValue] = useState(profile); 

  const btnLabel = !IsEmpty(profile._id) ? 
    'Update patient profile': 
    'Create new patient profile'; 

  return <div> 
    <h2>Patient profile</h2> 
    {JSON.stringify(value)} 
    <Objx {...{value, ifields}} > 
      <Field {...{ifield:ramqIField}} >
        <div><FieldLabel/><FieldReader {...{readerFunc:Reader}} /></div>
      </Field> 
      <Fields {...{ifields}} > 
        <div><FieldLabel/><FieldEditor {...{setValue, editorFunc:Editor}} /></div> 
      </Fields> 
    </Objx> 
    <button onClick={() => CreateUpdateProfile(value)}>{btnLabel}</button>
  </div> 
} 
