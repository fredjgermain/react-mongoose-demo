import React, { useState } from 'react'; 
import { InlineState } from '../table.types'; 

interface propsTable { 
  collection: string; 
  datas: IEntry[]; 
  rows: number[]; 
  cols: string[]; 
  defaultEntry: IEntry; 
  Create: (entry: IEntry) => Promise<ICrudResponse>; 
  Update: (entry: IEntry) => Promise<ICrudResponse>; 
  Delete: (entry: IEntry) => Promise<ICrudResponse>; 
} 


export interface IUseTable extends propsTable { 
  inlineState: InlineState; 
  SetInlineState: (newState:InlineState) => void; 
  ResetInlineState: () => void; 

  inlineFeedback: ICrudResponse; 
  SetInlineFeedback: (newFeedBack: ICrudResponse) => void; 
  ResetInlineFeedback: () => void; 
} 
export const InlineTableContext = React.createContext({} as IUseTable); 
export function useInlineTable({collection, datas, rows, cols, defaultEntry, ...methods}:propsTable) { 
  // InlineState .........................................
  const initInlineState = {row:undefined,mode:'read'} as InlineState; 
  const [inlineState, setInlineState] = useState(initInlineState); 
  const SetInlineState = (newState:InlineState) => setInlineState(newState); 
  const ResetInlineState = () => setInlineState(initInlineState); 
  
  // FeedBack .............................................
  const [inlineFeedback, setInlineFeedback] = useState({} as ICrudResponse); 
  const SetInlineFeedback = (newFeedBack:ICrudResponse) => setInlineFeedback(newFeedBack); 
  const ResetInlineFeedback = () => setInlineFeedback({} as ICrudResponse); 

  async function Create(entry:IEntry) {
    const response = await methods.Create(entry); 
    if(response.success) 
      ResetInlineState(); 
    return response; 
  }

  async function Update(entry:IEntry) {
    const response = await methods.Update(entry); 
    if(response.success) 
      ResetInlineState(); 
    return response; 
  }

  async function Delete(entry:IEntry) { 
    const response = await methods.Delete(entry); 
    if(response.success) 
      ResetInlineState(); 
    return response; 
  }

  return { 
    collection, datas, rows, cols, defaultEntry, 
    inlineState, SetInlineState, ResetInlineState, 
    inlineFeedback, SetInlineFeedback, ResetInlineFeedback, 
    Create, Update, Delete}; 
} 