import { useContext, useEffect, useState } from 'react'; 
import { DaoContext, IDao } from '../../_dao'; 
import { usePage, IPageHook } from '../../pager/_pager'; 
import { useIEntry } from '../../_customhooks'; 

import { IUseEditState, useEditState } from './useeditstate.hook'; 

//import { useAdminFeedbackRef, AdminFeedBackRef } from '../components/admin.feedback'; 

export function useInline(collectionAccessor:string) { 
  const dao = useContext(DaoContext); 
  const {editState, SetEditState, ResetEditState} = useEditState(); 
  const useEntry = useIEntry(collectionAccessor, editState.row ?? -1); 
  const entries = dao.GetIEntries(collectionAccessor); 
  
  const fileredEntries = entries; 
  const paging = usePage(fileredEntries, 10); 

  useEffect(() => { 
    paging.setPageIndex(0); 
    ResetEditState(); 
  }, [collectionAccessor]); 

  // CreateUpdateEntry .................................... 
  async function CreateUpdateEntry() { 
    const [response] = await dao.CreateUpdate(collectionAccessor, [useEntry.Get()]); 
    //feedbackRef.current.Set([response]); 
    if(response.actionType === 'create') 
      useEntry.Set(dao.GetDefaultIEntry(collectionAccessor)) 
    ResetEditState();
  } 

  // DeleteEntry .......................................... 
  async function DeleteEntry() { 
    const [response] = await dao.Delete(collectionAccessor, [useEntry.Get()]); 
    //feedbackRef.current.Set([response]); 
    // Reset after editing state
    ResetEditState();
  } 
}

