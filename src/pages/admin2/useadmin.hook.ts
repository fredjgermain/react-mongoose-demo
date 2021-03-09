import { useContext, useEffect, useState } from 'react'; 
import { DaoContext } from '../../reusable/_dao'; 
import {useStateAt, usePage, IPageHook} from '../../reusable/_customhooks'; 


export interface IUseAdmin extends IUseEditState {
  paging: IPageHook<IEntry>; 
  collectionAccessor: string; 

  columns: string[]; 
  setColumns: React.Dispatch<React.SetStateAction<string[]>>; 

  GetFields: (field?: string[] | undefined) => IField[]; 
  GetCollectionOptions(): IOption[]; 
} 


export function useAdmin() { 
  const {GetICollections, GetIEntries, GetIFields} = useContext(DaoContext); 

  const [columns, setColumns] = useState([] as string[]); 
  const editState = useEditState(); 
  const collectionAccessor = editState.GetEditState(['collection']) as string; 
  const paging = usePage(GetIEntries(collectionAccessor), 10); 


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
    const collections = GetICollections(); 
    return collections.map( c => { 
      return {value:c.accessor, label:c.label} 
    }); 
  } 

  // 
  function GetFields(field?:string[]) { 
    return GetIFields(collectionAccessor, field); 
  } 
  
  return {paging, columns, setColumns, collectionAccessor, GetFields, GetCollectionOptions, ...editState} 
}


// EditingState ..........................................
export interface IUseEditState { 
  GetEditState: (keys?: TKey[] | undefined) => any; 
  SetEditState: (newValue: any, keys?: TKey[] | undefined) => void; 
  GetEditingMode: (index?: number | undefined) => string; 
  SetEditingMode: (index?: number | undefined, mode?: string | undefined) => void; 
} 

// editIndex is either null or number from -1 and above. 
// -1 means the inline create is active. 
export function useEditState() { 
  const resetState = {collection:'', index:null, mode:'read'}; 
  const [GetEditState, SetEditState] = useStateAt(resetState); 
  const collection = GetEditState(['collection']) as string; 

  function GetEditingMode(index?:number):string { 
    if(index === GetEditState(['index'])) 
      return GetEditState(['mode']); 
    return 'read'; 
  } 

  function SetEditingMode(index?:number, mode?:string) { 
    const newState = {collection, index:index ?? null, mode:mode ?? 'read'} 
    SetEditState(newState); 
  } 

  return { GetEditState, SetEditState, GetEditingMode, SetEditingMode }
}