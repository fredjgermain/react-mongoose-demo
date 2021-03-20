import React, {useMemo, useEffect, useContext} from 'react'; 
import {ICrud, IDao, DAO} from './dao.class'; 
import { useLoader } from '../_customhooks'; 

// -------------------------------------------------------
export function useLoadCollection(accessors:string[]) { 
  const dao = useContext(DaoContext);
  const callback = (res:any) => {}; 
  const {state, Load} = useLoader(); 

  useEffect(() => { 
    Load( () => dao.Collections(accessors), callback); 
  }, []); 

  return state.success; 
} 


export function Preloader({accessors, children}:React.PropsWithChildren<{accessors:string[]}>) { 
  const ready = useLoadCollection(accessors); 
  return <span> 
    {ready ? children: 'Loading ...'} 
  </span> 
}


export const DaoContext = React.createContext({} as IDao); 
export function DaoContexter({crud, children}:React.PropsWithChildren<{crud:ICrud}>) { 
  const dao = useMemo(() => new DAO(crud), []); 
  return <DaoContext.Provider value={dao}> 
    {children}
  </DaoContext.Provider> 
} 