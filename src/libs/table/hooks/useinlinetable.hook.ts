import React, { useContext, useEffect } from 'react'; 
import { DaoContext } from '../../dao/components/dao.contexter'; 
import { useStateReset } from '../../_customhooks'; 
import { IsEmpty } from '../../_utils'; 
import { useTable, IUseTable, IInlineTableState } from '../_table'; 


export const InlineTableContext = React.createContext({} as IUseInlineTable); 


export interface IUseInlineTable extends IUseTable<IEntry> { 
  collectionAccessor:string; 

  // inline table state
  inlineTableState: IInlineTableState; 
  SetInlineTableState: (newValue: any) => void; 
  ResetInlineTableState: () => void; 
  IsSelected: () => boolean; 
  IsEditing: () => boolean; 

  // Feedback
  inlineFeedback: ICrudResponse; 
  SetInlineFeedback: (newFeedback: ICrudResponse) => void; 
  ResetInlineFeedback: () => void; 

  // Crud methods ... 
  Create(entry: IEntry): Promise<ICrudResponse>
  Update(entry: IEntry): Promise<ICrudResponse>
  Delete(entry: IEntry): Promise<ICrudResponse>
}

export function useInlineTable(collectionAccessor:string): IUseInlineTable { 
  const dao = useContext(DaoContext); 
  const entries = dao.GetIEntries(collectionAccessor); 
  const defaultCols = dao.GetIFields(collectionAccessor).filter(f => !!f.label).map( f => f.accessor ); 
  const table = useTable(entries, {defaultCols}); 
  const {paging} = table; 
  
  // InlineTableState ..................................
  const [inlineTableState, SetInlineTableState, ResetInlineTableState] = 
    useStateReset({row:null, mode:'read'} as IInlineTableState); 

  const editingModes = ['update', 'create']; 
  const IsSelected = () => table.GetRowCol().row === inlineTableState.row; 
  const IsEditing = () => editingModes.includes(inlineTableState.mode); 


  // FeedBack .............................................
  const [inlineFeedback, SetInlineFeedback, ResetInlineFeedback] = useStateReset({} as ICrudResponse); 

  // on page changed
  useEffect(() => { 
    ResetInlineTableState(); 
    ResetInlineFeedback(); 
  }, [paging.pageIndex]); 

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

  return { ...table, collectionAccessor, 
    inlineTableState, SetInlineTableState, ResetInlineTableState, 
    IsSelected, IsEditing, 
    inlineFeedback, SetInlineFeedback, ResetInlineFeedback,
    Create, Update, Delete }; 
}