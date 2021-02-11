import React, {useContext, useState} from 'react'; 
import {CrudContext} from '../../../reusable/_crud'; 
import {EActionType} from '../../../reusable/_dao'; 
import {IsEmpty} from '../../../reusable/_utils'; 
import {FeedBack} from '../../../components/feedback/feedback.component'; 

import {Objx, Fields, Field, FieldContext, FieldLabel} 
  from '../../../reusable/_objx'; 
import {Reader, Editor} from '../../../reusable/_input'; 
//import {Questionnaire} from '../../questionnaire/questionnaire.page'; 
import {PatientProfileContext} from '../patient.page'; 




// Patient profile ============================== 
export function PatientProfile() { 
  const {state, activeEntry, activeMode, activeCollection, Create, Update} = useContext(CrudContext); 
  const {ifields} = activeCollection; 
  const ramqField = ifields.find(f => f.accessor==='ramq') as IField; 
  const cols = ifields.filter(f => ['firstName', 'lastName'].includes(f.accessor) ); 

  const {setPatientProfile} = useContext(PatientProfileContext); 

  async function UpdateCreateProfile(Func:(accessor:string, entries:IEntry[]) => Promise<void>) { 
    await Func(activeCollection.accessor, [activeEntry]); 
    if(state.success) 
      setPatientProfile(activeEntry); 
  } 

  return <div> 
    <h2>Patient profile</h2> 
    {activeMode} 
    <Objx {...{value:activeEntry, ifields:cols}} > 
      <Field {...{ifield:ramqField}} /> 
      <Fields><div><FieldLabel/><FieldEditor/></div></Fields> 
    </Objx> 
    {activeMode === 'update' && <button onClick={() => UpdateCreateProfile(Update)}>Update patient profile</button>} 
    {activeMode === 'create' && <button onClick={() => UpdateCreateProfile(Create)}>Create new patient profile</button>} 
  </div> 
} 




function FieldEditor() { 
  const {activeEntry, setActiveEntry} = useContext(CrudContext); 
  const {ifield} = useContext(FieldContext); 

  const value = activeEntry[ifield.accessor]; 
  const setValue = (newValue:any) => { 
    const copy = {...activeEntry}; 
    copy[ifield.accessor] = newValue; 
    setActiveEntry(copy); 
  } 
  return <Editor {...{value, setValue, ifield}} /> 
} 


