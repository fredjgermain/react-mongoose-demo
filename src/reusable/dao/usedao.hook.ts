import {useMemo} from 'react'; 
import {useLoader, IState} from '../_useloader'; 
import {DAO} from './dao.class'; 


export enum EActionType { 
  CREATE = 'create', 
  READ = 'read', 
  UPDATE = 'update', 
  DELETE = 'delete', 
}



// USE DAO ======================================
export interface IUseDao{ 
  state:IState; 

  // Get collections, entry, fields data 
  GetICollections:(accessors?:string[]) => ICollection[]; 
  GetIFields:(accessor:string, fields?:string[]) => IField[]; 
  GetIEntries:(accessor:string, ids?:string[]) => IEntry[]; 
  GetDefaultIEntry:(accessor:string) => IEntry; 
  
  // Get foreign elements
  GetForeignElements: (ifield:IField) => {foreignCollection:ICollection|undefined, abbrevField:IField|undefined}, 

  // Ge options 
  GetIOptions: (ifield:IField) => IOption[]; 

  // load remote collections. 
  Collections:(accessors:string[]) => Promise<void>; 

  // Crud functionalities. 
  Create: (accessor:string, entries:IEntry[]) => Promise<void>; 
  Read: (accessor:string, id?:string[]) => Promise<void>; 
  Update: (accessor:string, entries:IEntry[]) => Promise<void>; 
  Delete: (accessor:string, entries:IEntry[]) => Promise<void>; 
} 



// USE DAO ======================================
export function useDao(dao:DAO):IUseDao { 
  // Hooks 
  const Dao = useMemo(() => dao, []); 
  const {state, Load} = useLoader(); 

  const GetICollections = Dao.GetICollections; 
  const GetIFields = Dao.GetIFields; 
  const GetIEntries = Dao.GetIEntries; 
  const GetDefaultIEntry = Dao.GetDefaultIEntry; 

  const GetForeignElements = Dao.GetForeignElements; 
  const GetIOptions = Dao.GetIOptions; 

  // Collections 
  const Collections = async (accessors:string[]) => 
    Load(() => Dao.Collections(accessors)); 

  // Crud functionalities 
  // async Validate ... 
  // async Ids ... 
  const Create = async (accessor:string, entries:IEntry[]) => 
    Load(() => Dao.Create(accessor, entries)); 
  const Read = async (accessor:string, ids?:string[]) => 
    Load(() => Dao.Read(accessor, ids)); 
  const Update = async (accessor:string, entries:IEntry[]) => 
    Load(() => Dao.Update(accessor, entries)); 
  const Delete = async (accessor:string, entries:IEntry[]) => 
    Load(() => Dao.Delete(accessor, entries)); 

  return { 
    state, 
    GetICollections, GetIFields, GetIEntries, GetDefaultIEntry, 
    GetForeignElements, GetIOptions, 
    Collections, Create, Read, Update, Delete 
  }; 
}

