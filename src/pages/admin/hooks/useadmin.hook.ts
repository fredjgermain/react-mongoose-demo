import { useContext, useEffect, useState } from 'react'; 
import { DaoContext } from '../../../reusable/_dao'; 
import { usePage, IPageHook } from '../../../reusable/_customhooks'; 
import { IUseEditState, useEditState } from './useeditstate.hook';



export interface IUseAdmin extends IUseEditState {
  paging: IPageHook<IEntry>; 
  collectionAccessor: string; 

  columns: string[]; 
  setColumns: React.Dispatch<React.SetStateAction<string[]>>; 

  GetFields: (field?: string[] | undefined) => IField[]; 
  GetCollectionOptions(): IOption[]; 
} 


// useAdmin ===============================================
export function useAdmin() { 
  const dao = useContext(DaoContext); 

  const [columns, setColumns] = useState([] as string[]); 
  const editState = useEditState(); 
  const collectionAccessor = editState.GetEditState(['collection']) as string; 
  const paging = usePage(dao.GetIEntries(collectionAccessor), 5); 


  // Reset Columns on collection change
  useEffect(() => { 
    IniColumns(); 
  }, [collectionAccessor]); 

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
  
  return {paging, columns, setColumns, collectionAccessor, GetFields, GetCollectionOptions, ...editState} 
}

