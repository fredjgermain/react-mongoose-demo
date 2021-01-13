import React, { useContext } from 'react'; 
import {RowContext} from '../../../reusable/components/tablr/_tablr'; 
import {DaoContext} from './testdao'; 
import {ActiveContext} from './daotablr'; 

// CRUD BTN -------------------------------------
export function CreateBtn() { 
  const {activeCollection:{accessor}, Create} = useContext(DaoContext);
  const action = (entry:any) => Create(accessor, entry); 

  const handle = 'create'; 
  const labels = {affirm:'Create', confirm:'Confirm creation', cancel:'Cancel creation'}; 
  return <CrudBtn {...{handle, labels, action}} /> 
} 

export function UpdateBtn() { 
  const {activeCollection:{accessor}, Update} = useContext(DaoContext);
  const action = (entry:any) => Update(accessor, entry); 

  const handle = 'update'; 
  const labels = {affirm:'Update', confirm:'Confirm update', cancel:'Cancel update'}; 
  return <CrudBtn {...{handle, labels, action}} /> 
} 

export function DeleteBtn() { 
  const {activeCollection:{accessor}, Delete} = useContext(DaoContext);
  const action = (entry:any) => Delete(accessor, entry); 

  const handle = 'delete'; 
  const labels = {affirm:'Delete', confirm:'Confirm deletion', cancel:'Cancel deletion'}; 
  return <CrudBtn {...{handle, labels, action}} /> 
} 


interface CrudBtn { 
  handle: string; 
  labels:{ 
    affirm:string, 
    confirm:string, 
    cancel:string, 
  }; 
  action:(entry:any)=>Promise<void>; 
} 
function CrudBtn ({handle, labels, action}:CrudBtn) { 
  const {row} = useContext(RowContext); 
  const {active, SetActive} = useContext(ActiveContext); 
  const isActive = active.row === row; 
  const isHandled = active.mode === handle; 

  const Affirm = () => SetActive(row, handle); // replace with setActive. 
  const Cancel = () => SetActive(); // replace with with reset. 
  const Confirm = async () => { 
    await action(active.data); 
    SetActive(); 
  } 

  return <span> 
    {isActive && isHandled && <button onClick={Confirm}>{labels.confirm}</button>} 
    {isActive && isHandled && <button onClick={Cancel}>{labels.cancel}</button>} 
    {active.row !== row && <button onClick={Affirm}>{labels.affirm}</button>} 
  </span> 
}