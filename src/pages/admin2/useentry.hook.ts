import { useContext } from 'react'; 
import { DaoContext } from '../../reusable/_dao'; 
import { GetValueAt, IsEmpty } from '../../reusable/_utils'; 
import { AdminContext } from './admin.page'; 
import { KeyContext, ObjxContext } from '../../reusable/_objx2';

export interface IUseEntry { 
  index?: TKey[]; 

  GetDefaultEntry: () => IEntry; 
  GetEntry: () => IEntry; 
  SetEntry: (newValue: any, keys?: TKey[] | undefined) => void; 
  GetArgs: (keys?:TKey[]) => any; 

  GetEditing: () => string; 
  SetEditing: (mode?: string) => void; 
  IsEditing: () => boolean; 
} 

export function useEntry():IUseEntry { 
  const {GetDefaultIEntry, GetIEntries, Validate, GetIFields, GetIOptions} = useContext(DaoContext); 
  const admin = useContext(AdminContext); 
  const {value} = useContext(ObjxContext); 
  const {k:index} = useContext(KeyContext); 

  // GetDefaultEntry ...................................... 
  function GetDefaultEntry() { 
    const defaultEntry = GetDefaultIEntry(admin.Get(['collection'])); 
    if(IsEmpty(defaultEntry)) 
      return {} as IEntry; 
    return defaultEntry; 
  } 
  
  // Get Entry ............................................
  function GetEntry() { 
    let entry:IEntry = IsEditing() ? admin.Get(['entry']): GetValueAt(value, index); 
    entry = !IsEmpty(entry) ? entry: GetDefaultEntry(); 
    return entry; 
  } 

  function SetEntry(newValue:any, keys?:TKey[]) { 
    admin.Set(newValue, keys ? ['entry', ...keys]: ['entry']); 
  }

  function GetArgs(keys?:TKey[]) { 
    const lastk = keys ? [...keys].pop(): ''; 
    const ifield = admin.GetFields().find(f=> f.accessor === lastk); 
    if(!ifield) 
      return {}; 
    const options = GetIOptions(ifield); 
    return {ifield, options}; 
  }

  // Editing State ............................................
  function GetEditing():string { 
    const entry = GetValueAt(value, index) as IEntry; 
    const editedEntry = admin.Get(['entry']) as IEntry; 
    const mode = admin.Get(['mode']); 

    console.log(index); 

    if(IsEmpty(index) && mode === 'create') 
      return mode; 
    if(entry && editedEntry && entry?._id === editedEntry?._id) 
      return mode; 
    return 'read'; 
  } 

  function SetEditing(mode:string = 'read') { 
    const collection = admin.Get(['collection']); 
    const entry = mode === 'read' ? {} as IEntry: GetEntry(); 
    admin.Set({collection, entry, mode}); 
  }
  
  function IsEditing() { 
    //console.log(GetEditing()); 
    const editMode = ['create', 'update']; 
    return editMode.includes(GetEditing()); 
  } 


  // Crud .......................................
  function CreateUpdate() { 

  } 

  function Delete() { 
    
  }

  return { index, GetDefaultEntry, GetEntry, SetEntry, GetArgs, GetEditing, SetEditing, IsEditing } 
}
