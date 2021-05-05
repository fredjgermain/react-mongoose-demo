import React, {useContext} from 'react'; 
import { useStateReset } from '../../_customhooks'; 
import { IsEmpty } from '../../_utils'; 

import { DaoContext, } from '../../_dao'; 
import { InlineState, IUseInlineTable } from '../_table'; 


export const InlineTableContext = React.createContext({} as IUseInlineTable) 

export function useInlineTable(datas:IEntry[], collection:string) { 
  const dao = useContext(DaoContext); 
  const rows = datas.map( (e,i) => i); 
  const cols = dao.GetIFields(collection).filter(f => !IsEmpty(f.label)).map(f => f.accessor); 

  // InlineState .........................................
  const initInlineState = {row:undefined,mode:'read'} as InlineState; 
  const [inlineState, SetInlineState, ResetInlineState] = useStateReset(initInlineState); 

  // FeedBack .............................................
  const [inlineFeedback, SetInlineFeedback, ResetInlineFeedback] = useStateReset({} as ICrudResponse); 

  // CRUD FUNCTIONS -----------------------------------
  // Create ..........................................
  async function Create(entry:IEntry) { 
    const [response] = await dao.Create(collection, [entry]); 
    if(response.success) 
      ResetInlineState(); 
    //SetInlineFeedback(response); 
    return response; 
  } 

  // Update ..........................................
  async function Update(entry:IEntry) { 
    const [response] = await dao.Update(collection, [entry]); 
    if(response.success) 
      ResetInlineState(); 
    //SetInlineFeedback(response); 
    return response; 
  } 

  // Delete .......................................... 
  async function Delete(entry:IEntry) { 
    const [response] = await dao.Delete(collection, [entry]); 
    if(response.success) 
      ResetInlineState(); 
    //SetInlineFeedback(response); 
    return response; 
  } 

  return {collection, datas, rows, cols, 
    inlineState, SetInlineState, ResetInlineState, 
    inlineFeedback, SetInlineFeedback, ResetInlineFeedback, 
    Create, Update, Delete
  } 

}