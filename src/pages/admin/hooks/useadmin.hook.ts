import { useContext, useEffect, useState } from 'react'; 
import { DaoContext, IDao } from '../../../reusable/_dao'; 
import { usePage, IPageHook } from '../../../reusable/_customhooks'; 
import { IUseEditState, useEditState } from './useeditstate.hook'; 
import { useAdminFeedbackRef, AdminFeedBackRef } from '../components/adminfeedback.component'; 



export interface IUseAdmin extends IUseEditState {
  dao:IDao; 
  paging: IPageHook<IEntry>; 
  collectionAccessor: string; 

  columns: string[]; 
  setColumns: React.Dispatch<React.SetStateAction<string[]>>; 

  GetFields: (field?: string[] | undefined) => IField[]; 
  GetCollectionOptions(): IOption[]; 
  feedbackRef: AdminFeedBackRef; 
} 


// useAdmin ===============================================
export function useAdmin() { 
  const dao = useContext(DaoContext); 
  const [columns, setColumns] = useState([] as string[]); 
  const editState = useEditState(); 
  const collectionAccessor = editState.GetEditState(['collection']) as string; 
  const paging = usePage(dao.GetIEntries(collectionAccessor), 5); 
  const feedbackRef = useAdminFeedbackRef(); 

  // Reset Columns on collection change
  useEffect(() => { 
    IniColumns(); 
    paging.setPageIndex(0); 
    
  }, [collectionAccessor]); 

  useEffect(() => { 
    if(feedbackRef.current.Set) 
      feedbackRef.current.Set([]) 
  }, [collectionAccessor, paging.pageIndex]) 

  function IniColumns() { 
    if(!!collectionAccessor) 
      setColumns(GetFields().filter(f => !!f.label).map( f => f.accessor )); 
  } 

  // GetCollectionOptions ................................. 
  function GetCollectionOptions():IOption[] { 
    const collections = dao.GetICollections(); 
    return collections.map( c => { 
      return {value:c.accessor, label:c.label} 
    }); 
  } 

  // 
  function GetFields(field?:string[]) { 
    return dao.GetIFields(collectionAccessor, field); 
  } 
  
  return {dao, paging, columns, setColumns, collectionAccessor, GetFields, GetCollectionOptions, feedbackRef, ...editState} 
}

