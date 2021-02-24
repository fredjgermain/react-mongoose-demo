import React from 'react'; 
import {useMemo} from 'react'; 
import { DAO, ICrud } from '../_dao'; 
import {Fetcher} from '../_mongooseparser'; 


export interface IUseDao { 
  // Get collections, entry, fields data 
  GetICollections:(accessors?:string[]) => ICollection[]; 
  GetIFields:(accessor:string, fields?:string[]) => IField[]; 
  GetIEntries:(accessor:string, ids?:string[]) => IEntry[]; 
  GetDefaultIEntry:(accessor:string) => IEntry; 
  
  // Get foreign elements
  GetForeignElements: (ifield:IField) => {foreignCollection:ICollection|undefined, abbrevField:IField|undefined}, 

  // Get options 
  GetIOptions: (ifield:IField) => IOption[]; 

  // load remote collections. 
  Collections:(accessors?:string[]) => Promise<ICrudResponse[]>; 

  // Crud functionalities. 
  CreateUpdate: (accessor:string, entries:IEntry[], predicate?:(entry:IEntry)=>boolean) => Promise<ICrudResponse[]>; 
  Create: (accessor:string, entries:IEntry[]) => Promise<ICrudResponse[]>; 
  Read: (accessor:string, id?:string[]) => Promise<ICrudResponse[]>; 
  Update: (accessor:string, entries:IEntry[]) => Promise<ICrudResponse[]>; 
  Delete: (accessor:string, entries:IEntry[]) => Promise<ICrudResponse[]>; 

  // Validate 
  Validate: (collectionAccessor:string, ifieldAccessor:string, value:any) => boolean; 
}

export function useDao(baseUrl:string):IUseDao { 
  const Dao = useMemo(() => new DAO(new Fetcher(baseUrl) as ICrud), []); 

  const GetICollections = (accessors?:string[]) => Dao.GetICollections(accessors); 
  const GetIFields = (accessor:string, fields?:string[]) => Dao.GetIFields(accessor, fields); 
  const GetIEntries = (accessor:string, ids?:string[]) => Dao.GetIEntries(accessor, ids); 
  const GetDefaultIEntry = (accessor:string) => Dao.GetDefaultIEntry(accessor); 
  // Get foreign elements
  const GetForeignElements = (ifield:IField) => Dao.GetForeignElements(ifield); 
  // Get options 
  const GetIOptions = (ifield:IField) => Dao.GetIOptions(ifield); 

  // Collections 
  const Collections = async (accessors?:string[]) => Dao.Collections(accessors); 

  // Crud functionalities 
  // async Validate ... 
  // async Ids ... 
  const CreateUpdate = async (accessor:string, entries:IEntry[], predicate?:(entry:IEntry)=>boolean) => 
    Dao.CreateUpdate(accessor, entries, predicate); 
  const Create = async (accessor:string, entries:IEntry[]) => Dao.Create(accessor, entries); 
  const Read = async (accessor:string, ids?:string[]) => Dao.Read(accessor, ids); 
  const Update = async (accessor:string, entries:IEntry[]) => Dao.Update(accessor, entries); 
  const Delete = async (accessor:string, entries:IEntry[]) => Dao.Delete(accessor, entries); 

  // Validate
  const Validate = (collectionAccessor:string, ifieldAccessor:string, value:any) => { 
    const [ifield] = GetIFields(collectionAccessor, [ifieldAccessor]); 
    return ifield?.validators?.every( valid => valid(value) ) ?? false; 
  }; 

  return { 
    GetICollections, GetIFields, GetIEntries, GetDefaultIEntry, 
    GetForeignElements, GetIOptions, 
    Collections, CreateUpdate, Create, Read, Update, Delete, 
    Validate
  }; 
} 


export const DaoContext = React.createContext({} as IUseDao); 
// CrudContexter ========================================== 
export function DaoContexter({baseUrl, children}:React.PropsWithChildren<{baseUrl:string}>) { 
  return <DaoContext.Provider value={useDao(baseUrl)}> 
    {children} 
  </DaoContext.Provider> 
}