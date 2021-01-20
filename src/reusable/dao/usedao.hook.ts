import {useEffect, useMemo, useState} from 'react'; 
import {useLoader, IState} from '../_useloader'; 
import {DataAccessObject as IDao} from './dao.class'; 
import {IsEmpty, GetDefaultValueFromIField} from '../_utils'; 



export enum EActionType { 
  CREATE = 'create', 
  READ = 'read', 
  UPDATE = 'update', 
  DELETE = 'delete', 
}


export interface IUseDao{ 
  state:IState; 

  // Active Collection
  activeCollection:ICollection; 
  setActiveCollection:React.Dispatch<ICollection>; 

  // Active Entry. 
  activeEntry:IEntry; 
  setActiveEntry:React.Dispatch<React.SetStateAction<IEntry>>; 

  // Active mode. 
  activeMode:EActionType; 
  SetActiveMode:(mode?:EActionType) => void; 

  // Get Entry id or return default entry
  GetEntry:(id?:string) => IEntry; 

  // return local collections. 
  collections:() => ICollection[]; 

  // load remote collections. 
  Collections:(accessors:string[]) => Promise<void>; 

  // Crud functionalities. 
  Create: (accessor:string, toCreate:IEntry) => Promise<void>; 
  Read: (accessor:string, id?:string[]) => Promise<void>; 
  Update: (accessor:string, toUpdate:IEntry) => Promise<void>; 
  Delete: (accessor:string, toDelete?:IEntry) => Promise<void>; 

  // Get foreign elements, options and values. 
  GetForeignElements: (ifield:IField) => {foreignCollection:ICollection|undefined, abbrevField:IField|undefined}, 
  GetForeignOptions: (ifield:IField) => IOption[]; 
  GetForeignValues: (ifield:IField, value:any[]) => any[]; 
} 


//EActionType.


// USE DAO ======================================
export function useDao(dao:IDao):IUseDao { 
  // Hooks 
  const Dao = useMemo(() => dao, []); 
  const {state, Load} = useLoader(); 
  const [activeCollection, setActiveCollection] = useState({} as ICollection); 
  const [activeEntry, setActiveEntry] = useState(InitActiveEntry()); 
  const [activeMode, setActiveMode] = useState(EActionType.READ); 

  const collections = () => Dao.collections.collections; 
  const Collections = async (accessors:string[]) => Load(() => Dao.Collections(accessors)); 

  // Crud functionalities
  const Create = async (accessor:string, toCreate:IEntry) => Load(() => Dao.Create(accessor, toCreate)); 
  const Read = async (accessor:string, ids?:string[]) => Load(() => Dao.Read(accessor, ids)); 
  const Update = async (accessor:string, toUpdate:IEntry) => Load(() => Dao.Update(accessor, toUpdate)); 
  const Delete = async (accessor:string, toDelete?:IEntry) => Load(() => Dao.Delete(accessor, toDelete)); 

  const GetForeignElements = (ifield:IField) => Dao.GetForeignElements(ifield); 
  const GetForeignOptions = (ifield:IField) => Dao.GetForeignOptions(ifield); 
  const GetForeignValues = (ifield:IField, ids:any[]) => Dao.GetForeignValues(ifield, ids); 

  useEffect(() => { 
    setActiveEntry(InitActiveEntry()); 
    SetActiveMode(); 
  }, [activeCollection]); 

  function InitActiveEntry():IEntry { 
    if(IsEmpty(activeCollection)) 
      return {} as IEntry; 
    const {ifields} = activeCollection; 
    let entry = {} as IEntry; 
    ifields?.forEach( f => { 
      entry[f.accessor] = GetDefaultValueFromIField(f); 
    }); 
    return entry; 
  }

  function GetEntry(id?:string) { 
    return activeCollection.entries.find( e => e._id === id) ?? InitActiveEntry(); 
  } 

  function SetActiveMode(mode?:EActionType) { 
    setActiveMode(mode?? EActionType.READ); 
  } 

  return {state, 
    activeCollection, setActiveCollection, 
    activeEntry, setActiveEntry, 
    activeMode, SetActiveMode, 
    GetEntry, 
    collections, Collections, 
    Create, Read, Update, Delete, 
    GetForeignElements, GetForeignOptions, GetForeignValues}; 
}

