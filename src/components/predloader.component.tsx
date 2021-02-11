import {useContext, useEffect} from 'react'; 
import {CrudContext} from '../reusable/_crud'; 


// Preloader ==============================================
export function useCollectionLoader(accessors:string[]) { 
  const {state, Collections, GetICollections} = useContext(CrudContext); 
  const collections = GetICollections(accessors); 
  const mustFetch = collections.length !== accessors.length; 

  useEffect(() => { 
    Collections(accessors); 
  }, [mustFetch && !state.busy]); 

  return !mustFetch; 
} 


// Pre-loader ==============================================
export function PreLoader() { 
  const accessors = ['questions','responses', 'forms', 'instructions']; 
  const ready = useCollectionLoader(accessors); 

  return <div> 
    <span>Pre-loading:</span> 
    {!ready && ' loading ...'} 
    {ready && ' ready !'} 
  </div> 
} 
