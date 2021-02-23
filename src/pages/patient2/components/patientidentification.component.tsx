import React, { useContext, useState } from 'react'; 
import { Editor, Reader } from '../../../reusable/_input'; 
import { IsEmpty, GetValueAt } from '../../../reusable/_utils'; 
import { PatientContext } from '../patient.page'; 

import { DaoContext } from '../../../reusable/_dao2'; 
import { Objx, Field, FieldLabel, FieldEditor} from '../../../reusable/_objx';


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
