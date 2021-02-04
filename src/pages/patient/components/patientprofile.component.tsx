import React, {useContext, useState} from 'react'; 
import {CrudContext} from '../../../reusable/_crud'; 
import {EActionType} from '../../../reusable/_dao'; 
import {IsEmpty} from '../../../reusable/_utils'; 
import {FeedBack} from '../../../components/feedback/feedback.component'; 

import {Objx, Fields, Field, FieldContext, FieldLabel} 
  from '../../../reusable/_objx'; 
import {Reader, Editor} from '../../../reusable/_input'; 
//import {Questionnaire} from '../../questionnaire/questionnaire.page'; 
import {PatientProfileContext} from '../patient.page'; 


// Patient profile ============================== 
export function PatientProfile() { 
  const {activeEntry} = useContext(CrudContext); 

  return <div> 
    {IsEmpty(activeEntry['ramq']) ? 
      <IdPatientProfile />: 
      <UpdateCreatePatientProfile />} 
  </div> 
} 

function UpdateCreatePatientProfile() {
  const {state, activeEntry, activeMode, activeCollection, Create, Update} = useContext(CrudContext); 
  const {ifields} = activeCollection; 
  const ramqField = ifields.find(f => f.accessor==='ramq') as IField; 
  const cols = ifields.filter(f => ['firstName', 'lastName'].includes(f.accessor) ); 

  const {setPatientProfile} = useContext(PatientProfileContext); 

  async function UpdateCreateProfile(Func:(accessor:string, entries:IEntry[]) => Promise<void>) { 
    await Func(activeCollection.accessor, [activeEntry]); 
    if(state.ready && state.success) 
      setPatientProfile(activeEntry); 
  } 

  return <div> 
    <h1>Patient profile</h1> 
    <FeedBack/> 
    {activeMode} 
    <Objx {...{value:activeEntry, ifields:cols}} > 
      <Field {...{ifield:ramqField}} /> 
      <Fields><div><FieldLabel/><FieldEditor/></div></Fields> 
    </Objx> 
    {activeMode === 'update' && <button onClick={() => UpdateCreateProfile(Update)}>Update patient profile</button>} 
    {activeMode === 'create' && <button onClick={() => UpdateCreateProfile(Create)}>Create new patient profile</button>} 
  </div> 
} 


function IdPatientProfile () {
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
    <h1>Patient identification</h1> 
    <div>
      <span>Ramq: </span>
      <Editor {...{value, setValue, ifield:ramqField}} />
      <span>{Valid() ? '✓' : 'x'}</span>
    </div> 
    <button onClick={() => IdentifyPatient(value)}>Identify</button> 
  </div> 
}



function FieldEditor() { 
  const {activeEntry, setActiveEntry} = useContext(CrudContext); 
  const {ifield} = useContext(FieldContext); 

  const value = activeEntry[ifield.accessor]; 
  const setValue = (newValue:any) => { 
    const copy = {...activeEntry}; 
    copy[ifield.accessor] = newValue; 
    setActiveEntry(copy); 
  } 
  return <Editor {...{value, setValue, ifield}} /> 
} 


