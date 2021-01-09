import React, {useContext, useState} from 'react'; 
import {FieldContext, FieldLabel, Fields, Objx, ObjxContext} from '../../../reusable/components/objx/_objx'; 
import {Input} from '../../../reusable/components/input/_input'; 

import {PatientContext} from '../patient.page'; 


// PATIENT IDENTIFICATION ==========================
export function PatientInfos() { 
  const {patient, setPatient, patients:{ifields}, setPatientUpdated} = useContext(PatientContext); 
  

  const UpdatePatient = () => { 
    setPatientUpdated(() => true); 
  }; 

  //<EditField {...{setObj}}/> 
  // RENDER ===================================== 
  return <Objx {...{value:patient, ifields}} > 
      {JSON.stringify(patient)} 
      <Fields> 
        <FieldLabel/> 
        <FieldEdit {...{setObj:setPatient}}/> 
        <br/> 
      </Fields> 
      <button onClick={UpdatePatient}>Save changes</button> 
    </Objx> 
} 



// EDIT FIELD ===================================
function FieldEdit({setObj, rendering}:{setObj: React.Dispatch<any>, rendering?:any}) { 
  const {value:obj} = useContext(ObjxContext); 
  const {ifield} = useContext(FieldContext); 
  const [value, setValue] = useState(obj[ifield.accessor] ?? ifield.defaultValue); 
  const {type, defaultValue} = ifield; 

  const onEnterUp = () => { 
    setObj((prev:any) => { 
      const newObj = {...prev}; 
      newObj[ifield.accessor] = value; 
      return newObj; 
    }); 
  } 
  
  return <Input {...{value, setValue, type, defaultValue, onEnterUp}} /> 
} 