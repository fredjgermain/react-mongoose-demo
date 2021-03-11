import React, { useContext, useState } from 'react'; 
import { Editor, Reader } from '../../../reusable/_input'; 
import { PatientContext } from '../patient.page'; 

import { DaoContext } from '../../../reusable/_dao'; 
import { useStateAt } from '../../../reusable/_customhooks';



export function PatientIdentification () { 
  const {GetIFields, GetDefaultIEntry} = useContext(DaoContext); 
  const {RamqIsValid, IdentifyPatient} = useContext(PatientContext); 
  const [ifield] = GetIFields('patients', ['ramq']); 

  const [Get, Set] = useStateAt(GetDefaultIEntry('patients')); 
  const value = Get(['ramq']); 
  const setValue = (newValue:any) => Set(newValue, ['ramq']); 

  return <div> 
    <h2>Patient identification</h2> 
    <div>
      <label>Ramq:</label><Editor {...{value, setValue, ifield}}/>
      <span>{RamqIsValid(value) ? '✓' : 'x'}</span> 
    </div> 
    <button onClick={() => IdentifyPatient(value)}>Identify</button> 
  </div> 
}




// Patient Identification 
/*export function PatientIdentification() { 
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
*/