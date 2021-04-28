import { useEffect } from 'react'; 
import { useLoader } from '../../_customhooks'; 
import { ICrud, IDao } from '../dao.type'; 


export function useDaoLoader(dao:IDao, accessors:string[]) { 
  const callback = (res:any) => {}; 
  const {state, Load} = useLoader(); 
  useEffect(() => { 
    Load( () => dao.Collections(accessors), callback); 
  }, []); 
  return state.success; 
} 
