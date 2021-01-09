import React, {useContext, useState} from 'react'; 
import {FieldContext, FieldLabel, Fields, Objx, ObjxContext} from '../../../reusable/components/objx/_objx'; 
import {Input} from '../../../reusable/components/input/_input'; 

import {PatientContext} from '../patient.page'; 


// PATIENT IDENTIFICATION ==========================
export function PatientInfos() { 
  const {patient, setPatient, patients:{ifields}, setPatientUpdated} = useContext(PatientContext); 
  const [value, setValue] = useState(patient); 

  const UpdatePatient = () => { 
    setPatient( (prev:any) => { 
      return {...prev, ...value}; 
    }); 
    setPatientUpdated(() => true); 
  }; 

  //<EditField {...{setObj}}/> 
  // RENDER ===================================== 
  return <Objx {...{value, ifields}} > 
      {JSON.stringify(patient)} 
      <Fields> 
        <FieldLabel/> 
        
        <br/> 
      </Fields> 
      <button onClick={UpdatePatient}>Save changes</button> 
    </Objx> 
} 



// EDIT FIELD ===================================
/*function EditField({setObj, rendering}:{setObj: React.Dispatch<any>, rendering?:any}) { 
  const {obj} = useContext(ObjxContext); 
  const {ifield} = useContext(FieldContext); 
  
  const value = obj[ifield.accessor] ?? ifield.defaultValue; // carefull if array etc. 
  const setValue = (newValue:any) => { 
    setObj((prev:any) => { 
      const newObj = {...prev}; 
      newObj[ifield.accessor] = newValue; 
      return newObj}); 
  } 
  const {type, defaultValue} = ifield; 
  return <Input {...{type, defaultValue, value, setValue}} /> 
} */