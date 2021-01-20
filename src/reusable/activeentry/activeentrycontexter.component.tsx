import React from 'react'; 
import {IUseActive, useActive} from './useactiveentry.hook'; 


export const ActiveEntryContext = React.createContext({} as IUseActive); 



interface IActiveEntryContexter { 
  datas:any[]; 
  ifields:IField[]; 
} 
export function ActiveEntryContexter({datas, ifields, children}:React.PropsWithChildren<IActiveEntryContexter>) { 
  const context = useActive(datas, ifields); 

  return <ActiveEntryContext.Provider value={context}> 
    {children} 
  </ActiveEntryContext.Provider> 
} 