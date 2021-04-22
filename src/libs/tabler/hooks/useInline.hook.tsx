import { useContext, useEffect, useState } from 'react'; 
import { DaoContext, IDao } from '../../_dao'; 
import { usePage, IPageHook } from '../../pager/_pager'; 

import { IUseCrudState, useCrudState } from './usecrudstate.hook'; 

//import { useAdminFeedbackRef, AdminFeedBackRef } from '../components/admin.feedback'; 




/*
export interface IUseInline { 
  columns: { 
    columns: string[]; 
    SetColumns: (fields: string[]) => void; 
  } 
  editState: IUseCrudState; 
  paging: IPageHook<IEntry>; 
  CreateUpdate: () => Promise<void>; 
  Delete: () => Promise<void>; 
} 

export function useInline(collectionAccessor:string): IUseInline { 
  const dao = useContext(DaoContext); 
  const [editEntry, setEditEntry] = useState(); 

  // CreateUpdateEntry .................................... 
  async function CreateUpdate() { 
    const [response] = await dao.CreateUpdate(collectionAccessor, [GetEditEntry()]); 
    //feedbackRef.current.Set([response]); 
    if(response.actionType === 'create') 
      SetEditEntry(dao.GetDefaultIEntry(collectionAccessor)) 
    ResetEditState(); 
  } 

  // DeleteEntry .......................................... 
  async function Delete() { 
    const [response] = await dao.Delete(collectionAccessor, [GetEditEntry()]); 
    //feedbackRef.current.Set([response]); 
    // Reset after editing state
    ResetEditState();
  } 

  return { columns, editState:{editState, SetEditState, ResetEditState}, entry, paging, CreateUpdate, Delete }
}
*/


