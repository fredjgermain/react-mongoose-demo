import React, { useContext } from 'react'; 
import {TablrContext} from './tablr'; 
import {RowContext} from './rows'; 




interface IBtn { 
  labels: string[], 
  ConfirmFunc: (activeData:any) => Promise<Boolean>, 
} 

// UpdateDelete Btns ============================
export function UpdateDeleteBtns({updateBtn, deleteBtn}:{updateBtn:IBtn, deleteBtn:IBtn}) { 
  const {UseTablr:{activeData, SetUseActive, GetActiveMode}} = useContext(TablrContext); 
  const {row} = useContext(RowContext); 
  const [updateLabel, confirmUpdate, cancelUpdate] = updateBtn.labels; 
  const [deleteLabel, confirmDelete, cancelDelete] = deleteBtn.labels; 

  async function Confirm(ConfirmFunc:(activeData:any) => Promise<Boolean>) { 
    const result = await ConfirmFunc(activeData); 
    if(result) 
      SetUseActive(); // reset 
  } 

  // Update Mode ----------------------------------
  if(GetActiveMode(row) === 'update') 
    return <span> 
      <button onClick={() => Confirm(updateBtn.ConfirmFunc)} >{confirmUpdate}</button> 
      <button onClick={() => SetUseActive() } >{cancelDelete}</button> 
    </span> 
  
  // Delete Mode ----------------------------------
  if(GetActiveMode(row) === 'delete') 
    return <span> 
      <button onClick={() => Confirm(deleteBtn.ConfirmFunc) } >{confirmDelete}</button> 
      <button onClick={() => SetUseActive() } >{cancelDelete}</button> 
    </span> 

  // Read Mode ----------------------------------
  return <span> 
    <button onClick={() => SetUseActive('update', row ?? -1) } >{updateLabel}</button> 
    <button onClick={() => SetUseActive('delete', row ?? -1) } >{deleteLabel}</button> 
  </span> 
} 



// CREATE BTN ====================================
export function CreateBtn({labels, ConfirmFunc}:IBtn) { 
  const {UseTablr:{activeData, SetUseActive, GetActiveMode, GetEmptyData}} = useContext(TablrContext); 
  const {row} = useContext(RowContext); 
  const [create, confirmCreate, cancelCreate] = labels; 
  const emptyData = GetEmptyData()

  async function Confirm(ConfirmFunc:(activeData:any) => Promise<Boolean>) { 
    const result = await ConfirmFunc(activeData); 
    if(result) 
      SetUseActive() // reset
  } 

  // New Mode ------------------------------------
  if(GetActiveMode(row) === 'create') 
    return <span> 
      <button onClick={() => Confirm(ConfirmFunc)}>{confirmCreate}</button> 
      <button onClick={() => SetUseActive()}>{cancelCreate}</button> 
    </span>

  return <span>
    <button onClick={() => SetUseActive('create', -1, emptyData)}>{create}</button> 
  </span>

}