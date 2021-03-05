import { useContext } from 'react'; 
import { DaoContext } from '../../reusable/_dao'; 
import { feedback } from '../../components/feedback/feedback.component'; 
import {useStateAt, usePage, IPageHook} from '../../reusable/_customhooks'; 
import { IsEmpty } from '../../reusable/_utils';


/*
useContext(DaoContext) 

usePage


useStateAt 
  - collection 
  - entry
  - mode 

// CollectionSelector 
getCollection 
setCollection 

IsEdited(id) => boolean 

CreateUpdateEntry() 
  await CreateUpdate 
  - feedback.setValue([response]); 
  - setEntry 
  - setMode 
  - ... render adminTable?? 

DeleteEntry() 
  await Delete 
  - feedback.setvalue([response]); 
  - setMode 
  - ... render adminTable?? 

*/ 


export interface IUseAdmin { 
  paging: IPageHook<IEntry>; 
  Get: (keys?: any[] | undefined) => any; 
  Set: (newValue: any, keys?: any[] | undefined) => any; 
  GetDefaultEntry: () => IEntry; 
  GetEditing: () => {entry: IEntry; mode: string}; 
  SetEditing: (entry?: IEntry | undefined, mode?: string | undefined) => void; 
  GetCollectionOptions: () => IOption[]; 
  CreateUpdateEntry: () => Promise<void>; 
  DeleteEntry: () => Promise<void>; 
} 

// Use Admin ==============================================
export function useAdmin() { 
  const {GetDefaultIEntry, GetICollections, GetIEntries, CreateUpdate, Delete, Validate} = useContext(DaoContext); 

  // Get Set .............................................. 
  const [Get, Set] = useStateAt({collection:undefined, entry:{} as IEntry, mode:''}); 

  let entries = GetIEntries(Get(['collection'])); 
  entries = IsEmpty(entries) ? [] as IEntry[]: entries; 
  const paging = usePage(entries, 10); 

  // GetDefaultEntry ...................................... 
  function GetDefaultEntry() { 
    const defaultEntry = GetDefaultIEntry(Get(['collection'])); 
    if(IsEmpty(defaultEntry)) 
      return {} as IEntry; 
    return defaultEntry; 
  } 
  
  // GetEditing ........................................... 
  function GetEditing():{entry:IEntry, mode:string} { 
    return {entry:Get(['entry']), mode:Get(['mode'])}; 
  } 
  // SetEditing ........................................... 
  function SetEditing(entry?:IEntry, mode?:string) { 
    Set({entry, mode}) // will it overwrite/remove 'collection' ? 
  } 

  // GetCollectionOptions ................................. 
  function GetCollectionOptions():IOption[] { 
    const collections = GetICollections(); 
    return collections.map( c => { 
      return {value:c.accessor, label:c.label} 
    }); 
  } 

  // CreateUpdateEntry .................................... 
  async function CreateUpdateEntry() { 
    const collection = Get(['collection']); 
    const entry = Get(['entry']); 
    const [response] = await CreateUpdate(collection, [entry]); 
    feedback.setValue([response]); 
    const defaultEntry = GetDefaultIEntry(collection); 
    SetEditing(defaultEntry, 'read'); 
  } 

  // DeleteEntry .......................................... 
  async function DeleteEntry() { 
    const collection = Get(['collection']); 
    const entry = Get(['entry']); 
    const [response] = await Delete(collection, [entry]); 
    feedback.setValue([response]); 
    const defaultEntry = GetDefaultIEntry(collection); 
    SetEditing(defaultEntry, 'read'); 
  } 

  return { 
    paging, 
    Get, Set, 
    GetDefaultEntry, 
    GetEditing, 
    SetEditing, 
    GetCollectionOptions, 
    CreateUpdateEntry, 
    DeleteEntry, 
  } 
}