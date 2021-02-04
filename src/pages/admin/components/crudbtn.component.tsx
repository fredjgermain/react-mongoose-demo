import React, {useContext} from 'react'; 
import {RowContext, TablrContext} from '../../../reusable/_tablr'; 
import {CrudContext} from '../../../reusable/_crud'; 
import {EActionType} from '../../../reusable/_dao'; 



// Create .......................................
export function CreateBtn() { 
  const {activeCollection:{accessor}, Create} = useContext(CrudContext); 
  const action = (entry:any) => Create(accessor, entry); 

  const mode = EActionType.CREATE; 
  const labels = {affirm:'Create', confirm:'Confirm creation', cancel:'Cancel creation'}; 
  return <CrudBtn {...{mode, labels, action}} /> 
} 

// Update .......................................
export function UpdateBtn() { 
  const {activeCollection:{accessor}, Update} = useContext(CrudContext);
  const action = (entry:any) => Update(accessor, entry); 

  const mode = EActionType.UPDATE; 
  const labels = {affirm:'Update', confirm:'Confirm update', cancel:'Cancel update'}; 
  return <CrudBtn {...{mode, labels, action}} /> 
} 

// Delete .......................................
export function DeleteBtn() { 
  const {activeCollection:{accessor}, Delete} = useContext(CrudContext);
  const action = (entry:any) => Delete(accessor, entry); 

  const mode = EActionType.DELETE; 
  const labels = {affirm:'Delete', confirm:'Confirm deletion', cancel:'Cancel deletion'}; 
  return <CrudBtn {...{mode, labels, action}} /> 
} 



// CRUD BTN =====================================
interface CrudBtn { 
  mode: EActionType; 
  labels:{ 
    affirm:string, 
    confirm:string, 
    cancel:string, 
  }; 
  action:(entry:any)=>Promise<void>; 
} 
function CrudBtn ({mode, labels, action}:CrudBtn) { 
  const {activeEntry, activeMode, SetActive, ResetActive, IsActive} = useContext(CrudContext); 
  const {datas} = useContext(TablrContext); 
  const {row} = useContext(RowContext); 
  const id = datas[row] ? datas[row]?._id: ''; 

  const isMode = activeMode === mode; 

  const Affirm = () => { 
    SetActive(id, mode); 
  } 
  const Cancel = () => { 
    ResetActive(); 
  }; 
  const Confirm = async () => { 
    await action(activeEntry); 
    Cancel(); 
  } 

  return <span> 
    {IsActive(id) && isMode && <button onClick={Confirm}>{labels.confirm}</button>} 
    {IsActive(id) && isMode && <button onClick={Cancel}>{labels.cancel}</button>} 
    {!IsActive(id) && <button onClick={Affirm}>{labels.affirm}</button>} 
  </span> 
}