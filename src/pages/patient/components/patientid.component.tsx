import React, {useContext, useState} from 'react'; 
import {CrudContext} from '../../../reusable/_crud'; 
import {EActionType} from '../../../reusable/_dao'; 
import {Reader, Editor} from '../../../reusable/_input'; 



// PATIENT ID ============================================= 
export function PatientId () { 
  const {activeEntry, setActiveEntry, setActiveMode, activeCollection} = useContext(CrudContext); 
  const {entries, ifields} = activeCollection; 
  const ramqField = ifields.find(f => f.accessor==='ramq') as IField; 
  const [value, setValue] = useState(''); 
  
  function IdentifyPatient(ramq:string) { 
    const found = entries.find( e => { 
      const e_ramq = (e['ramq'] as string); 
      return e_ramq.toLowerCase() === ramq.toLowerCase(); 
    }); 
    if(found) { 
      setActiveEntry(found); 
      setActiveMode(EActionType.UPDATE); 
    } 
    else { 
      setActiveEntry({...activeEntry, ramq}); 
      setActiveMode(EActionType.CREATE); 
    } 
  } 

  function Valid() { 
    return ramqField.validators?.every( valid => valid(value) ); 
  } 

  return <div> 
    <h2>Patient identification</h2> 
    <div> 
      <span>Ramq: </span> 
      <Editor {...{value, setValue, ifield:ramqField}} /> 
      <span>{Valid() ? '✓' : 'x'}</span> 
    </div> 
    <button onClick={() => IdentifyPatient(value)}>Identify</button> 
  </div> 
}
