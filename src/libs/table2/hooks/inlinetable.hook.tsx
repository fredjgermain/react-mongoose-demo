import React, { useState } from 'react'; 
//import { useStateReset } from '../../_customhooks'; 
import { InlineState, IUseInlineTable } from '../table.types'; 


export const InlineTableContext = React.createContext({} as IUseInlineTable) 

type InlineCrudMethod = (entry: IEntry) => Promise<ICrudResponse>; 

interface IProps { 
  collection:string, 
  datas:IEntry[], 
  cols:string[], 
  defaultEntry:IEntry, 
  Create:InlineCrudMethod, 
  Update:InlineCrudMethod, 
  Delete:InlineCrudMethod
}

export function useInlineTable({collection, datas, cols, defaultEntry, ...inlineCrudMethods}:IProps) : IUseInlineTable { 
  const rows = datas.map( (e,i) => i); 

  // InlineState .........................................
  const initInlineState = {row:undefined,mode:'read'} as InlineState; 
  const [inlineState, setInlineState] = useState(initInlineState); 
  const SetInlineState = (newState:InlineState) => setInlineState(newState); 
  const ResetInlineState = () => setInlineState(initInlineState); 

  // FeedBack .............................................
  const [inlineFeedback, setInlineFeedback] = useState({} as ICrudResponse); 
  const SetInlineFeedback = (newFeedBack:ICrudResponse) => setInlineFeedback(newFeedBack); 
  const ResetInlineFeedback = () => setInlineFeedback({} as ICrudResponse); 
  
  

  // CRUD FUNCTIONS -----------------------------------
  // GetEntry ........................................
  function GetEntry(row?:number) { 
    return datas[row ?? -1] ?? defaultEntry; 
  } 

  // Create ..........................................
  async function Create(entry:IEntry) { 
    const response = await inlineCrudMethods.Create(entry); 
    if(response.success) 
      ResetInlineState(); 
    //SetInlineFeedback(response); 
    return response; 
  } 

  // Update ..........................................
  async function Update(entry:IEntry) { 
    const response = await inlineCrudMethods.Update(entry); 
    if(response.success) 
      ResetInlineState(); 
    //SetInlineFeedback(response); 
    return response; 
  } 

  // Delete .......................................... 
  async function Delete(entry:IEntry) { 
    const response = await inlineCrudMethods.Delete(entry); 
    if(response.success) 
      ResetInlineState(); 
    //SetInlineFeedback(response); 
    return response; 
  } 

  return {collection, datas, rows, cols, GetEntry, 
    inlineState, SetInlineState, ResetInlineState, 
    inlineFeedback, SetInlineFeedback, ResetInlineFeedback, 
    Create, Update, Delete} 

}