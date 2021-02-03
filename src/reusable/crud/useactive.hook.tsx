import React, {useState} from 'react'; 
import {IUseDao, useDao, ICrud, DAO} from '../_dao'; 
import {CrudMongoose} from '../_mongooseparser'; 


// ICrudContext ------------------------------------------- 
interface ICrudContext extends IUseDao { 
  collection: ICollection; 
  setCollection: React.Dispatch<ICollection>; 
  entry: IEntry; 
  setEntry: React.Dispatch<IEntry>; 
  mode: string; 
  setMode: React.Dispatch<string>; 
} 
export const CrudContext = React.createContext({} as ICrudContext); 



// CrudContexter ========================================== 
export function CrudContexter({baseUrl, children}:React.PropsWithChildren<{baseUrl:string}>) { 
  const dao = new DAO(new CrudMongoose(baseUrl) as ICrud); 
  const context = {...useDao(dao), ...useCrud()}; 
  return <CrudContext.Provider value={context} > 
    {children} 
  </CrudContext.Provider> 
} 



// UseCrud ================================================ 
export function useCrud() { 
  const [collection, setCollection] = useState({} as ICollection); 
  const [entry, setEntry] = useState({} as IEntry); 
  const [mode, setMode] = useState(''); 

  return {collection, setCollection, entry, setEntry, mode, setMode}; 
} 
