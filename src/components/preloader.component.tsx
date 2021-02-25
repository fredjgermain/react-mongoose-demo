import {useContext, useEffect} from 'react'; 
import { DaoContext } from '../reusable/_dao2'; 
import { useLoader } from '../reusable/_useloader'; 


// Preloader ==============================================
export function PreloadCollection () { 
  const ready = usePreloadCollections(); 
  return <div> 
    Preloading : {JSON.stringify(ready)} 
  </div> 
}


export function usePreloadCollections() { 
  const {Collections} = useContext(DaoContext); 
  const accessors = ['questions','responses', 'answers', 'forms', 'instructions', 'patients', 'appointments']; 
  const callback = (res:any) => {}; 
  const {state, Load} = useLoader(); 

  useEffect(() => { 
    Load( () => Collections(accessors), callback); 
  }, []); 

  return state.success; 
} 



