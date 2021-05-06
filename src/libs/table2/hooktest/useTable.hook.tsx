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


interface IUseTable extends propsTable {
  inlineState: InlineState; 
  SetInlineState: (newState:InlineState) => void; 
  ResetInlineState: () => void; 

  inlineFeedback: ICrudResponse;
  SetInlineFeedback: (newFeedBack: ICrudResponse) => void; 
  ResetInlineFeedback: () => void; 
}
export const TableContext = React.createContext({} as IUseTable); 
export function useTable({collection, datas, rows, cols, defaultEntry, Create, Update, Delete}:propsTable) { 

  // InlineState .........................................
  const initInlineState = {row:undefined,mode:'read'} as InlineState; 
  const [inlineState, setInlineState] = useState(initInlineState); 
  const SetInlineState = (newState:InlineState) => setInlineState(newState); 
  const ResetInlineState = () => setInlineState(initInlineState); 

  console.log('test'); 

  // FeedBack .............................................
  const [inlineFeedback, setInlineFeedback] = useState({} as ICrudResponse); 
  const SetInlineFeedback = (newFeedBack:ICrudResponse) => setInlineFeedback(newFeedBack); 
  const ResetInlineFeedback = () => setInlineFeedback({} as ICrudResponse); 

  return { 
    collection, datas, rows, cols, defaultEntry, 
    inlineState, SetInlineState, ResetInlineState, 
    inlineFeedback, SetInlineFeedback, ResetInlineFeedback, 
    Create, Update, Delete}; 
}