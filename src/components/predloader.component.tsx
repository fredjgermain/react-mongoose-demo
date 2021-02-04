import {useContext, useEffect} from 'react'; 
import {CrudContext} from '../reusable/_crud'; 


// Prelaoder ===============================================
export function PreLoader() { 
  const {state, Collections, GetICollections} = useContext(CrudContext); 

  useEffect(() => { 
    Collections(['questions','responses', 'forms', 'instructions', 'patients', 'answers']); 
  }, []); 

  const ready = state.ready && state.success; 
  const [forms] = GetICollections(['forms']); 

  return <div> 
    <h1>Test Crud</h1> 
    <div>{forms && forms.entries.length}</div> 
    {!ready && 'loading ...'} 
    {ready && 'ready !'} 
  </div> 
}
