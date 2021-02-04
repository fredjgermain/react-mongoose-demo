import {useContext, useEffect} from 'react'; 
import {CrudContext} from '../../../reusable/_crud'; 
import {FeedBack} from '../../../components/feedback/feedback.component'; 



// LOAD PATIENTS ================================
export function LoadPatients() { 
  const {setActiveCollection, GetICollections} = useContext(CrudContext); 

  async function GetPatient() { 
    //await Collections(['patients']); 
    const [patients] = GetICollections(['patients']); 
    if(patients) 
      setActiveCollection(patients); 
  } 
  
  useEffect(() => { 
    GetPatient(); 
  }, []); 

  return <div> 
    Load Patient ... 
  </div> 
}