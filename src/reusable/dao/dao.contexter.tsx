import React from 'react'; 
import {IUseDao, useDao} from './usedao.hook'; 


export enum EActionType { 
  CREATE = 'create', 
  READ = 'read', 
  UPDATE = 'update', 
  DELETE = 'delete', 
}


export const DaoContext = React.createContext({} as IUseDao); 
// CrudContexter ========================================== 
export function DaoContexter({baseUrl, children}:React.PropsWithChildren<{baseUrl:string}>) { 
  return <DaoContext.Provider value={useDao(baseUrl)}> 
    {children} 
  </DaoContext.Provider> 
}