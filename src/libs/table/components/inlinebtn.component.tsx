import { useContext } from 'react'; 
import { TableContext } from '../hooks/usetable.hook'; 
import { InlineEntryContext } from '../hooks/useinlineentry.hook'; 
import { InlineTableContext } from '../hooks/useinlinetable.hook'; 


// Create Btn ---------------------------------------------
export function InlineCreateBtn() { 
  const {entry} = useContext(InlineEntryContext); 
  const {Create} = useContext(InlineTableContext); 
  async function CreateEntry() { 
    return await Create(entry); 
  } 
  const CreateBtn = { 
    mode:'create', 
    labels:{affirm:'Create', confirm:'Confirm', cancel:'Cancel'}, 
    action:CreateEntry, 
  } 
  return <InlineBtn {...CreateBtn} /> 
} 


// Update Delete Btn ---------------------------------------------
export function InlineUpdateDeleteBtn() { 
  const {entry} = useContext(InlineEntryContext); 
  const {Update, Delete} = useContext(InlineTableContext); 

  async function UpdateEntry() { 
    return await Update(entry); 
  } 

  async function DeleteEntry() { 
    return await Delete(entry); 
  } 
  
  const UpdateBtn = { 
    mode:'update', 
    labels:{affirm:'Update', confirm:'Confirm', cancel:'Cancel'}, 
    action:UpdateEntry, 
  } 

  const DeleteBtn = { 
    mode:'delete', 
    labels:{affirm:'Delete', confirm:'Confirm', cancel:'Cancel'}, 
    action:DeleteEntry, 
  } 

  return <div>
    <InlineBtn {...UpdateBtn} /> 
    <InlineBtn {...DeleteBtn} /> 
  </div>
} 

// Inline Btn ---------------------------------------------
interface IInlineBtn { 
  mode:string, 
  labels:{affirm:string, confirm:string, cancel:string}, 
  action:()=>Promise<ICrudResponse>, 
} 
export function InlineBtn({mode, labels, action}:IInlineBtn) { 
  const {GetRowCol} = useContext(TableContext); 
  const {inlineTableState, SetInlineTableState, ResetInlineTableState} = useContext(InlineTableContext); 
  const {row, col} = GetRowCol(); 

  if(inlineTableState.mode === 'read') 
    return <div> 
      <button onClick={() => SetInlineTableState({row, mode}) }>{labels.affirm}</button>
    </div> 
  if(inlineTableState.mode === mode) 
    return <div>
      <div><button onClick={action}>{labels.confirm}</button></div>
      <div><button onClick={ResetInlineTableState}>{labels.cancel}</button></div>
    </div>
  return <div></div>; 
} 
