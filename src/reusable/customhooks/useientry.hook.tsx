import { useContext } from 'react'; 
import { DaoContext } from '../_dao'; 
import { useStateAt } from '../_customhooks'; 
import { IEditor, IReader } from '../_input'; 


// IENTRY =================================================
export interface IUseIEntry { 
  index:number; 
  Get: (keys?: TKey[] | undefined) => any; 
  Set: (newValue: any, keys?: TKey[] | undefined) => void; 
  GetIEditorArgs: (columns: string[]) => IEditor[]; 
} 

export function useIEntry(collectionAccessor:string, index:number):IUseIEntry { 
  const {GetDefaultIEntry, GetIEntries, Validate, GetIFields, GetIOptions, CreateUpdate, Delete} = useContext(DaoContext); 
  const [Get, Set] = useStateAt(GetEntry()); 

  // Get Entry ............................................
  function GetEntry() { 
    return GetIEntries(collectionAccessor).find( (e,i) => i === index) 
      ?? GetDefaultIEntry(collectionAccessor) 
      ?? {} as IEntry; 
  } 
  
  // Get Columns Args .....................................
  function GetIEditorArgs(columns: string[]) { 
    const ifields = GetIFields(collectionAccessor, columns); 
    return ifields.map( ifield => { 
      const value = Get([ifield.accessor]); 
      const setValue = (newValue:any) => Set(newValue, [ifield.accessor]); 
      const options = GetIOptions(ifield); 
      return {ifield, value, setValue, options}; 
    }); 
  } 

  return {index, Get, Set, GetIEditorArgs} 
} 
