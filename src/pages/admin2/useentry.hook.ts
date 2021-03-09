import { useContext } from 'react'; 
import { DaoContext } from '../../reusable/_dao'; 
import { AdminContext } from './admin.page'; 
import { useStateAt } from '../../reusable/_customhooks'; 
import { feedback } from '../../components/feedback/feedback.component'; 

export interface IUseEntry { 
  index:number; 
  editMode: string; 
  Get: (keys?: TKey[] | undefined) => any; 
  Set: (newValue: any, keys?: TKey[] | undefined) => void; 
  Args: (keys?:TKey[]) => any; 

  GetColumnsIField: () => IField[]; 

  CreateUpdateEntry: () => Promise<void>; 
  DeleteEntry: () => Promise<void>; 
} 

export function useEntry(index:number):IUseEntry { 
  const {GetDefaultIEntry, GetIEntries, Validate, GetIFields, GetIOptions, CreateUpdate, Delete} = useContext(DaoContext); 
  const {columns, collectionAccessor, GetEditingMode, SetEditingMode} = useContext(AdminContext); 
  const editMode = GetEditingMode(index); 

  // Get Entry ............................................
  function GetEntry() { 
    const accessor = collectionAccessor; 
    return GetIEntries(accessor).find( (e,i) => i === index) 
      ?? GetDefaultIEntry(accessor) 
      ?? {} as IEntry; 
  } 

  // Entry Hook 
  const [Get, Set] = useStateAt(GetEntry()); 
  const entry = Get(); 

  function Args(keys?:TKey[]) { 
    const lastk = keys ? [...keys].pop(): ''; 
    const ifield = GetIFields(collectionAccessor).find(f=> f.accessor === lastk); 
    if(!ifield) 
      return {}; 
    const options = GetIOptions(ifield); 
    return {ifield, options}; 
  }

  function GetColumnsIField() { 
    return GetIFields(collectionAccessor, columns); 
  }

  // CreateUpdateEntry .................................... 
  async function CreateUpdateEntry() { 
    const [response] = await CreateUpdate(collectionAccessor, [entry]); 
    feedback.setValue([response]); 
    if(response.actionType === 'create') 
      Set(GetDefaultIEntry(collectionAccessor)) 
    // Reset after editing state
    SetEditingMode(); 
  } 

  // DeleteEntry .......................................... 
  async function DeleteEntry() { 
    const [response] = await Delete(collectionAccessor, [entry]); 
    feedback.setValue([response]); 
    // Reset after editing state
    SetEditingMode(); 
  } 
  
  return { index, editMode, Get, Set, Args, GetColumnsIField, CreateUpdateEntry, DeleteEntry} 
}
