import React, {useContext, useState} from 'react'; 
import {DaoContext, EActionType} from '../../../reusable/_dao'; 
import {IsEmpty} from '../../../reusable/_utils'; 

import {Objx, ObjxContext, Fields, Field, 
  FieldContext, FieldLabel, FieldValue} from '../../../reusable/_objx'; 
import {Reader, Editor} from '../../../reusable/_input'; 



// Patient profile ============================== 
export function PatientProfile() { 
  const {activeEntry, activeMode, activeCollection, Create, Update} = useContext(DaoContext); 
  const {ifields} = activeCollection; 
  const ramqField = ifields.find(f => f.accessor==='ramq') as IField; 
  const cols = ifields.filter(f => ['firstName', 'lastName'].includes(f.accessor) ); 

  if(IsEmpty(activeEntry['ramq'])) 
    return <RamqId /> 
  return <div> 
    {activeMode} 
    <Objx {...{value:activeEntry, ifields}} /> 
    <br/>
    <Objx {...{value:activeEntry, ifields:cols}} > 
      <Field {...{ifield:ramqField}} />
      <Fields><div><FieldLabel/><FieldEditor/></div></Fields> 
    </Objx> 
    {activeMode === 'update' && <button onClick={() => Update(activeCollection.accessor, activeEntry)}>Update patient profile</button>} 
    {activeMode === 'create' && <button onClick={() => Create(activeCollection.accessor, activeEntry)}>Create new patient profile</button>} 
  </div> 
} 



function RamqId () {
  const {activeEntry, setActiveEntry, SetActiveMode, activeCollection} = useContext(DaoContext); 
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
      SetActiveMode(EActionType.UPDATE); 
    } 
    else { 
      setActiveEntry({...activeEntry, ramq}); 
      SetActiveMode(EActionType.CREATE); 
    } 
  } 

  return <div> 
    <div>Ramq: <Editor {...{value, setValue, ifield:ramqField}} /></div> 
    <button onClick={() => IdentifyPatient(value)}>Identify</button> 
  </div> 
}



function FieldEditor() { 
  const {activeEntry, setActiveEntry} = useContext(DaoContext); 
  const {ifield} = useContext(FieldContext); 

  const value = activeEntry[ifield.accessor]; 
  const setValue = (newValue:any) => { 
    const copy = {...activeEntry}; 
    copy[ifield.accessor] = newValue; 
    setActiveEntry(copy); 
  } 
  return <Editor {...{value, setValue, ifield}} /> 
} 





// PATIENT PROFILE ==============================
/*function PatientProfile({ramq}:{ramq:string}) { 
  const {activeCollection, activeEntry, Create, Update, GetForeignElements, GetForeignOptions, GetForeignValues} = useContext(DaoContext); 
  const {ifields} = activeCollection; 
  const cols = ifields.filter(f=> f.label && f.accessor!=='ramq'); 
  const ramqField = ifields.find(f=>f.accessor==='ramq') as IField; 
  //const renderers = BuildDefaultRenderingFunc(GetForeignElements, GetForeignOptions, GetForeignValues); 

  const value = {...activeEntry, ramq}; 

  return <div> 
    <div><Objx {...{value, ifields:cols}}/></div> 
    <Objx {...{value, ifields:cols}}> 
      <Field {...{ifield:ramqField}} /> 
      <Fields> 
        <FieldLabel/> <FieldRenderer {...{renderers}} /><br/> 
      </Fields> 
    </Objx> 
    {activeEntry._id ? 
      <button onClick={()=> Update(activeCollection.accessor, activeEntry)} >Update</button> : 
      <button onClick={()=> Create(activeCollection.accessor, activeEntry)} >Create</button> }
  </div> 
}*/