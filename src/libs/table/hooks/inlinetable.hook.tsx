import { useStateReset } from '../../_customhooks'; 
import { IInlineState, IInlineTable, IUseInlineTable } from '../table.types'; 


export function useInlineTable({indexedDatas, defaultEntry, ...props}:IInlineTable) : IUseInlineTable { 
  const [inlineState, SetInlineState, ResetInlineState] = useStateReset({row:'',mode:'read'} as IInlineState); 
  const [feedback, SetFeedback, ResetFeedback] = useStateReset({} as ICrudResponse); 

  function GetEntry(row?:string) { 
    return row ? indexedDatas[row] ?? defaultEntry: defaultEntry; 
  } 

  async function Create(entry:IEntry) { 
    const response = await props.Create(entry); 
    if(response.success) 
      ResetInlineState(); 
    SetFeedback(response); 
    return response; 
  } 

  async function Update(entry:IEntry) { 
    const response = await props.Update(entry); 
    if(response.success) 
      ResetInlineState(); 
    SetFeedback(response); 
    return response; 
  } 

  async function Delete(entry:IEntry) { 
    const response = await props.Delete(entry); 
    if(response.success) 
      ResetInlineState(); 
    SetFeedback(response); 
    return response; 
  } 

  return {indexedDatas, defaultEntry, 
    GetEntry, 
    inlineState, SetInlineState, ResetInlineState, 
    feedback, SetFeedback, ResetFeedback, 
    Create, Update, Delete} 
}