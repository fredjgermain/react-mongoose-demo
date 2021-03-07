import { useContext } from 'react'; 
import { DaoContext } from '../../reusable/_dao'; 
import { IsEmpty } from '../../reusable/_utils'; 
import { ArrxContext, ElementContext } from '../../reusable/_arrx'; 
import { AdminContext } from './admin.page'; 

export interface IUseEntry { 
  GetDefaultEntry: () => IEntry; 
  GetEntry: () => IEntry; 
  SetEntry : (newValue:any) => void; 

  GetEditing: () => string; 
  SetEditing: (mode?: string) => void; 
  IsEditing: () => boolean; 
} 

export function useEntry():IUseEntry { 
  const {GetDefaultIEntry, GetIEntries, Validate} = useContext(DaoContext); 
  const admin = useContext(AdminContext); 
  const {values} = useContext(ArrxContext); 
  const {index} = useContext(ElementContext); 

  // GetDefaultEntry ...................................... 
  function GetDefaultEntry() { 
    const defaultEntry = GetDefaultIEntry(admin.Get(['collection'])); 
    if(IsEmpty(defaultEntry)) 
      return {} as IEntry; 
    return defaultEntry; 
  } 
  
  // Get Entry ............................................
  function GetEntry() { 
    const entry:IEntry = IsEditing() ? admin.Get(['entry']): values[index]; 
    const value = !IsEmpty(entry) ? entry: GetDefaultEntry(); 
    return value; 
  } 

  function SetEntry(newValue:any) { 
    console.log(newValue); 
  } 

  // Editing State ............................................
  function GetEditing():string { 
    const entry = values[index] as IEntry; 
    const editedEntry = admin.Get(['entry']) as IEntry; 
    const mode = admin.Get(['mode']); 

    if(index < 0 && mode === 'create') 
      return mode; 
    if(entry && editedEntry && entry?._id === editedEntry?._id) 
      return mode; 
    //return index >= 0 ? 'read': 'new'; 
    return 'read'; 
  } 

  function SetEditing(mode:string = 'read') { 
    const collection = admin.Get(['collection']); 
    const entry = mode === 'read' ? {} as IEntry: GetEntry(); 
    admin.Set({collection, entry, mode}); 
  }
  
  function IsEditing() { 
    const editMode = ['create', 'update']; 
    return editMode.includes(GetEditing()); 
  } 


  // Crud .......................................
  function CreateUpdate() { 

  } 

  function Delete() { 
    
  }


  return { GetDefaultEntry, GetEntry, SetEntry, GetEditing, SetEditing, IsEditing } 
}
