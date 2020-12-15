import {useState, useMemo, useCallback, useEffect} from 'react'; 

interface ILoad { 
  success: boolean; 
  err?: any; 
} 

// CUSTOM HOOK: useLoad  ========================
/*
Takes in a async Loading function 
returns 
  'status'
    .success = true if loading is done and successful. 
    .err = will remain undefined unless loading has failed. 
  'Reload' callBack function allowing to recall loading function. 
*/
export function useLoad(LoadFunc:() => Promise<any>) : {status:ILoad, Reload:any} { 
  const [status, setStatus] = useState({success:false} as ILoad); 
  const Reload = useCallback( async () => { 
    setStatus({success:false}); 
    await LoadFunc() 
    .then( () => setStatus({success:true})) 
    .catch( err => setStatus({success:true, err:err})); 
  }, []); 

  useEffect(() => { 
    Reload(); 
  }, []); 

  return {status, Reload}; 
}
