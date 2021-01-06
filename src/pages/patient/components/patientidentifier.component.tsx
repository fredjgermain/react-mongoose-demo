import React, {useState, useContext} from 'react'; 
import {Input} from '../../../reusable/input/_input'; 
import {IsEmpty} from '../../../reusable/utils/_utils'; 

import {PatientContext} from '../patient.page'; 

// Patient Identifier ===========================
export function PatientIdentifier() { 
  const {patient, setPatient, patients:{entries}} = useContext(PatientContext); 
  const [ramq, setRamq] = useState(''); 
  const props = {type:'string', value:ramq, setValue:setRamq, defaultValue:''}; 

  function Identification() { 
    const patient = entries.find((e:any) => e['ramq'] === ramq); 
    if(!IsEmpty(patient)) 
      setPatient( () => patient); 
  } 

  if(IsEmpty(patient)) 
    return <div> 
      <span>RAMQ: </span> 
      <Input {...props} /> 
      <br/> 
      <button onClick={() => Identification() } >Identify</button> 
    </div> 
  return null 
} 
