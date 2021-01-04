import {useMemo} from 'react'; 
import {useLoader, IState} from '../useloader/_useloader'; 
import {DataAccessObject as IDao} from './dao.class'; 


export interface IUseDao{ 
  state:IState; 
  Dao: IDao; 
  Collections:(accessors:string[]) => Promise<void>; 
  Create: (accessor:string, toCreate:IEntry) => Promise<void>; 
  Read: (accessor:string, id?:string[]) => Promise<void>; 
  Update: (accessor:string, toUpdate:IEntry) => Promise<void>; 
  Delete: (accessor:string, toDelete?:IEntry) => Promise<void>; 
} 
// USE DAO ======================================
export function useDao(dao:IDao):IUseDao { 
  const Dao = useMemo(() => dao, []); 
  const {state, Load} = useLoader(); 

  const Collections = async (accessors:string[]) => Load(() => Dao.Collections(accessors)); 
  const Create = async (accessor:string, toCreate:IEntry) => Load(() => Dao.Create(accessor, toCreate)); 
  const Read = async (accessor:string, ids?:string[]) => Load(() => Dao.Read(accessor, ids)); 
  const Update = async (accessor:string, toUpdate:IEntry) => Load(() => Dao.Update(accessor, toUpdate)); 
  const Delete = async (accessor:string, toDelete?:IEntry) => Load(() => Dao.Delete(accessor, toDelete)); 

  return {Dao, state, Collections, Create, Read, Update, Delete}; 
}
