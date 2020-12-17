import React, { useContext } from 'react'; 
import {InputTableContext} from './inputtable'; 
import {InputRowContext} from './inputrows'; 

// CREATE BTN ===================================
interface ICreateBtn { 
  createLabel: { 
    action: string; 
    confirm: string; 
    cancel: string; 
  }; 
  onCreate: CrudFunc; 
} 

export function CreateBtn({createLabel, onCreate}:ICreateBtn) { 
  const {tableHook:{CrudAction, GetActiveHook: GetActiveMode, ActivateHook}} = useContext(InputTableContext); 
  const {row} = useContext(InputRowContext); 
  const mode = 'create'; 

  // RENDER -------------------------------------
  if(GetActiveMode(row) === mode) 
    return <td> 
      <button onClick={() => CrudAction(onCreate)}>{createLabel.confirm}</button> 
      <button onClick={() => ActivateHook()}>{createLabel.cancel}</button> 
    </td> 

  return <td> 
      <button onClick={() => {ActivateHook(mode, row)}}>{createLabel.action}</button> 
    </td> 
} 

// UPDATE DELETE BTN ============================
interface IUpdateDeleteBtn { 
  updateLabel: { 
    action: string; 
    confirm: string; 
    cancel: string; 
  }; 
  deleteLabel: { 
    action: string; 
    confirm: string; 
    cancel: string; 
  }; 
  onUpdate: CrudFunc; 
  onDelete: CrudFunc; 
} 
export function UpdateDeleteBtn({updateLabel, deleteLabel, onUpdate, onDelete}:IUpdateDeleteBtn) { 
  const {tableHook:{CrudAction, GetActiveHook: GetActiveMode, ActivateHook}} = useContext(InputTableContext); 
  const {row} = useContext(InputRowContext); 

  // RENDER -------------------------------------
  if(GetActiveMode(row) ==='update') 
    return <td> 
      <button onClick={() => CrudAction(onUpdate)}>{updateLabel.confirm}</button> 
      <button onClick={() => ActivateHook()}>{updateLabel.cancel}</button> 
    </td> 

  if(GetActiveMode(row) ==='delete') 
    return <td> 
      <button onClick={() => CrudAction(onDelete)}>{deleteLabel.confirm}</button> 
      <button onClick={() => ActivateHook()}>{deleteLabel.cancel}</button> 
    </td> 
  
  return <td> 
      <button onClick={() => ActivateHook('update', row)}>{updateLabel.action}</button> 
      <button onClick={() => ActivateHook('delete', row)}>{deleteLabel.action}</button> 
    </td> 
} 

// INPUT ROW BTN ================================
interface IInputRowBtn { 
  label?: string; 
  onCreate: CrudFunc; 
  onUpdate: CrudFunc; 
  onDelete: CrudFunc; 
} 
export default function InputRowBtn({label, onCreate, onUpdate, onDelete}:IInputRowBtn) { 
  const {tableHook:{CrudAction, GetActiveHook: GetActiveMode, ActivateHook}} = useContext(InputTableContext); 
  const {row} = useContext(InputRowContext); 

  // RENDER -------------------------------------
  if(GetActiveMode(row) ==='create') 
    return <td> 
      <button onClick={() => CrudAction(onCreate)}>Confirm Create</button> 
      <button onClick={() => ActivateHook()}>Cancel Create</button> 
    </td> 
  if(row === -1) 
    return <td> 
      <button onClick={() => {ActivateHook('create', row)}}>Create</button> 
    </td>
  
  if(GetActiveMode(row) ==='update') 
    return <td> 
      <button onClick={() => CrudAction(onUpdate)}>Confirm Update</button> 
      <button onClick={() => ActivateHook()}>Cancel Update</button> 
    </td> 

  if(GetActiveMode(row) ==='delete') 
    return <td> 
      <button onClick={() => CrudAction(onDelete)}>Confirm Delete</button> 
      <button onClick={() => ActivateHook()}>Cancel Delete</button> 
    </td> 
  
  return <td> 
      <button onClick={() => ActivateHook('update', row)}>Update</button> 
      <button onClick={() => ActivateHook('delete', row)}>Delete</button> 
    </td> 
}


