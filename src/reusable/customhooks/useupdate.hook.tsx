import {useEffect, useRef} from 'react'; 

export function useUpdate(callback:() => void, changeling:any) { 
  const flagFirstRender = useRef(true); 
  
  useEffect(() => { 
    if(flagFirstRender.current) { 
      flagFirstRender.current = false; 
      return; 
    } 
    callback(); 
  }, [JSON.stringify(changeling)]); 
}