import { useContext, useEffect, useState } from 'react'; 
import { DaoContext, IDao } from '../../_dao'; 
import { usePage, IPageHook } from '../../pager/_pager'; 
import { useIEntry, IUseIEntry } from '../../_customhooks'; 

import { IUseEditState, useEditState } from './useeditstate.hook'; 

//import { useAdminFeedbackRef, AdminFeedBackRef } from '../components/admin.feedback'; 

interface IUseColumn { 
  columns: string[]; 
  SetColumns: (fields: string[]) => void; 
} 

function useColumn(collectionAccessor:string):IUseColumn {
  const dao = useContext(DaoContext); 
  const initColumns = dao.GetIFields(collectionAccessor) 
    .filter(f => !!f.label).map( f => f.accessor ); 
  const [columns, setColumns] = useState(initColumns); 
  const SetColumns = (fields:string[]) => setColumns(fields); 

  return {columns, SetColumns}; 
}


export interface IUseInline { 
  columns: { 
    columns: string[]; 
    SetColumns: (fields: string[]) => void; 
  } 
  editState: IUseEditState; 
  entry: IUseIEntry; 
  paging: IPageHook<IEntry>;
  CreateUpdate: () => Promise<void>;
  Delete: () => Promise<void>;
}

export function useInline(collectionAccessor:string): IUseInline{ 
  const dao = useContext(DaoContext); 
  const {editState, SetEditState, ResetEditState} = useEditState(); 
  const entry = useIEntry(collectionAccessor, editState.row ?? -1); 
  const entries = dao.GetIEntries(collectionAccessor); 
  const fileredEntries = entries; 
  
  const paging = usePage(fileredEntries, 10); 
  const columns = useColumn(collectionAccessor); 

  

  useEffect(() => { 
    paging.setPageIndex(0); 
    ResetEditState(); 
  }, [collectionAccessor]); 


  // GetEntry .............................................
  function GetEntry(row?:number) { 
    return dao.GetIEntries(collectionAccessor).find( (e,i) => i === row) 
      ?? dao.GetDefaultIEntry(collectionAccessor) 
      ?? {} as IEntry; 
  } 

  function GetFields(accessor:string) { 
    return dao.GetIFields(collectionAccessor, columns.columns); 
  } 

  function GetOptions(ifield:IField) { 
    return dao.GetIOptions(ifield); 
  } 


  // CreateUpdateEntry .................................... 
  async function CreateUpdate() { 
    const [response] = await dao.CreateUpdate(collectionAccessor, [entry.Get()]); 
    //feedbackRef.current.Set([response]); 
    if(response.actionType === 'create') 
      entry.Set(dao.GetDefaultIEntry(collectionAccessor)) 
    ResetEditState();
  } 

  // DeleteEntry .......................................... 
  async function Delete() { 
    const [response] = await dao.Delete(collectionAccessor, [entry.Get()]); 
    //feedbackRef.current.Set([response]); 
    // Reset after editing state
    ResetEditState();
  } 

  return { columns, editState:{editState, SetEditState, ResetEditState}, entry, paging, CreateUpdate, Delete }
}

