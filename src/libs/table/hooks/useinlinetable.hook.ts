import React, { useState, useContext, useEffect } from 'react'; 
import { DaoContext } from '../../dao/components/dao.contexter'; 



export const InlineTableContext = React.createContext({} as IUseInlineTable); 

export interface IInlineTableState { 
  row:number|null; 
  mode:string; 
}; 

export interface IUseInlineTable { 
  collectionAccessor:string; 

  // inline table state
  inlineTableState: IInlineTableState; 
  SetInlineTableState: (newValue: any) => void; 
  ResetInlineTableState: () => void; 

  // Feedback
  inlineFeedback: ICrudResponse; 
  SetInlineFeedback: (newFeedback: ICrudResponse) => void; 

  // Crud methods ... 
  Create(entry: IEntry): Promise<ICrudResponse>
  Update(entry: IEntry): Promise<ICrudResponse>
  Delete(entry: IEntry): Promise<ICrudResponse>
}

export function useInlineTable(collectionAccessor:string): IUseInlineTable { 
  const dao = useContext(DaoContext); 
  
  // InlineTableState ..................................
  const initState = {row:null, mode:'read'} as IInlineTableState; 
  const [inlineTableState, setInlineTableState] = useState(initState); 
  
  const SetInlineTableState = (newValue:any) => setInlineTableState( prev => { 
    return {...prev, ...(newValue as IInlineTableState)}; 
  }); 
  const ResetInlineTableState = () => SetInlineTableState(initState); 

  // FeedBack .............................................
  const [inlineFeedback, setInlineFeedback] = useState({} as ICrudResponse); 
  
  const SetInlineFeedback = (newFeedback:ICrudResponse) => setInlineFeedback(newFeedback); 

  // 
  useEffect(() => { 
    ResetInlineTableState(); 
  }, [collectionAccessor]); 

  // CRUD FUNCTIONS -----------------------------------
  // Create ..........................................
  async function Create(entry:IEntry) { 
    const [response] = await dao.Create(collectionAccessor, [entry]); 
    if(response.success) 
      ResetInlineTableState(); 
    SetInlineFeedback(response); 
    return response; 
  } 

  // Update ..........................................
  async function Update(entry:IEntry) { 
    const [response] = await dao.Update(collectionAccessor, [entry]); 
    if(response.success) 
      ResetInlineTableState(); 
    SetInlineFeedback(response); 
    return response; 
  } 

  // Delete .......................................... 
  async function Delete(entry:IEntry) { 
    const [response] = await dao.Delete(collectionAccessor, [entry]); 
    if(response.success) 
      ResetInlineTableState(); 
    SetInlineFeedback(response); 
    return response; 
  } 

  return { collectionAccessor, 
    inlineTableState, SetInlineTableState, ResetInlineTableState, 
    inlineFeedback, SetInlineFeedback, 
    /*GetEntries, GetEntry, GetDefaultColumns, GetFields, GetOptions, */
    Create, Update, Delete }; 
}




  // GetEntry .............................................
  /*function GetEntries() { 
    return dao.GetIEntries(collectionAccessor); 
  } 

  function GetEntry(row?:number) { 
    return dao.GetIEntries(collectionAccessor).find( (e,i) => i === row) 
      ?? dao.GetDefaultIEntry(collectionAccessor) 
      ?? {} as IEntry; 
  } 

  function GetDefaultColumns() { 
    return dao.GetIFields(collectionAccessor).filter(f => !!f.label).map( f => f.accessor ); 
  } 

  function GetFields(accessors:string[]) { 
    return dao.GetIFields(collectionAccessor, accessors); 
  } 

  function GetOptions(ifield:IField) { 
    return dao.GetIOptions(ifield); 
  } */
