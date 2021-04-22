import { useContext, useEffect, useState } from 'react'; 
import { DaoContext, IDao } from '../../_dao'; 
import { usePage, IPageHook } from '../../pager/_pager'; 
import { IUseEditState, useEditState } from './useeditstate.hook'; 
//import { useAdminFeedbackRef, AdminFeedBackRef } from '../components/admin.feedback'; 

export function useInlineCrud() { 
  const dao = useContext(DaoContext); 
  const editState = useEditState(); 
  const collectionAccessor = 'questions'; 
  const entries = dao.GetIEntries(collectionAccessor); 
  // filtered ? useFilter ... 
  const paging = usePage(entries, 10); 
  

  useEffect(() => { 
    paging.setPageIndex(0); 
  }, [collectionAccessor]); 


}