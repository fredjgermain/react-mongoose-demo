import { useContext } from 'react'; 
import { AdminContext } from '../admin.page'; 
import { AdminRowContext } from './adminrow.component'; 



// Create Btn ---------------------------------------------
export function InlineCreateBtn() {
  const {CreateUpdateEntry} = useContext(AdminRowContext); 
  const CreateBtn = {mode:'create', action:CreateUpdateEntry, labels:{affirm:'Create', confirm:'Confirm', cancel:'Cancel'}} 

  return <div> 
    <InlineBtn {...CreateBtn}/> 
  </div> 
}



// Update Delete btn --------------------------------------
export function InlineUpdateDeleteBtn() { 
  const {CreateUpdateEntry, DeleteEntry} = useContext(AdminRowContext); 
  const UpdateBtn = {mode:'update', action:CreateUpdateEntry, labels:{affirm:'Update', confirm:'Confirm', cancel:'Cancel'}} 
  const DeleteBtn = {mode:'delete', action:DeleteEntry, labels:{affirm:'Delete', confirm:'Confirm', cancel:'Cancel'}} 

  return <div> 
    <InlineBtn {...UpdateBtn} /><InlineBtn {...DeleteBtn} /> 
  </div> 
} 



// Inline Btn ---------------------------------------------
export function InlineBtn({...props}:{mode:string, labels:{affirm:string, confirm:string, cancel:string}, action:()=>Promise<void>}) { 
  const {editMode, index} = useContext(AdminRowContext); 
  const {SetEditingMode} = useContext(AdminContext); 

  if(editMode === 'read') 
    return <div> 
      <button onClick={() => SetEditingMode(index, props.mode) }>{props.labels.affirm}</button>
    </div> 
  if(editMode === props.mode) 
    return <div>
      <div><button onClick={props.action}>{props.labels.confirm}</button></div>
      <div><button onClick={() => SetEditingMode() }>{props.labels.cancel}</button></div>
    </div>
  return <div></div>; 
} 
