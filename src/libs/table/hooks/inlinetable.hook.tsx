import React from 'react'; 
import { useStateReset } from '../../_customhooks'; 
import { IInlineState, IInlineTable, IUseInlineTable } from '../table.types'; 


export const InlineTableContext = React.createContext({} as IUseInlineTable) 
export function useInlineTable({indexedDatas, defaultEntry, ...props}:IInlineTable) : IUseInlineTable { 
  const [inlineState, SetInlineState, ResetInlineState] = useStateReset({row:'',mode:'read'} as IInlineState); 

  function GetEntry(row?:string) { 
    return row ? indexedDatas[row] ?? defaultEntry: defaultEntry; 
  } 

  async function Create(entry:IEntry) { 
    const response = await props.Create(entry); 
    if(response.success) 
      ResetInlineState(); 
    return response; 
  } 

  async function Update(entry:IEntry) { 
    const response = await props.Update(entry); 
    if(response.success) 
      ResetInlineState(); 
    return response; 
  } 

  async function Delete(entry:IEntry) { 
    const response = await props.Delete(entry); 
    if(response.success) 
      ResetInlineState(); 
    return response; 
  } 

  return {indexedDatas, defaultEntry, GetEntry, 
    inlineState, SetInlineState, ResetInlineState, 
    Create, Update, Delete} 
}