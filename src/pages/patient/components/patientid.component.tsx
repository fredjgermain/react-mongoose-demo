import React, {useContext, useState} from 'react'; 
import {CrudContext} from '../../../reusable/_crud'; 
import {Reader, Editor} from '../../../reusable/_input'; 
import {PatientContext} from '../patient.page'; 


// PATIENT ID ============================================= 
export function PatientId () { 
  const {GetIFields} = useContext(CrudContext); 
  const {IdentifyPatient, RamqIsValid} = useContext(PatientContext); 
  const [ramqField] = GetIFields('patients', ['ramq']); 
  const [value, setValue] = useState(''); 
  
  return <div> 
    <h2>Patient identification</h2> 
    <div> 
      <span>Ramq: </span> 
      <Editor {...{value, setValue, ifield:ramqField}} /> 
      <span>{RamqIsValid(value) ? '✓' : 'x'}</span> 
    </div> 
    <button onClick={() => IdentifyPatient(value)}>Identify</button> 
  </div> 
}
