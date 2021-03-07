import { useContext } from 'react'; 
import { DaoContext } from '../../reusable/_dao'; 
import { feedback } from '../../components/feedback/feedback.component'; 
import {useStateAt, usePage, IPageHook} from '../../reusable/_customhooks'; 
import { IsEmpty } from '../../reusable/_utils'; 
import { Filter } from '../../reusable/_arrayutils';


export type TEditingState = {collection:string, entry:IEntry, mode:string}; 

export interface IUseAdmin { 
  paging: IPageHook<IEntry>; 
  Get: (keys?: any[] | undefined) => any; 
  Set: (newValue: any, keys?: any[] | undefined) => void; 
  GetCollection: () => ICollection; 
  
  
  /*GetEditing: () => {entry: IEntry; mode: string}; 
  SetEditing: (entry?: IEntry | undefined, mode?: string | undefined) => void; */

  GetEntries: () => IEntry[]; 
  GetFields: () => IField[]; 

  GetCollectionOptions: () => IOption[]; 
  CreateUpdateEntry: () => Promise<void>; 
  DeleteEntry: () => Promise<void>; 
} 



// Use Admin ==============================================
export function useAdmin() { 
  const {GetDefaultIEntry, GetICollections, GetIEntries, CreateUpdate, Delete, Validate} = useContext(DaoContext); 

  // EditingState ..........................................
  const resetState:TEditingState = {collection:'', entry:{} as IEntry, mode:'read'}; 
  const [Get, Set] = useStateAt(resetState); 

  function Reset() { 
    const collection = Get(['collection']); 
    Set({...resetState, collection}); 
  }
  
  // Get Collection 
  function GetCollection() { 
    const [collection] = GetICollections([Get(['collection'])]); 
    return collection; 
  } 

  // GetEntries
  function GetEntries() { 
    const entries = GetIEntries(Get(['collection'])) ?? []; 
    return IsEmpty(entries) ? [] as IEntry[]: entries; 
  } 

  function GetFields() { 
    const ifields:IField[] = GetCollection()?.ifields ?? []; 
    const [filtered] = Filter(ifields, (f:IField) => !!f.label); 
    return filtered; 
  }

  const paging = usePage(GetEntries(), 10); 

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
    // Reset after Create Update 
    Reset(); 
  } 

  // DeleteEntry .......................................... 
  async function DeleteEntry() { 
    const collection = Get(['collection']); 
    const entry = Get(['entry']); 
    const [response] = await Delete(collection, [entry]); 
    feedback.setValue([response]); 
    // Reset after editing 
    Reset(); 
  } 

  return { 
    paging, 
    Get, Set, 
    GetCollection, 
    GetEntries, 
    GetFields, 

    /*GetEditing, 
    SetEditing, */
  
    GetCollectionOptions, 
    CreateUpdateEntry, 
    DeleteEntry, 
  } 
}