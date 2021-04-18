import { useContext, useState } from 'react'; 
import { DaoContext, IDao } from '../../../libs/_dao'; 
import { usePage, IPageHook } from '../../../libs/_customhooks'; 
import { IUseEditState, useEditState } from './useeditstate.hook'; 
import { useAdminFeedbackRef, AdminFeedBackRef } from '../components/admin.feedback'; 



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
  const editState = useEditState(); 
  const collectionAccessor = editState.GetEditState(['collection']) as string; 
  const paging = usePage(dao.GetIEntries(collectionAccessor), 10); 
  const feedbackRef = useAdminFeedbackRef(); 

  const [_columns, setColumns] = useState([] as string[]); 
  const columns = GetFields().filter(f => !!f.label).map( f => f.accessor ); 

  // Reset Columns on collection change
  /*useEffect(() => { 
      IniColumns(); 
      paging.setPageIndex(0); 
  }, [collectionAccessor]); 

  useEffect(() => { 
    if(collectionAccessor !== 'answers' && feedbackRef.current.Set) 
      feedbackRef.current.Set([]) 
  }, [collectionAccessor, paging.pageIndex]) */

  function IniColumns() { 
    if(!!collectionAccessor) { 
      /*console.log(columns); 
      setColumns((prev) => columns); */
    } 
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

