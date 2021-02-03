import React from 'react'; 
import {IUseDao} from './usedao.hook'; 


// DAO Contexter ================================ 
export const DaoContext = React.createContext({} as IUseDao); 

interface IDaoContexter { 
  UseDao:IUseDao; 
} 
export function DaoContexter({UseDao, children}:React.PropsWithChildren<IDaoContexter>) { 
  return <DaoContext.Provider value={UseDao} > 
    {children} 
  </DaoContext.Provider> 
} 