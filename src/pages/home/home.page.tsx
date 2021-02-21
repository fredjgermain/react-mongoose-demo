import React, { useContext, useEffect, useMemo } from 'react'; 
import {DAO, ICrud} from '../../reusable/_dao'; 
import {Fetcher} from '../../reusable/_mongooseparser'; 
import { useLoader } from '../../reusable/_useloader';
import {CrudTest} from '../crudTest/crudTest.page';


const baseUrl = `https://fjg-mongoose-heroku.herokuapp.com/api/`; 


export const DAOContext = React.createContext({} as IUseDao); 
// HOME =================================================== 
export default function Home() { 
  const dao = useDao(baseUrl); 
  const collectionReady = useLoadCollections(dao); 

  // {collectionReady && <TestPatient />} 

  return <DAOContext.Provider value={dao}> 
    <h2>Home page ...</h2> 
    
    {collectionReady && <CrudTest />} 
  </DAOContext.Provider> 
} 


interface IUseDao { 
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
  Create: (accessor:string, entries:IEntry[]) => Promise<ICrudResponse[]>; 
  Read: (accessor:string, id?:string[]) => Promise<ICrudResponse[]>; 
  Update: (accessor:string, entries:IEntry[]) => Promise<ICrudResponse[]>; 
  Delete: (accessor:string, entries:IEntry[]) => Promise<ICrudResponse[]>; 

  // Validate 
  Validate: (collectionAccessor:string, ifieldAccessor:string, value:any) => boolean; 
}

function useDao(baseUrl:string):IUseDao { 
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
    Collections, Create, Read, Update, Delete, 
    Validate
  }; 
} 


function useLoadCollections(dao:IUseDao) { 
  const accessors = ['questions','responses', 'answers', 'forms', 'instructions', 'patients', 'sessions']; 
  const callback = (res:any) => console.log(res); 
  const {state, Load} = useLoader(); 

  useEffect(() => { 
    Load( () => dao.Collections(accessors), callback); 
  }, []); 

  return state.success; 
} 


function TestPatient() { 
  const dao = useContext(DAOContext); 
  const accessors = ['questions','responses', 'answers', 'forms', 'instructions', 'patients', 'sessions']; 
  const collection = dao.GetICollections(accessors); 
  
  return <div> 
    {JSON.stringify(collection)} 
  </div> 
}
