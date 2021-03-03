import React, { useContext, useState } from 'react'; 
import { Editor, Reader } from '../../../reusable/_input'; 
import { IsEmpty, GetValueAt } from '../../../reusable/_utils'; 
import { PatientContext } from '../patient.page'; 

import { DaoContext } from '../../../reusable/_dao'; 
import { Objx, Field, Fields, FieldLabel, FieldReader, FieldEditor} from '../../../reusable/_objx'; 




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
