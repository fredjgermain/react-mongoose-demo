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
  const dao = useContext(DaoContext); 
  const [Get, Set] = useStateAt(GetEntry()); 

  // Get Entry ............................................
  function GetEntry() { 
    return dao.GetIEntries(collectionAccessor).find( (e,i) => i === index) 
      ?? dao.GetDefaultIEntry(collectionAccessor) 
      ?? {} as IEntry; 
  } 
  
  // Get Columns Args .....................................
  function GetIEditorArgs(columns: string[]) { 
    const ifields = dao.GetIFields(collectionAccessor, columns); 
    return ifields.map( ifield => { 
      const value = Get([ifield.accessor]); 
      const setValue = (newValue:any) => Set(newValue, [ifield.accessor]); 
      const options = dao.GetIOptions(ifield); 
      return {ifield, value, setValue, options}; 
    }); 
  } 

  return {index, Get, Set, GetIEditorArgs} 
} 
