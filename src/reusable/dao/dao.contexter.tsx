import React, {useMemo, useEffect} from 'react'; 
import {ICrud, IDao, DAO} from './dao.class'; 
import {useLoader} from '../_customhooks'; 


// -------------------------------------------------------
function useLoadCollection(Dao:IDao, accessors:string[]) { 
  const callback = (res:any) => {}; 
  const {state, Load} = useLoader(); 

  useEffect(() => { 
    Load( () => Dao.Collections(accessors), callback); 
  }, []); 

  return state.success; 
} 


export const DaoContext = React.createContext({} as IDao); 
export function DaoContexter({accessors, crud, children}:React.PropsWithChildren<{accessors:string[], crud:ICrud}>) { 
  const dao = useMemo(() => new DAO(crud), []); 
  //const accessors = ['collectiona', 'collectionb', 'questions', 'patients', 'responses']; 
  const ready = useLoadCollection(dao, accessors); 

  return <DaoContext.Provider value={dao}> 
    {ready? children: 'not ready'} 
  </DaoContext.Provider> 
} 