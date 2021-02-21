import React, {useContext, useState, useEffect} from 'react'; 
import {CrudContext} from '../../../reusable/_crud'; 
//import {Pick} from '../../../reusable/_arrayutils';

import {Objx, Fields, Field, FieldContext, FieldLabel, ObjxContext} 
  from '../../../reusable/_objx'; 
import {Reader, Editor} from '../../../reusable/_input'; 
//import {Questionnaire} from '../../questionnaire/questionnaire.page'; 
import {PatientContext} from '../patient.page'; 
import { GetValueAt, SetValueAt, IsEmpty } from '../../../reusable/_utils'; 
import {useGetSet} from '../../../reusable/_usegetset'; 



// Patient profile ============================== 
export function PatientProfile() { 
  const {GetIFields} = useContext(CrudContext); 
  const {UpdateCreateProfile, patientProfile} = useContext(PatientContext); 
  const [ramqfield, ...ifields] = GetIFields('patients', ['ramq', 'firstName', 'lastName']); 

  const [value, setValue] = useState(patientProfile); 
  
  const btnLabel = !IsEmpty(patientProfile._id) ? 
    'Update patient profile': 
    'Create new patient profile'; 

  return <div> 
    <h2>Patient profile</h2> 
    {JSON.stringify(value)} 
    <Objx {...{value, ifields}} > 
      <Field {...{ifield:ramqfield}} /> 
      <Fields><div><FieldLabel/><FieldEditor {...{setValue}} /></div></Fields> 
    </Objx> 
    <button onClick={() => UpdateCreateProfile(value)}> 
      {btnLabel} 
    </button> 
  </div> 
} 


function FieldEditor({setValue}:{setValue:React.Dispatch<React.SetStateAction<IEntry>>}) { 
  const {value} = useContext(ObjxContext); 
  const {ifield} = useContext(FieldContext); 
  const {accessor, ...args} = useGetSet(value, setValue, ifield.accessor); 

  return <Editor {...{...args, ifield}} /> 
} 

