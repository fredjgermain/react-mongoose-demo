import React, {useContext, useState} from 'react'; 
import {CrudContext} from '../../../reusable/_crud'; 
//import {Pick} from '../../../reusable/_arrayutils';

import {Objx, Fields, Field, FieldContext, FieldLabel} 
  from '../../../reusable/_objx'; 
import {Reader, Editor} from '../../../reusable/_input'; 
//import {Questionnaire} from '../../questionnaire/questionnaire.page'; 
import {PatientContext} from '../patient.page'; 
import { IsEmpty } from '../../../reusable/_utils';



// Patient profile ============================== 
export function PatientProfile() { 
  const {GetIFields} = useContext(CrudContext); 
  const {UpdateCreatePatientProfile, patientProfile} = useContext(PatientContext); 
  const [ramqfield, ...ifields] = GetIFields('patients', ['ramq', 'firstName', 'lastName']); 
  
  const btnLabel = !IsEmpty(patientProfile._id) ? 
    'Update patient profile': 
    'Create new patient profile'; 

  return <div> 
    <h2>Patient profile</h2> 
    <Objx {...{value:patientProfile, ifields}} > 
      <Field {...{ifield:ramqfield}} /> 
      <Fields><div><FieldLabel/><FieldEditor/></div></Fields> 
    </Objx> 
    <button onClick={UpdateCreatePatientProfile}> 
      {btnLabel} 
    </button> 
  </div> 
} 


function FieldEditor() { 
  const {patientProfile, patientSession} = useContext(PatientContext); 
  const {ifield} = useContext(FieldContext); 

  const value = patientProfile[ifield.accessor]; 
  const setValue = (newValue:any) => patientSession.Set(newValue, ['patientProfile', ifield.accessor]) 
  return <Editor {...{value, setValue, ifield}} /> 
} 


