import React, {useContext, useEffect, useState} from 'react'; 
import {IUseDao, useDao, ICrud, DAO, DaoContext} from '../_dao'; 
import {Fetcher} from '../_mongooseparser'; 



// ICrudContext ------------------------------------------- 
interface ICrudContext extends IUseDao { 
  activeCollection: ICollection; 
  setActiveCollection: React.Dispatch<React.SetStateAction<ICollection>>; 
  activeEntry: IEntry; 
  setActiveEntry: React.Dispatch<React.SetStateAction<IEntry>>; 
  activeMode: string; 
  setActiveMode: React.Dispatch<React.SetStateAction<string>>; 
  ResetActive: () => void, 
  SetActive: (mode:string, entry:IEntry) => void, 
  IsActive: (id:string) => boolean; 
} 
export const CrudContext = React.createContext({} as ICrudContext); 



// CrudContexter ========================================== 
export function CrudContexter({baseUrl, children}:React.PropsWithChildren<{baseUrl:string}>) { 
  const dao = new DAO(new Fetcher(baseUrl) as ICrud); 
  const usedao = useDao(dao); 
  const useactive = useActive(usedao); 
  const context = {...usedao, ...useactive}; 
  return <CrudContext.Provider value={context} > 
    {children} 
  </CrudContext.Provider> 
} 



// UseCrud ================================================ 
export function useActive(useDao:IUseDao) { 
  const [activeCollection, setActiveCollection] = useState({} as ICollection); 
  const [activeEntry, setActiveEntry] = useState({} as IEntry); 
  const [activeMode, setActiveMode] = useState('read'); 

  useEffect(() => { 
    ResetActive(); 
  }, [activeCollection]); 

  function ResetActive() { 
    setActiveEntry({} as IEntry); 
    setActiveMode('read'); 
  } 

  function SetActive(mode:string, entry:IEntry = {} as IEntry) { 
    const [foundEntry] = useDao.GetIEntries(activeCollection?.accessor, [entry._id]);  
    const defaultEntry = {...useDao.GetDefaultIEntry(activeCollection?.accessor), ...entry}; 
    setActiveEntry(foundEntry ?? defaultEntry); 
    setActiveMode(mode); 
  }

  function IsActive(id:string):boolean { 
    return id === activeEntry?._id; 
  } 

  return {activeCollection, setActiveCollection, 
    activeEntry, setActiveEntry, 
    activeMode, setActiveMode, 
    ResetActive, SetActive, IsActive 
  }; 
} 
