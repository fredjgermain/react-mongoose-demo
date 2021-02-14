import React, {useContext, useState} from 'react'; 
import {CrudContext} from '../../../reusable/_crud'; 
//import {Pick} from '../../../reusable/_arrayutils';

import {Objx, Fields, Field, FieldContext, FieldLabel} 
  from '../../../reusable/_objx'; 
import {Reader, Editor} from '../../../reusable/_input'; 
//import {Questionnaire} from '../../questionnaire/questionnaire.page'; 
import {PatientContext} from '../patient.page'; 



// Patient profile ============================== 
export function PatientProfile() { 
  const {activeEntry, activeMode, GetIFields} = useContext(CrudContext); 
  const {UpdateCreatePatientProfile} = useContext(PatientContext); 
  const [ramqfield, ...ifields] = GetIFields('patients', ['ramq', 'firstName', 'lastName']); 
  
  const btnLabel = activeMode === 'update' ? 'Update patient profile': 'Create new patient profile';

  return <div> 
    <h2>Patient profile</h2> 
    <Objx {...{value:activeEntry, ifields}} > 
      <Field {...{ifield:ramqfield}} /> 
      <Fields><div><FieldLabel/><FieldEditor/></div></Fields> 
    </Objx> 
    <button onClick={UpdateCreatePatientProfile}> 
      {btnLabel} 
    </button> 
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


