import { useContext } from 'react'; 
import { AdminContext } from '../admin.page'; 
import { EntryContext } from './entry.component'; 



// Create Btn ---------------------------------------------
export function InlineCreateBtn() {
  const {CreateUpdateEntry} = useContext(EntryContext); 
  const CreateBtn = {mode:'create', action:CreateUpdateEntry, labels:{affirm:'Create', confirm:'Confirm', cancel:'Cancel'}} 

  return <span> 
    <InlineBtn {...CreateBtn}/> 
  </span> 
}



// Update Delete btn --------------------------------------
export function InlineUpdateDeleteBtn() { 
  const {CreateUpdateEntry, DeleteEntry} = useContext(EntryContext); 
  const UpdateBtn = {mode:'update', action:CreateUpdateEntry, labels:{affirm:'Update', confirm:'Confirm', cancel:'Cancel'}} 
  const DeleteBtn = {mode:'delete', action:DeleteEntry, labels:{affirm:'Delete', confirm:'Confirm', cancel:'Cancel'}} 

  return <span> 
    <InlineBtn {...UpdateBtn} /> 
    <InlineBtn {...DeleteBtn} /> 
  </span> 
} 



// Inline Btn ---------------------------------------------
export function InlineBtn({...props}:{mode:string, labels:{affirm:string, confirm:string, cancel:string}, action:()=>Promise<void>}) { 
  const {editMode, index} = useContext(EntryContext); 
  const {SetEditingMode} = useContext(AdminContext); 

  if(editMode === 'read') 
    return <span> 
      <button onClick={() => SetEditingMode(index, props.mode) }>{props.labels.affirm}</button>
    </span> 
  if(editMode === props.mode) 
    return <span> 
      <button onClick={props.action}>{props.labels.confirm}</button> 
      <button onClick={() => SetEditingMode() }>{props.labels.cancel}</button> 
    </span> 
  return <span>{editMode}</span>; 
} 
