import {useMemo, useState} from 'react'; 
import {useLoader, IState} from '../hooks/useloader/_useloader'; 
import {DataAccessObject as IDao} from './dao.class'; 


export interface IUseDao{ 
  state:IState; 
  activeCollection:ICollection; 
  setActiveCollection:React.Dispatch<ICollection>; 
  collections:() => ICollection[]; 

  Collections:(accessors:string[]) => Promise<void>; 
  Create: (accessor:string, toCreate:IEntry) => Promise<void>; 
  Read: (accessor:string, id?:string[]) => Promise<void>; 
  Update: (accessor:string, toUpdate:IEntry) => Promise<void>; 
  Delete: (accessor:string, toDelete?:IEntry) => Promise<void>; 

  GetForeignElements: (ifield:IField) => {foreignCollection:ICollection|undefined, abbrevField:IField|undefined}, 
  GetForeignOptions: (ifield:IField) => IOption[]; 
  GetForeignValues: (ifield:IField, value:any[]) => any[]; 
} 



// USE DAO ======================================
export function useDao(dao:IDao):IUseDao { 
  const Dao = useMemo(() => dao, []); 
  const {state, Load} = useLoader(); 
  const [activeCollection, setActiveCollection] = useState({} as ICollection); 

  const collections = () => Dao.collections.collections; 
  const Collections = async (accessors:string[]) => Load(() => Dao.Collections(accessors)); 
  const Create = async (accessor:string, toCreate:IEntry) => Load(() => Dao.Create(accessor, toCreate)); 
  const Read = async (accessor:string, ids?:string[]) => Load(() => Dao.Read(accessor, ids)); 
  const Update = async (accessor:string, toUpdate:IEntry) => Load(() => Dao.Update(accessor, toUpdate)); 
  const Delete = async (accessor:string, toDelete?:IEntry) => Load(() => Dao.Delete(accessor, toDelete)); 

  const GetForeignElements = (ifield:IField) => Dao.GetForeignElements(ifield); 
  const GetForeignOptions = (ifield:IField) => Dao.GetForeignOptions(ifield); 
  const GetForeignValues = (ifield:IField, ids:any[]) => Dao.GetForeignValues(ifield, ids); 

  return {state, activeCollection, setActiveCollection, 
    collections, Collections, 
    Create, Read, Update, Delete, 
    GetForeignElements, GetForeignOptions, GetForeignValues}; 
}
