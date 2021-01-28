import {useEffect, useMemo, useState} from 'react'; 
import {useLoader, IState} from '../_useloader'; 
import {DataAccessObject as IDao} from './dao.class'; 



export enum EActionType { 
  CREATE = 'create', 
  READ = 'read', 
  UPDATE = 'update', 
  DELETE = 'delete', 
}



export interface IUseDao{ 
  // Get collections, entry, fields data
  GetCollections:(accessors?:string[]) => ICollection[]; 
  GetEntry:(accessor:string, id?:string) => IEntry; 
  GetIFields:(accessor:string, fieldAccessor?:string[]) => IField[]; 
  
  // Get foreign elements, options and values. 
  GetForeignElements: (ifield:IField) => {foreignCollection:ICollection|undefined, abbrevField:IField|undefined}, 
  GetForeignOptions: (ifield:IField) => IOption[]; 

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

  // load remote collections. 
  Collections:(accessors:string[]) => Promise<void>; 

  // Crud functionalities. 
  Create: (accessor:string, toCreate:IEntry) => Promise<void>; 
  Read: (accessor:string, id?:string[]) => Promise<void>; 
  Update: (accessor:string, toUpdate:IEntry) => Promise<void>; 
  Delete: (accessor:string, toDelete?:IEntry) => Promise<void>; 
} 

// USE DAO ======================================
export function useDao(dao:IDao):IUseDao { 
  const GetCollections = (accessors?:string[]) => 
    Dao.GetCollections(accessors); 
  
  const GetEntry = (accessor:string, id?:string) => 
    Dao.GetEntry(accessor, id); 
  
  const GetIFields = (accessor:string, ifieldAccessors?:string[]) => 
    Dao.GetIFields(accessor, ifieldAccessors); 
  
  const GetForeignElements = (ifield:IField) => Dao.GetForeignElements(ifield); 
  const GetForeignOptions = (ifield:IField) => Dao.GetForeignOptions(ifield); 

  // Hooks 
  const Dao = useMemo(() => dao, []); 
  const {state, Load} = useLoader(); 
  const [activeCollection, setActiveCollection] = useState({} as ICollection); 
  const [activeEntry, setActiveEntry] = useState(GetEntry(activeCollection.accessor)); 
  const [activeMode, setActiveMode] = useState(EActionType.READ); 

  const Collections = async (accessors:string[]) => Load(() => 
    Dao.Collections(accessors)); 

  // Crud functionalities
  const Create = async (accessor:string, toCreate:IEntry) => 
    Load(() => Dao.Create(accessor, toCreate)); 
  const Read = async (accessor:string, ids?:string[]) => 
    Load(() => Dao.Read(accessor, ids)); 
  const Update = async (accessor:string, toUpdate:IEntry) => 
    Load(() => Dao.Update(accessor, toUpdate)); 
  const Delete = async (accessor:string, toDelete?:IEntry) => 
    Load(() => Dao.Delete(accessor, toDelete)); 

  useEffect(() => { 
    const initEntry = GetEntry(activeCollection.accessor); 
    //console.log(activeCollection.accessor); 
    setActiveEntry(initEntry); 
    SetActiveMode(); 
  }, [activeCollection]); 

  function SetActiveMode(mode?:EActionType) { 
    setActiveMode(mode?? EActionType.READ); 
  } 

  return { 
    GetEntry, GetCollections, GetIFields, 
    GetForeignElements, GetForeignOptions, 
    state, 
    activeCollection, setActiveCollection, 
    activeEntry, setActiveEntry, 
    activeMode, SetActiveMode, 
    Collections, Create, Read, Update, Delete 
  }; 
}

