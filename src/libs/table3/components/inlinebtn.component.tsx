import { useContext } from 'react'; 
import { InlineTableContext } from '../hook/inlinetable.hook'; 
import { InlineEntryContext } from '../hook/inlineentry.hook'; 
import { RowContext } from '../components/rowcol.components'; 


// Create Btn ---------------------------------------------
export function InlineCreateBtn() { 
  const {Create} = useContext(InlineTableContext); 

  const CreateBtn = { 
    mode:'create', 
    labels:{affirm:'Create', confirm:'Confirm', cancel:'Cancel'}, 
    action:Create, 
  } 
  return <InlineBtn {...CreateBtn} /> 
} 


// Update Delete Btn ---------------------------------------------
export function InlineUpdateDeleteBtn() { 
  const {Update, Delete} = useContext(InlineTableContext); 
  
  const UpdateBtn = { 
    mode:'update', 
    labels:{affirm:'Update', confirm:'Confirm', cancel:'Cancel'}, 
    action:Update, 
  } 

  const DeleteBtn = { 
    mode:'delete', 
    labels:{affirm:'Delete', confirm:'Confirm', cancel:'Cancel'}, 
    action:Delete, 
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
  action:(entry:IEntry)=>Promise<ICrudResponse>, 
} 
export function InlineBtn({mode, labels, action}:IInlineBtn) { 
  const {inlineState, SetInlineState, ResetInlineState} = useContext(InlineTableContext); 
  const {entry, isSelected} = useContext(InlineEntryContext); 
  const {row} = useContext(RowContext); 

  if(isSelected && inlineState.mode === mode) 
    return <div>
      <div><button onClick={() => action(entry)}>{labels.confirm}</button></div>
      <div><button onClick={ResetInlineState}>{labels.cancel}</button></div>
    </div>
  if(isSelected && inlineState.mode != mode) 
    return <div></div>; 
  return <div> 
    <button onClick={() => SetInlineState({row, mode}) }>{labels.affirm}</button>
  </div> 
} 
