import React, { useMemo } from 'react'; 
import { DAO } from '../utils/dao.class'; 
//import { useLoader } from '../../_customhooks'; 
import { useDaoLoader } from '../hooks/dao.hook'; 
import { ICrud, IDao, IDaoContexter } from '../dao.type'; 

// -------------------------------------------------------
/*export function useLoadCollection(accessors:string[]) { 
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
  return <div> 
    {ready ? children: 'Loading ...'} 
  </div> 
}*/

export const DaoContext = React.createContext({} as IDao); 
export function DaoContexter({crud, accessors, loadingComponent, children}:React.PropsWithChildren<IDaoContexter>) { 
  const dao = useMemo(() => new DAO(crud), []); 
  const ready = useDaoLoader(dao, accessors); 
  const _loadingComponent = loadingComponent ?? <em> ... Is loading ... </em>; 
  
  return <DaoContext.Provider value={dao}> 
    {ready ? children: _loadingComponent} 
  </DaoContext.Provider> 
}