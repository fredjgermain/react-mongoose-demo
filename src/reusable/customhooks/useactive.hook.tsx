import React, {useState} from 'react'; 
import {IUseDao, useDao} from '../dao2/usedao2.hook'; 
import {DAO} from '../dao2/dao2.class'; 


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
export function CrudContexter({dao, children}:React.PropsWithChildren<{dao:DAO}>) { 
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
